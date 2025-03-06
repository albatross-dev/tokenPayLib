import React, { useEffect, useState } from "react";
import BitcoinVNQuote, {
  getBitcoinVNMetaData,
  getBitcoinVNQuote,
} from "./methdos/BitcoinVNQuote";
import DefaultQuote from "./methdos/DefaultQuote";
import MiniLoader from "@/tokenPayLib/components/UI/MiniLoader";
import { useTranslation } from "react-i18next";
import { IoWarning } from "react-icons/io5";

function QuoteSection({
  method,
  amount,
  selectable,
  selectedMethod,
  handleSelect,
}) {
  switch (method?.type) {
    case "bitcoin_vn":
      return (
        <BitcoinVNQuote
          method={method}
          amount={amount}
          selectedMethod={selectedMethod}
          handleSelect={handleSelect}
        />
      );
    default:
      return (
        <DefaultQuote
          selectable={selectable}
          method={method}
          amount={amount}
          selectedMethod={selectedMethod}
          handleSelect={handleSelect}
        />
      );
  }
}

export function MethodSelectorOld({
  selectable,
  methods,
  amount,
  selectedMethod,
  setSelectedMethod,
}) {

  const { t: tCrossborder } = useTranslation("crossborder");

  // check if the method are there
  if (!methods || methods.length === 0) {
    return null;
  }

  // Sort methods: recommended methods first, then by fee amount
  const sortedMethods = [...methods].sort((a, b) => {
    if (a.recommended && !b.recommended) return -1;
    if (!a.recommended && b.recommended) return 1;
    return a.fee - b.fee;
  });

  const handleSelect = (method) => {
    if (selectable) {
      setSelectedMethod(method);
    }
  };

  return (
    <div className='space-y-4 bg-white w-full mt-4'>
      <h2 className='text-xl font-bold mb-2'>{tCrossborder("methodSelector.selectMethod")}</h2>
      {sortedMethods.map((method, index) => {
        return (
          <QuoteSection
            selectable={selectable}
            key={`${index}_${method.name}`}
            method={method}
            amount={amount}
            selectedMethod={selectedMethod}
            handleSelect={handleSelect}
          />
        );
      })}
    </div>
  );
}

export default function MethodSelector({
  selectable,
  methods,
  exchangeRate,
  loadedExchangeRate,
  finalCurrency,
  amount,
  sendingCurrency,
  selectedMethod,
  setSelectedMethod,
}) {
  const [sortedMethods, setSortedMethods] = useState({});
  const { t } = useTranslation("common");
  const { t: tCrossborder } = useTranslation("crossborder");


  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function update() {
      setLoading(true);
      console.log("update started");
      // sort the methdos by payment modality
      let sortedMethods = {};
      for (let method of methods) {
        if (!sortedMethods[method.withdrawModality]) {
          sortedMethods[method.withdrawModality] = {
            methods: [],
            cheapestMethod: null,
            nextLowerLimitMethod: null,
            nextMethodWithLimit: null,
          };
        }

        // calculate predicted amount and populate data
        switch (method.type) {
          case "bitcoin_vn":
            // set minAmount and maxAmount
            const bitcoinVNMetadata = await getBitcoinVNMetaData();
            method.minAmount = bitcoinVNMetadata.min;
            method.maxAmount = bitcoinVNMetadata.max;

            if (amount < method.minAmount || amount > method.maxAmount) {
              method.predictedAmount = 0;
            } else {
              // applying poolbase fee of 0.4% to retreived amount
              const bitcoinVNQuote = await getBitcoinVNQuote(amount);
              method.predictedAmount =
                bitcoinVNQuote.settleAmount -
                bitcoinVNQuote.settleAmount * 0.004;
            }
            break;
          case "unlimit":
            if (amount < method.minAmount || amount > method.maxAmount) {
              method.predictedAmount = 0;
              break;
            }
            // in the widget works without the basic pool fe, only the fee (%) and the exchange rate
            method.predictedAmount =
              amount * exchangeRate -
              amount * exchangeRate * (method.fee / 100);
            break;
          case "onramp_money":
            if (amount < method.minAmount || amount > method.maxAmount) {
              method.predictedAmount = 0;
              break;
            }
            // in the widget works without the basic pool fe, only the fee (%) and the exchange rate
            method.predictedAmount =
              amount * exchangeRate -
              amount * exchangeRate * (method.fee / 100);
            break;
          default:
            if (amount < method.minAmount || amount > method.maxAmount) {
              method.predictedAmount = 0;
              break;
            }
            /** in default case use base Pool fee of 0.4%, fee (%) and the exchange rate
             * this includes at the moment:
             * - swypt
             * - ovex
             * - roma
             * - stasis
             * - stasis_crypto_only
             * - koywe_crypto_only
             * - koywe
             */

            method.predictedAmount =
              amount * exchangeRate -
              amount * exchangeRate * 0.004 -
              amount * exchangeRate * (method.fee / 100);
            break;
        }
        sortedMethods[method.withdrawModality].methods.push(method);
      }

      // set cheapest method and next method with limit
      for (let modality in sortedMethods) {
        let cheapestMethod = null;
        let nextMethodWithLimit = null;
        for (let method of sortedMethods[modality].methods) {
          if (method.predictedAmount > 0) {
            if (
              !cheapestMethod ||
              method.predictedAmount > cheapestMethod.predictedAmount
            ) {
              cheapestMethod = method;
            }
          } else {
            if (
              method.maxAmount >= amount &&
              (!nextMethodWithLimit ||
                method.minAmount < nextMethodWithLimit.minAmount)
            ) {
              nextMethodWithLimit = method;
            }
          }
        }
        sortedMethods[modality].cheapestMethod = cheapestMethod;
        sortedMethods[modality].nextMethodWithLimit = nextMethodWithLimit;

        // get the method with the closes upper limit, that is closes to our amount but not over
        let nextLowerLimitMethod = null;
        for (let method of sortedMethods[modality].methods) {
          if (
            method.maxAmount <= amount &&
            (!nextLowerLimitMethod ||
              method.maxAmount > nextLowerLimitMethod.maxAmount)
          ) {
            nextLowerLimitMethod = method;
          }
        }

        sortedMethods[modality].nextLowerLimitMethod = nextLowerLimitMethod;
      }

      setSortedMethods(sortedMethods);
      setLoading(false);
    }

    if ((methods, amount, exchangeRate, loadedExchangeRate)) {
      console.log("update", methods, amount, exchangeRate);
      update();
    }
  }, [methods, amount, exchangeRate]);

  if (!loadedExchangeRate) {
    return (
      <div>
        <h2 className='text-xl font-bold mb-2 mt-8'>
        {tCrossborder("methodSelector.selectMethod")}
        </h2>
        <div className='flex p-4 border w-full rounded'>
          <div className='flex text-xl font-bold items-center gap-2 flex-1'>
            <div className=' text-sm px-2 rounded'>{tCrossborder("methodSelector.loadingExchangeRates")}</div>
          </div>
          <div className='flex flex-row items-center font-bold gap-6'>
            <IoWarning className='text-gray-600' />
          </div>
        </div>
      </div>
    );
  }

  if (!selectable) {
    return (
      <div>
        <h2 className='text-xl font-bold mb-2 mt-8'>
        {tCrossborder("methodSelector.selectMethod")}
        </h2>
        <div className='flex p-4 border w-full rounded'>
          <div className='flex text-xl font-bold items-center gap-2 flex-1'>
            <div className=' text-sm px-2 rounded'>
            {tCrossborder("methodSelector.selectAmount")}
            </div>
          </div>
          <div className='flex flex-row items-center font-bold gap-6'>
            <IoWarning className='text-gray-600' />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className='text-xl font-bold mb-2 mt-8'>{tCrossborder("methodSelector.selectMethod")}</h2>
      {loading ? (
        <div>
          <div className='flex flex-col gap-2 justify-center items-center py-4 w-full'>
            <div className='flex p-4 border w-full rounded'>
              <div className='flex text-xl font-bold items-center gap-2 flex-1'>
                <MiniLoader />
                <div className=' text-sm px-2 animate-pulse rounded bg-gray-200'>
                {tCrossborder("methodSelector.findingBestOffer")}
                  
                </div>
              </div>
              <div className='flex flex-row items-center font-bold gap-6'>
                <div className='w-12 h-4 px-2 animate-pulse rounded bg-gray-200'></div>
              </div>
            </div>
            <div
              className={`flex h-12 w-full bg-uhuGray flex-rоw gap-4 items-center animate-pulse rounded-lg p-2 shadow-sm `}
            ></div>
          </div>
        </div>
      ) : (
        Object.keys(sortedMethods).map((modality, index) => {
          return (
            <div className='bg-white w-full mt-4' key={`modality_${index}`}>
              <div
                className={`flex gap-2 items-center p-4 flex-row border rounded ${
                  selectedMethod
                    ? "bg-uhuBlue text-white"
                    : sortedMethods[modality].cheapestMethod
                    ? "text-gray-800 cursor-pointer"
                    : "text-gray-500 border-gray-200"
                } `}
                onClick={() => {
                  sortedMethods[modality].cheapestMethod
                    ? setSelectedMethod(sortedMethods[modality].cheapestMethod)
                    : null;
                }}
              >
                <h2 className='text-xl font-bold'>{t(modality)}</h2>
                {sortedMethods[modality].cheapestMethod ? (
                  <div className='flex-1 flex flex-row justify-between items-center'>
                    <div className='text-[9px] bg-uhuBlue text-white px-1 rounded'>
                      via{" "}
                      <span className='font-bold'>
                        {sortedMethods[modality].cheapestMethod.name}
                      </span>
                    </div>
                    <div>
                       ≈{" "}
                      <span className='font-bold'>
                        {sortedMethods[
                          modality
                        ].cheapestMethod.predictedAmount.toFixed(5)}{" "}
                        {finalCurrency?.symbol}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className='text-[9px] bg-gray-200 text-gray-500 px-1 rounded'>
                    {tCrossborder("methodSelector.noMethodAvailable")}
                 
                    
                  </div>
                )}
              </div>
              <div className='flex flex-row justify-between'>
                {/** display next method with limit */}
                {!sortedMethods[modality].cheapestMethod &&
                sortedMethods[modality].nextLowerLimitMethod ? (
                  <div className='flex flex-row justify-between text-sm'>
                    <div>
                    {tCrossborder("methodSelector.notEnoughMoney")}
                      {" "}
                      <span className='font-bold text-red-500'>
                        {amount -
                          sortedMethods[modality].nextLowerLimitMethod
                            .maxAmount}{" "}
                        {sendingCurrency?.icon}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div></div>
                )}
                {/** display next method with limit */}
                {sortedMethods[modality].nextMethodWithLimit && (
                  <div className='flex flex-row justify-between'>
                    <div></div>
                    <div className='text-sm'>
                    {tCrossborder("methodSelector.missingAmount")}
                      {" "}
                      <span className='font-bold text-uhuBlue'>
                        {sortedMethods[modality].nextMethodWithLimit.minAmount -
                          amount}{" "}
                        {sendingCurrency?.icon}
                      </span>{" "}
                       {tCrossborder("methodSelector.missingAmount1")}
                       
                    </div>
                  </div>
                )}
              </div>
              {sortedMethods[modality].methods.map((method, index1) => {
                return (
                  <div key={`modality_${index}_${index1}`} className='flex flex-row justify-between hidden'>
                    <div>{method.name}</div>
                    <div>{method.minAmount}</div>
                    <div>{method.maxAmount}</div>
                    <div>
                      {method.predictedAmount} {finalCurrency?.symbol}
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })
      )}
    </div>
  );
}
