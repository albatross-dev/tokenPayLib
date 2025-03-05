import MiniLoader from "@/tokenPayLib/components/UI/MiniLoader";
import { useEffect, useState, useCallback } from "react";
import { IoWarning } from "react-icons/io5";
import axios from "axios";
import {
  FIAT_SYMBOLS_MAP,
  STABLECOIN_TO_FIAT_MAP,
} from "@/tokenPayLib/utilities/stableCoinsMaps";
import { useTranslation } from "react-i18next";
import { getMetaData, getQuote } from "@/tokenPayLib/utilities/partner/bitcoinvn";

export default function DepositMethodSelector({
  methods,
  amount,
  selectedMethod,
  setSelectedMethod,
  startCurrency,
  endCurrency,
}) {
  const { t } = useTranslation("common");
  const [loading, setLoading] = useState(true);
  const [modalityMethodMap, setModalityMethodMap] = useState(null);
  const [error, setError] = useState(null);

  // ###################
  // # Component Logic #
  // ###################

  const fetchExchangeRate = useCallback(
    async (startCurrency, endCurrency) => {
      try {
        const response = await axios.post(`/api/fiatTransaction/exchangeRate`, {
          startCurrency,
          endCurrency,
        });

        return response.data.rate;
      } catch (error) {
        console.error("Error fetching exchange rate:", error);
        return null;
      }
    },
    [startCurrency, endCurrency]
  );

  useEffect(() => {
    const update = async () => {
      setLoading(true);
      setSelectedMethod(null);

      // Fetch the current exchange rate
      const exchangeRate = await fetchExchangeRate(
        startCurrency,
        STABLECOIN_TO_FIAT_MAP[endCurrency]
      );

      if (!exchangeRate) {
        setError("Failed to get exchange rates");
        setLoading(false);
        return;
      }

      const sortedMethods = {};

      for (let method of methods) {
        // If the onramp modality is not yet available in the sorted methods add its entry
        if (!sortedMethods[method.onrampModality]) {
          sortedMethods[method.onrampModality] = {
            methods: [],
            cheapestMethod: null,
            nextLowerLimitMethod: null,
            nextMethodWithLimit: null,
          };
        }

        // Calculate predicted deposit amount for the method
        switch (method.type) {
          case "bitcoin_vn": {
            // Get bitcoinvn min and max onramp amount
            const bitcoinVNMeta = await getMetaData({
              depositMethod: startCurrency,
              settleMethod: endCurrency,
            });

            // If a min and max was received use it for this method
            if (bitcoinVNMeta) {
              const { min, max } = bitcoinVNMeta;
              method.onrampMinAmount = min;
              method.onrampMaxAmount = max;
            }

            // If the amount is in the range of min and max
            //  request a quote for the amount
            if (
              amount >= method.onrampMinAmount &&
              amount <= method.onrampMaxAmount
            ) {
              const bitcoinVNQoute = await getQuote({
                depositMethod: startCurrency,
                settleMethod: endCurrency,
                depositAmount: amount,
              });
              console.log(
                "(DepositMethodSelector) bitcoinVNQoute: ",
                bitcoinVNQoute
              );

              if (bitcoinVNQoute) {
                // If a qoute was received use it to predict the onramp amount
                method.predictedOnrampAmount =
                  bitcoinVNQoute.settleAmount -
                  bitcoinVNQoute.settleAmount * 0.004;
              } else {
                // If no qoute was received use the retrieved exchange rate
                //  and the configured fee to predict the onramp amount
                method.predictedOnrampAmount =
                  amount * exchangeRate -
                  amount * exchangeRate * method.onrampFee -
                  amount * exchangeRate * 0.004;
              }
            } else {
              // If the given amount is not in
              //  the range of min and max set the prediction to 0
              method.predictedOnrampAmount = 0;
            }

            break;
          }
          case "unlimit":
          case "onramp_money": {
            if (
              amount < method.onrampMinAmount ||
              amount > method.onrampMaxAmount
            ) {
              method.predictedOnrampAmount = 0;
            } else {
              method.predictedOnrampAmount =
                amount * exchangeRate -
                amount * exchangeRate * (method.onrampFee / 100);
            }

            break;
          }
          default: {
            if (
              amount < method.onrampMinAmount ||
              amount > method.onrampMaxAmount
            ) {
              method.predictedOnrampAmount = 0;
            } else {
              method.predictedOnrampAmount =
                amount * exchangeRate -
                amount * exchangeRate * 0.004 -
                amount * exchangeRate * (method.onrampFee / 100);
            }

            break;
          }
        }

        // Add the method to the modalitys list of methods
        sortedMethods[method.onrampModality].methods.push(method);

        if (method.predictedOnrampAmount > 0) {
          // If there is no cheapest method or the predicted amount
          //  of the cheapest method is smaller than the current
          //  methods predicted amount set the current method as
          //  the cheapest method.
          if (
            !sortedMethods[method.onrampModality].cheapestMethod ||
            sortedMethods[method.onrampModality].cheapestMethod
              .predictedOnrampAmount < method.predictedOnrampAmount
          ) {
            sortedMethods[method.onrampModality].cheapestMethod = method;
          }
        } else {
          // If the predicted onramp amount is zero but the amount is
          //  below the methods max onramp amount and there is no next
          //  closest method min limit set or the min amount for this method
          //  is below the current limit, set the current method as the next
          //  closest limit.
          if (
            method.onrampMaxAmount >= amount &&
            method.onrampMinAmount > amount &&
            (!sortedMethods[method.onrampModality].nextMethodWithLimit ||
              method.onrampMinAmount <
                sortedMethods[method.onrampModality].nextMethodWithLimit)
          ) {
            sortedMethods[method.onrampModality].nextMethodWithLimit = method;
          }

          // If the amount is above the current methods max onramp amount
          //  check if the current method represents the next closest max
          //  amount that is below amount and set it as the next lower
          //  limit if this is the case.
          if (
            method.onrampMaxAmount < amount &&
            (!sortedMethods[method.onrampModality].nextLowerLimitMethod ||
              sortedMethods[method.onrampModality].nextLowerLimitMethod
                .onrampMaxAmount < method.onrampMaxAmount)
          ) {
            sortedMethods[method.onrampModality].nextLowerLimitMethod = method;
          }
        }
      }

      setModalityMethodMap(sortedMethods);
      setLoading(false);
    };

    if (amount > 0) {
      update();
    }
  }, [amount]);

  // ####################
  // # Render Functions #
  // ####################

  const renderHeader = () => (
    <h2 className='text-xl font-bold mb-2 mt-8'>Zahlungsmethode auswählen</h2>
  );

  const renderPromptEnterAmount = () => (
    <div className='flex p-4 border w-full rounded'>
      <div className='fex text-xl font-bold items-center gap-2 flex-1'>
        <div className='text-sm px-2 rounded'>
         Bitte wählen Sie einen Betrag aus
        </div>
      </div>
      <div className='flex flex-row items-center font-bold gap-6'>
        <IoWarning className='text-gray-600' />
      </div>
    </div>
  );

  const renderLoading = () => (
    <div>
      <div className='flex flex-col gap-2 justify-center items-center py-4 w-full'>
        <div className='flex p-4 border w-full rounded'>
          <div className='flex text-xl font-bold items-center gap-2 flex-1'>
            <MiniLoader />
            <div className='text-sm px-2 animate-pulse rounded bg-gray-200'>
              Wir finden das beste Angebot für Sie
            </div>
          </div>
          <div className='flex flex-row items-center font-bold gap-6'>
            <div className='w-12 h-4 px-2 animate-pulse rounded bg-gray-200' />
          </div>
        </div>
      </div>
    </div>
  );

  const renderOnrampMethods = () => {
    return Object.keys(modalityMethodMap).map((modality) => {
      const { cheapestMethod, nextLowerLimitMethod, nextMethodWithLimit } =
        modalityMethodMap[modality];

      return (
        <div className='bg-white w-full mt-4'>
          <div
            onClick={() => cheapestMethod && setSelectedMethod(cheapestMethod)}
            className={`border flex flex-row p-4 gap-2 items-center border-gray-200 rounded-md ${
              selectedMethod && selectedMethod.onrampModality === modality
                ? "bg-uhuBlue text-white"
                : cheapestMethod
                ? "text-gray-800 cursor-pointer"
                : "text-gray-500 border-gray-200"
            }`}
          >
            <h3
              className={`text-xl font-bold ${
                !cheapestMethod && "text-gray-500"
              }`}
            >
              {t(modality)}
            </h3>

            {/* Cheapest Method for this modality*/}
            {cheapestMethod ? (
              <div className='flex flex-row justify-between items-center flex-grow'>
                <div className='bg-uhuBlue text-white rounded px-1 text'>
                  via <span className='font-bold'>{cheapestMethod.name}</span>
                </div>
                <div>
                   ≈{" "}
                  <span className='font-bold'>
                    {cheapestMethod.predictedOnrampAmount.toFixed(5)}
                    {" " +
                      FIAT_SYMBOLS_MAP[STABLECOIN_TO_FIAT_MAP[endCurrency]]}
                  </span>
                </div>
              </div>
            ) : error ? (
              <div className='bg-gray-200 px-1 rounded text-sm'>
                <p className='text-red-600 font-bold'>{error}</p>
              </div>
            ) : (
              <div className='bg-gray-200 text-gray-500 px-1 rounded text-sm'>
                Keine verfügbare Methode
              </div>
            )}
          </div>

          {/* If the amount is bigger than the highest amount display the difference */}
          {!cheapestMethod && nextLowerLimitMethod && (
            <p className='flex flex-row items-center justify-end text-sm'>
              Ihr gewählter Betrag übersteigt den maximal Betrag um&nbsp;
              <span className='font-bold text-red-600'>
                {amount - nextLowerLimitMethod.onrampMaxAmount}&nbsp;
                {FIAT_SYMBOLS_MAP[startCurrency]}
              </span>
            </p>
          )}

          {/* Display next higher method limit */}
          {nextMethodWithLimit && (
            <p className='flex flex-row items-center justify-end text-sm'>
              Noch&nbsp;
              <span className='text-uhuBlue font-bold'>
                {nextMethodWithLimit.onrampMinAmount - amount}&nbsp;
                {FIAT_SYMBOLS_MAP[startCurrency]}
              </span>
              &nbsp;bis zur nächsten Methode
            </p>
          )}
        </div>
      );
    });
  };

  // ################
  // # Render Logic #
  // ################

  return (
    <div>
      {renderHeader()}
      {amount <= 0
        ? renderPromptEnterAmount()
        : loading
        ? renderLoading()
        : renderOnrampMethods()}
    </div>
  );
}
