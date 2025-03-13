import LoadingButton from "@/tokenPayLib/components/UI/LoadingButton";
import axios from "axios";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  IoAdd,
  IoArrowBack,
  IoCopy,
  IoShieldCheckmarkSharp,
} from "react-icons/io5";
import Loader from "@/tokenPayLib/components/UI/Loader"; // Import the Loader component
import { sendErrorReport } from "@/context/UserContext";

function StasisHeader({ view, setView }) {
  const { t: tCrossborder } = useTranslation("crossborder");

  const viewTitles = {
    addBank: tCrossborder("deposit.stasis.header.addBank"),
    addCrypto: tCrossborder("deposit.stasis.header.addCrypto"),
    selectCrypto: tCrossborder("deposit.stasis.header.selectCrypto"),
    selectBank: tCrossborder("deposit.stasis.header.selectBank"),
    deposit: tCrossborder("deposit.stasis.header.deposit"),
  };

  const previousView = {
    selectCrypto: "selectBank",
    addBank: "selectBank",
    addCrypto: "selectCrypto",
    deposit: "selectCrypto",
  };

  const handleBackClick = () => {
    setView(previousView[view]);
  };

  return (
    <div className="flex items-center mb-4">
      {view !== "selectBank" && view !== "success" && (
        <button
          className="mr-4 text-gray-500 hover:text-gray-700 transition"
          onClick={handleBackClick}
        >
          <IoArrowBack className="w-6 h-6" />
        </button>
      )}
      <h3>{viewTitles[view] || tCrossborder("deposit.stasis.header.default")}</h3>
    </div>
  );
}

export default function Stasis({ amount, account, user }) {
  // 'normal', 'processing'
  const [loadingState, setLoadingState] = useState("normal");
  const [errors, setErrors] = useState({
    bankAccount: null,
    cryptoAccount: null,
    amount: null,
    send: null,
  });

  // 'selectBank', 'selectCrypto', 'addBank', 'addCrypto', 'deposit', 'success' or 'loading'
  const [view, setView] = useState("selectBank");
  const [bankAccounts, setBankAccounts] = useState([]);
  const [cryptoAccounts, setCryptoAccounts] = useState([]);

  const [newBankAccount, setNewBankAccount] = useState({
    name: "",
    iban: "",
    bank_code: "",
    bank_name: "",
    holder_name: "",
  });
  const [newCryptoAccountName, setNewCryptoAccountName] = useState(null);

  const [selectedBankAccount, setSelectedBankAccount] = useState(null);
  const [selectedCryptoAccount, setSelectedCryptoAccount] = useState("");

  const [reference, setReference] = useState("");
  const [paymentInfo, setPaymentInfo] = useState(null);
    const { t: tCrossborder } = useTranslation("crossborder");


  useEffect(() => {
    fetchBankAccounts();
    fetchCryptoAccounts();
  }, [account]);

  // ###################
  // # Component Logic #
  // ###################

  /**
   * Fetches the users bank accounts from the backend via stasis and sets them in the state.
   */
  const fetchBankAccounts = async () => {
    try {
      const response = await axios.get("/api/vendor/stasis/getBankAccounts");
      setBankAccounts(response.data);
    } catch (error) {
      sendErrorReport("Stasis - Deposit - Fetching bank accounts failed", error);
      setErrors({
        ...errors,
        bankAccount: tCrossborder("deposit.stasis.errors.bankAccountFetch"),
      });
      console.error("Error fetching bank accounts", error);
      // TODO: Add error-reporter
    }
  };

  /**
   * Fetches the users crypto accounts from the backend via stasis and sets them in the state.
   */
  const fetchCryptoAccounts = async () => {
    try {
      const response = await axios.get("/api/vendor/stasis/getCryptoAccounts");
      setCryptoAccounts(response.data);
    } catch (error) {
      sendErrorReport("Stasis - Deposit - Fetching crypto accounts failed", error);
      setErrors({
        ...errors,
        cryptoAccount: tCrossborder("deposit.stasis.errors.cryptoAccountFetch"),
      });
      console.error("Error fetching crypto accounts", error);
      // TODO: Add error-reporter
    }
  };

  /**
   * Checks if the newBankAccount is completly filled.
   *
   * @returns true if all fields are filled and false if not
   */
  const newBankAccountCompletlyFilled = () => {
    return (
      newBankAccount.name &&
      newBankAccount.iban &&
      newBankAccount.bank_code &&
      newBankAccount.bank_name &&
      newBankAccount.holder_name
    );
  };

  /**
   * Handles the submit of the newBankAccount Form.
   * On success transistions to the "select" view.
   * On error the errors.bankAccount is set.
   */
  const handleAddBankAccount = async () => {
    setLoadingState("processing");

    // The newBankAccount can only be submitted by its submit button
    //  if all values are set so it is safe to send here

    try {
      await axios.post("/api/vendor/stasis/createBankAccount", newBankAccount);
      await fetchBankAccounts();
      setView("selectBank");

      // Clear the error state for bankAccount
      setErrors({
        ...errors,
        bankAccount: null,
      });
      setLoadingState("normal");
    } catch (error) {
      sendErrorReport("Stasis - Deposit - Creating bank account failed", error);
      // TODO: Report Error with error-reporter
      setErrors({
        ...errors,
        bankAccount: tCrossborder("deposit.stasis.errors.bankAccountCreate"),
      });
    }
  };

  /**
   * Creates a new CryptoAccount by calling the backend.
   * Checks if an account is present with an wallet address for the crypot account.
   * On success transitions to view "selectCrypto".
   *
   */
  const handleAddCryptoAccount = async () => {
    if (!account) {
      setErrors({
        ...errors,
        cryptoAccount: tCrossborder("deposit.stasis.errors.cryptoAccountNotConnected"),
      });
      return;
    }

    setLoadingState("processing");
    try {
      // Step 1: Get wallet address and generate message for signing
      const walletAddress = account.address;
      const wallet_message = "test message";

      // Step 2: Sign message
      const wallet_signature = await account.signMessage({
        message: wallet_message,
      });

      // Step 3: Create crypto account on the backend
      await axios.post("/api/vendor/stasis/createCryptoAccount", {
        name: newCryptoAccountName,
        network_type: "polygon",
        address: walletAddress,
        wallet_message,
        wallet_signature,
      });

      await fetchCryptoAccounts();
      setView("selectCrypto");
      // Reset cryptoAccount errors
      setErrors({ ...errors, cryptoAccount: "" });
      setLoadingState("normal");
    } catch (error) {
      sendErrorReport("Stasis - Deposit - Creating crypto account failed", error);
      // TODO: log with error-reporter
      console.error("Error creating crypto account", error);
      setErrors({
        ...errors,
        cryptoAccount: tCrossborder("deposit.stasis.errors.cryptoAccountCreate"),
      });
    }
  };

  /**
   * Sets the selectedBankAccount and transistions to the selectCrypto view
   *
   * @param bankAccount The selected bank account
   */
  const handleSelectBankAccount = (bankAccount) => {
    setSelectedBankAccount(bankAccount);
    setView("selectCrypto");
  };

  /**
   * Sets the selectedCryptoAccount and transistions to the "deposit" view
   *
   * @param cryptoAccount The selected bank account
   */
  const handleSelectCryptoAccount = (cryptoAccount) => {
    setSelectedCryptoAccount(cryptoAccount);
    setView("deposit");
  };

  const handleSend = async () => {
    setLoadingState("processing");

    // Amount is already parsed to a number in the /deposit page

    try {
      let createDepositRes = await axios.post(
        "/api/fiatTransaction/stasis/createDeposit",
        {
          amount: amount,
          bankAccountId: selectedBankAccount.uuid,
          cryptoAccountId: selectedCryptoAccount.uuid,
        }
      );

      setReference(createDepositRes.data.toAccountReference);
      setPaymentInfo(createDepositRes.data.paymentInfo);

      setView("success");
      setLoadingState("normal");
    } catch (error) {
      sendErrorReport("Stasis - Deposit - Creating deposit failed", error);
      // TODO: log error with error-reporter
      console.error("Error handling send", error);
      setErrors({
        ...errors,
        send: tCrossborder("deposit.stasis.errors.transactionError"),
      });
    }
  };

  // ####################
  // # Render Functions #
  // ####################

  const renderLoader = () => (
    <div className="flex items-center justify-center h-[30rem]">
      <Loader />
    </div>
  );

  const renderStasisKYCLink = () => (
    <>
      <h2 className="text-xl font-semibold mb-4">
        {tCrossborder("deposit.stasis.kyc.heading")}
      </h2>
      <p className="text-gray-600">
        {tCrossborder("deposit.stasis.kyc.description")}
      </p>
      <Link
        href="/kyc/stasis"
        className="mt-4 bg-uhuBlue text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition flex items-center justify-center"
      >
        {tCrossborder("deposit.stasis.kyc.button")}
      </Link>
    </>
  );

  const renderSelectBank = () => (
    <div>
      <h2 className="text-xl font-semibold mb-4">
        {tCrossborder("deposit.stasis.selectBank.heading")}
      </h2>
      {bankAccounts.length > 0 ? (
        <ul className="space-y-4">
          {bankAccounts.map((account) => (
            <li
              key={account.uuid}
              className="border p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition"
            >
              <p className="text-sm font-medium text-gray-800 mb-2">
                {account.name}
              </p>
              <p className="text-xs text-gray-500 mb-1">
                {tCrossborder("deposit.stasis.selectBank.owner")}{" "}
                {account.holder_name}
              </p>
              <p className="text-xs text-gray-500 mb-1">
              {tCrossborder("deposit.stasis.selectBank.bank")} {account.bank_name}
              </p>
              <p className="text-xs text-gray-500 mb-1">
                IBAN: {account.iban}
              </p>
              <button
                className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                onClick={() => handleSelectBankAccount(account)}
              >
                {tCrossborder("deposit.stasis.selectBank.button")}
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600">
          {tCrossborder("deposit.stasis.selectBank.noAccounts")}
        </p>
      )}
      <button
        className="mt-6 w-full bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition flex items-center justify-center"
        onClick={() => setView("addBank")}
      >
        <IoAdd className="mr-2" />{" "}
        {tCrossborder("deposit.stasis.selectBank.addButton")}
      </button>
    </div>
  );

  const renderAddBank = () => (
    <div className="w-[50%]">
      <div className="mb-2">
        {/* Name */}
        <label
          htmlFor="holder_name"
          className="block text-sm font-medium text-gray-700"
        >
           {tCrossborder("deposit.stasis.addBank.accountName")}
        </label>
        <input
          type="text"
          name="name"
          id="name"
          required
          value={newBankAccount.name}
          onChange={(e) =>
            setNewBankAccount({
              ...newBankAccount,
              name: e.target.value,
            })
          }
          className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-2">
        {/* Holder Name */}
        <label
          htmlFor="holder_name"
          className="block text-sm font-medium text-gray-700"
        >
          {tCrossborder("deposit.stasis.addBank.accountHolderName")}
        </label>
        <input
          type="text"
          name="holder_name"
          id="holder_name"
          required
          value={newBankAccount.holder_name}
          onChange={(e) =>
            setNewBankAccount({
              ...newBankAccount,
              holder_name: e.target.value,
            })
          }
          className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-2">
        {/* IBAN */}
        <label
          htmlFor="iban"
          className="block text-sm font-medium text-gray-700"
        >
          {tCrossborder("deposit.stasis.addBank.iban")}
        </label>
        <input
          type="text"
          name="iban"
          id="iban"
          required
          value={newBankAccount.iban}
          onChange={(e) =>
            setNewBankAccount({
              ...newBankAccount,
              iban: e.target.value,
            })
          }
          className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-2">
        {/* Bank Code */}
        <label
          htmlFor="bank_code"
          className="block text-sm font-medium text-gray-700"
        >
          {tCrossborder("deposit.stasis.addBank.bic")}
        </label>
        <input
          type="text"
          name="bank_code"
          id="bank_code"
          required
          value={newBankAccount.bank_code}
          onChange={(e) =>
            setNewBankAccount({
              ...newBankAccount,
              bank_code: e.target.value,
            })
          }
          className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-2">
        {/* Bank Name */}
        <label
          htmlFor="bank_name"
          className="block text-sm font-medium text-gray-700"
        >
          {tCrossborder("deposit.stasis.addBank.bankName")}
        </label>
        <input
          type="text"
          name="bank_name"
          id="bank_name"
          required
          value={newBankAccount.bank_name}
          onChange={(e) =>
            setNewBankAccount({
              ...newBankAccount,
              bank_name: e.target.value,
            })
          }
          className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Submit Button */}
      <LoadingButton
        active={newBankAccountCompletlyFilled()}
        isLoading={loadingState}
        onClick={handleAddBankAccount}
        className="w-full bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition flex items-center justify-center"
      >
        <IoAdd className="mr-2" /> {tCrossborder("deposit.stasis.addBank.button")}
      </LoadingButton>

      {/* Error message */}
      {errors.bankAccount && (
        <p className="text-red-500 text-sm mt-2">{errors.bankAccount}</p>
      )}
    </div>
  );

  const renderSelectCrypto = () => (
    <div>
      <h2 className="text-xl font-semibold mb-4">
        {tCrossborder("deposit.stasis.selectCrypto.heading")}
      </h2>
      {cryptoAccounts.length > 0 ? (
        <ul className="space-y-4">
          {cryptoAccounts.map((account) => (
            <li
              key={account.uuid}
              className="border p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition"
            >
              <p className="text-sm font-medium text-gray-800 mb-1">
                {account.name}
              </p>
              <p className="text-xs text-gray-500">
                {tCrossborder("deposit.stasis.selectCrypto.address")}
                {account.address}
              </p>
              <button
                className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                onClick={() => handleSelectCryptoAccount(account)}
              >
                {tCrossborder("deposit.stasis.selectCrypto.button")}
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600">
          {tCrossborder("deposit.stasis.selectCrypto.noAccounts")}
        </p>
      )}
      <button
        className="mt-6 w-full bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition flex items-center justify-center"
        onClick={() => setView("addCrypto")}
      >
        <IoAdd className="mr-2" />
        {tCrossborder("deposit.stasis.selectCrypto.addButton")}
      </button>
    </div>
  );

  const renderAddCrypto = () => (
    <div className="w-[50%]">
      <div className="mb-2">
        {/* Crypto Account Name */}
        <label
          htmlFor="crypto_name"
          className="block text-sm font-medium text-gray-700"
        >
          {tCrossborder("deposit.stasis.addCrypto.accountName")}
        </label>
        <input
          type="text"
          required
          id="crypto_name"
          name="crypto_name"
          value={newCryptoAccountName}
          onChange={(e) => {
            e.preventDefault();
            setNewCryptoAccountName(e.target.value);
          }}
          className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Connected Crypto Wallet Address */}
      <div className="bg-gray-100 rounded p-2 mb-2">
        <p>{tCrossborder("deposit.stasis.addCrypto.currentAccount")}</p>
        <p className="font-bold break-all">{account?.address}</p>
      </div>

      {/* Add Button */}
      <LoadingButton
        isLoading={loadingState}
        active={newCryptoAccountName !== null}
        onClick={handleAddCryptoAccount}
        className="w-full bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition flex items-center justify-center"
      >
        <IoAdd className="mr-2" />   {tCrossborder("deposit.stasis.addCrypto.button")}
      </LoadingButton>

      {/* Error Box */}
      {errors.cryptoAccount && (
        <p className="text-red-500 text-sm mt-2">{errors.cryptoAccount}</p>
      )}
    </div>
  );

  const renderDeposit = () => (
    <div className="flex flex-col items-center">
      <div className="w-full flex flex-col mt-4">
        {/* Deposit Amount */}
        <div className="mb-2">{tCrossborder("deposit.stasis.deposit.amountLabel")}</div>
        <div className="border p-4 rounded-lg bg-gray-50 mb-4">
          <p className="text-sm font-medium text-gray-800">{amount} €</p>
        </div>

        {/* Selected Bank Account Info*/}
        <div className="mb-2">{tCrossborder("deposit.stasis.deposit.selectedBankLabel")}</div>
        {selectedBankAccount && (
          <div className="border p-4 rounded-lg bg-gray-50 mb-4">
            <p className="text-sm font-medium text-gray-800">
              {selectedBankAccount.holder_name} -{" "}
              {selectedBankAccount.bank_name}
            </p>
            <p className="text-xs text-gray-500">
              IBAN: {selectedBankAccount.iban}
            </p>
          </div>
        )}

        {/* Selected Crypto Account Info*/}
        <div className="mb-2">{tCrossborder("deposit.stasis.deposit.selectedCryptoLabel")}</div>
        {selectedCryptoAccount && (
          <div className="border p-4 rounded-lg bg-gray-50 mb-4">
            <p className="text-sm font-medium text-gray-800">
              {selectedCryptoAccount.name}
            </p>
            <p className="text-xs text-gray-500">
            {tCrossborder("deposit.stasis.deposit.address")} {selectedCryptoAccount.address}
            </p>
          </div>
        )}

        {/* Submit Button */}
        <LoadingButton
          isLoading={loadingState}
          onClick={handleSend}
          className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          {tCrossborder("deposit.stasis.deposit.button")}
        </LoadingButton>

        {/* Error Box */}
        {errors.send && (
          <p className="text-red-500 text-sm mt-2">{errors.send}</p>
        )}
      </div>
    </div>
  );

  const renderSuccess = () => (
    <div className="flex items-center flex-col justify-center gap-4 h-[30rem]">
      <IoShieldCheckmarkSharp className="text-green-500 w-16 h-16" />
      <div className="text-2xl text-center text-gray-700 font-bold">
        {tCrossborder("deposit.stasis.success.heading")}
      </div>
      <div className="text-center text-gray-600">
        <div className="w-full flex flex-col mt-4 gap-2">
          <h3 className="text-lg font-semibold mb-4">
           {tCrossborder("deposit.stasis.success.infoHeading")}
          </h3>

          {/* Amount */}
          <div className="flex justify-start flex-1 gap-2">
            <p className="text-sm font-medium text-gray-800">
              <span className="font-bold">{tCrossborder("deposit.stasis.success.amount")}</span> {amount} EUR
            </p>
          </div>

          {/* Bank Name */}
          <div className="flex justify-start flex-1 gap-2">
            <p className="text-sm font-medium text-gray-800">
              <span className="font-bold">{tCrossborder("deposit.stasis.success.bankName")}</span>{" "}
              {paymentInfo.bank_name}
            </p>
          </div>

          {/* Bank Country */}
          <div className="flex justify-start flex-1 gap-2">
            <p className="text-sm font-medium text-gray-800">
              <span className="font-bold">{tCrossborder("deposit.stasis.success.bankCountry")}</span>{" "}
              {paymentInfo.bank_country}
            </p>
          </div>

          {/* Bank Code */}
          <div className="flex justify-start flex-1 gap-2">
            <p className="text-sm font-medium text-gray-800">
              <span className="font-bold">{tCrossborder("deposit.stasis.success.bic")}</span> {paymentInfo.bank_code}
            </p>
          </div>

          {/* Bank Account */}
          <div className="flex justify-start flex-1 gap-2">
            <p className="text-sm font-medium text-gray-800">
              <span className="font-bold">{tCrossborder("deposit.stasis.success.iban")}</span>{" "}
              {paymentInfo.bank_account}
            </p>
            <button
              className="text-blue-500 hover:text-blue-700"
              onClick={() =>
                navigator.clipboard.writeText(paymentInfo.bank_account)
              }
            >
              <IoCopy className="w-5 h-5" />
            </button>
          </div>

          {/* Reference Code */}
          <div className="flex justify-start flex-1 gap-2">
            <p className="text-sm font-medium text-gray-800">
              <span className="font-bold">{tCrossborder("deposit.stasis.success.referenceCode")}</span> {reference}
            </p>
            <button
              className="text-blue-500 hover:text-blue-700"
              onClick={() => navigator.clipboard.writeText(reference)}
            >
              <IoCopy className="w-5 h-5" />
            </button>
          </div>

          <p className="text-sm text-gray-600 mb-4 mt-5">
            {tCrossborder("deposit.stasis.success.instructions")}
          </p>
        </div>
      </div>
    </div>
  );

  // ################
  // # Render Logic #
  // ################

  const kycMissing = user.stasisKYBStatus !== "approved";

  return (
    <div className="flex flex-col w-full max-w-4xl  items-center justify-center p-4">
      <StasisHeader view={view} setView={setView} />

      {kycMissing
        ? renderStasisKYCLink()
        : view === "selectBank"
        ? renderSelectBank()
        : view === "selectCrypto"
        ? renderSelectCrypto()
        : view === "addBank"
        ? renderAddBank()
        : view === "addCrypto"
        ? renderAddCrypto()
        : view === "deposit"
        ? renderDeposit()
        : view === "success"
        ? renderSuccess()
        : renderLoader()}
    </div>
  );
}