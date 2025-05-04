import React, { useEffect, useState } from "react";
import {
  createKoyweBankAccount,
  getBankAccounts,
  getSupportedBanks,
  KoyweBankAccount,
  KoyweBankInfo,
} from "../../../universal/koyweUtils";
import { Country } from "../../../../../../types/payload-types";
import { useTranslation } from "next-i18next";
import Loader from "../../../../../UI/Loader";
import MiniLoader from "../../../../../UI/MiniLoader";
import LoadingButton, {
  LoadingButtonStates,
} from "../../../../../UI/LoadingButton";
import { sendErrorReport } from "../../../../../../../context/UserContext";

let oldView = "loading";

const fetchBankAccounts = async (
  country: Country,
  setView: (
    view: "loading" | "error" | "selectBankAccount" | "addBankAccount"
  ) => void,
  setBankAccounts: (bankAccounts: KoyweBankAccount[]) => void
) => {
  setView("loading");
  try {
    const bankAccountsResponse = await getBankAccounts({
      countryCode: country.countryCode,
      currencySymbol: country.countryInfo.currency,
    });
    console.log("bankAccounts", bankAccountsResponse);
    setView("selectBankAccount");
    setBankAccounts(bankAccountsResponse);
  } catch (error) {
    console.error("Error fetching bank accounts:", error);
    setView("error");
  }
};

export default function SelectBankAccountSlide({
  onSelectBankAccount,
  country,
}: {
  country: Country;
  onSelectBankAccount: (bankAccount: KoyweBankAccount) => void;
}) {
  const [bankAccounts, setBankAccounts] = useState<KoyweBankAccount[]>([]);

  const { t: tCrossborder } = useTranslation("crossborder");

  const [view, setView] = useState<
    "loading" | "error" | "selectBankAccount" | "addBankAccount"
  >("selectBankAccount");

  useEffect(() => {
    if (view === "selectBankAccount" && oldView !== view) {
      oldView = view;
      fetchBankAccounts(country, setView, setBankAccounts);
    }
  }, [country, view]);

  useEffect(() => {
    fetchBankAccounts(country, setView, setBankAccounts);
  }, []);

  return (
    <div className="flex flex-col items-center gap-4 w-full ">
      <h2 className="text-2xl font-semibold text-gray-800">
        {tCrossborder("withdraw.koywe.selectBankAccount")}
      </h2>

      {view === "loading" && (
        <div className="flex items-center justify-center">
          <Loader />
        </div>
      )}

      {view === "error" && (
        <div className="flex items-center justify-center p-8">
          <div className="text-red-600">
            {tCrossborder("withdraw.koywe.error")}
          </div>
        </div>
      )}

      {view === "selectBankAccount" && (
        <>
          <div className="flex flex-col gap-2">
            {bankAccounts.map((bankAccount) => (
              <button
                key={bankAccount._id}
                onClick={() => onSelectBankAccount(bankAccount)}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <span className="font-medium">{bankAccount.name}</span>
                <span className="text-gray-600">
                  {bankAccount.accountNumber}
                </span>
              </button>
            ))}
            {bankAccounts.length === 0 && (
              <div className="text-gray-600 bg-gray-100 p-4 rounded-lg">
                {tCrossborder("withdraw.koywe.noBankAccounts")}
              </div>
            )}
          </div>
          <button
            onClick={() => setView("addBankAccount")}
            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-uhuBlue hover:bg-uhuBlue-light transition-colors"
          >
            {tCrossborder("withdraw.koywe.addBankAccount")}
          </button>
        </>
      )}

      {view === "addBankAccount" && (
        <div className="flex flex-col items-center justify-center w-full">
          <KoyweCreateBankAccountForm
            fetchBankAccounts={() =>
              fetchBankAccounts(country, setView, setBankAccounts)
            }
            country={country}
            setView={setView}
          />
        </div>
      )}
    </div>
  );
}

function KoyweCreateBankAccountForm({ country, setView, fetchBankAccounts }) {
  const [bankCode, setBankCode] = useState<string>("");
  const [accountNumber, setAccountNumber] = useState<string>("");
  const [documentNumber, setDocumentNumber] = useState<string>("");
  const [bankName, setBankName] = useState<string>("");
  const [institutionName, setInstitutionName] = useState<string>("");
  const [transferCode, setTransferCode] = useState<string>("");
  const { t: tCrossborder } = useTranslation("crossborder");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingButtonState, setLoadingButtonState] =
    useState<LoadingButtonStates>("normal");

  const [supportedBanks, setSupportedBanks] = useState<KoyweBankInfo[]>([]);

  const [error, setError] = useState<{
    title: string;
    message: string;
    error: any;
  } | null>(null);

  useEffect(() => {
    const fetchSupportedBanks = async () => {
      try {
        setIsLoading(true);
        const supportedBanks = await getSupportedBanks({
          countryCode: country.countryCode,
        });
        setSupportedBanks(supportedBanks);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching supported banks:", error);
        setError({
          title: tCrossborder("withdraw.koywe.bankAccountCreationError"),
          message: tCrossborder(
            "withdraw.koywe.bankAccountCreationErrorMessage"
          ),
          error: error,
        });
        sendErrorReport(
          "KoyweCreateBankAccountForm - Fetching supported banks failed",
          error
        );
        setView("error");
      }
    };
    fetchSupportedBanks();
  }, []);

  const handleCreateBankAccount = async () => {
    try {
      setLoadingButtonState("processing");
      await createKoyweBankAccount({
        bankCode,
        accountNumber,
        documentNumber,
        countryCode: country.countryCode,
        currencySymbol: country.countryInfo.currency,
      });

      fetchBankAccounts();
      setView("selectBankAccount");
    } catch (error) {
      console.error("Error creating bank account:", error);
      setError({
        title: tCrossborder("withdraw.koywe.bankAccountCreationError"),
        message: tCrossborder("withdraw.koywe.bankAccountCreationErrorMessage"),
        error: error,
      });
      setLoadingButtonState("error");
    }
  };

  return (
    <div>
      <div className="w-full max-w-md">
        <div className="mb-4">
          <label className="flex items-center justify-between  text-sm font-medium text-gray-700 mb-2">
            {tCrossborder("withdraw.koywe.selectBank")}{" "}
            {isLoading && <MiniLoader />}
          </label>
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-uhuBlue focus:border-uhuBlue"
            value={bankCode}
            onChange={(e) => {
              const selectedBank = supportedBanks.find(
                (bank) => bank.bankCode === e.target.value
              );
              if (selectedBank) {
                setBankCode(selectedBank.bankCode);
                setBankName(selectedBank.name);
                setInstitutionName(selectedBank.institutionName);
                setTransferCode(selectedBank.transferCode);
              }
            }}
          >
            <option value="">
              {tCrossborder("withdraw.koywe.selectBankPlaceholder")}
            </option>
            {supportedBanks.map((bank) => (
              <option key={bank.bankCode} value={bank.bankCode}>
                {bank.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {tCrossborder("withdraw.koywe.accountNumber")}
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-uhuBlue focus:border-uhuBlue"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
            placeholder={tCrossborder(
              "withdraw.koywe.accountNumberPlaceholder"
            )}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {tCrossborder("withdraw.koywe.documentNumber")}
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-uhuBlue focus:border-uhuBlue"
            value={documentNumber}
            onChange={(e) => setDocumentNumber(e.target.value)}
            placeholder={tCrossborder(
              "withdraw.koywe.documentNumberPlaceholder"
            )}
          />
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => setView("selectBankAccount")}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            {tCrossborder("withdraw.koywe.cancel")}
          </button>
          <LoadingButton
            isLoading={loadingButtonState}
            error={error}
            onClick={handleCreateBankAccount}
            active={Boolean(bankCode && accountNumber && documentNumber)}
          >
            {tCrossborder("withdraw.koywe.save")}
          </LoadingButton>
        </div>
      </div>
    </div>
  );
}
