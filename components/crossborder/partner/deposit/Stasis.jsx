import LoadingButton from "@/tokenPayLib/components/UI/LoadingButton";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  IoAdd,
  IoArrowBack,
  IoCopy,
  IoShieldCheckmarkSharp,
} from "react-icons/io5";

function StasisHeader({ view, setView }) {
  const viewTitles = {
    addBank: "Neues Bankkonto hinzufügen",
    addCrypto: "Neues Krypto-Konto hinzufügen",
    selectCrypto: "Krypto-Konto auswählen",
    selectBank: "Bank-Konto auswählen",
    deposit: "Zusammenfassung",
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
    <div className='flex items-center mb-4'>
      {view !== "selectBank" && view !== "success" && (
        <button
          className='mr-4 text-gray-500 hover:text-gray-700 transition'
          onClick={handleBackClick}
        >
          <IoArrowBack className='w-6 h-6' />
        </button>
      )}
      <h3>{viewTitles[view] || "Stasis Einzahlung"}</h3>
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
      setErrors({
        ...errors,
        bankAccount: "Fehler beim Erstellen des Bankkontos.",
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
      setErrors({
        ...errors,
        cryptoAccount: "Fehler beim Erstellen des Krypto-Kontos.",
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
      // TODO: Report Error with error-reporter
      setErrors({
        ...errors,
        bankAccount: "Fehler beim Erstellen des Bankkontos.",
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
      setErrors({ ...errors, cryptoAccount: "Krypto-Konto nicht verbunden." });
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
      // TODO: log with error-reporter
      console.error("Error creating crypto account", error);
      setErrors({
        ...errors,
        cryptoAccount: "Fehler beim Erstellen des Krypto-Kontos.",
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
      // TODO: log error with error-reporter
      console.error("Error handling send", error);
      setErrors({
        ...errors,
        send: "Fehler bei der Transaktion, bitte später erneut versuchen.",
      });
    }
  };

  // ####################
  // # Render Functions #
  // ####################

  const renderLoader = () => (
    <div className='flex items-center justify-center h-[30rem]'>
      <Loader />
    </div>
  );

  const renderStasisKYCLink = () => (
    <>
      <h2 className='text-xl font-semibold mb-4'>Weitere Informationen erforderlich</h2>
      <p className='text-gray-600'>
      Bitte geben Sie weitere Informationen an. Diese werden im Rahmen eines Know-Your-Customer-Prozesses durch TokenPay gesammelt und an den TokenPay-Partner Stasis weitergegeben.
      </p>
      <Link
        href='/kyc/stasis'
        className='mt-4 bg-uhuBlue text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition flex items-center justify-center'
      >
        Jetzt Informationen vervollständigen
      </Link>
    </>
  );

  const renderSelectBank = () => (
    <div>
      <h2 className='text-xl font-semibold mb-4'>
        Wählen Sie ein Bankkonto aus
      </h2>
      {bankAccounts.length > 0 ? (
        <ul className='space-y-4'>
          {bankAccounts.map((account) => (
            <li
              key={account.uuid}
              className='border p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition'
            >
              <p className='text-sm font-medium text-gray-800 mb-2'>
                {account.name}
              </p>
              <p className='text-xs text-gray-500 mb-1'>
                Besitzer: {account.holder_name}
              </p>
              <p className='text-xs text-gray-500 mb-1'>
                Bank: {account.bank_name}
              </p>
              <p className='text-xs text-gray-500 mb-1'>IBAN: {account.iban}</p>
              <button
                className='mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition'
                onClick={() => handleSelectBankAccount(account)}
              >
                Dieses Konto auswählen
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className='text-gray-600'>Keine Bankkonten verfügbar.</p>
      )}
      <button
        className='mt-6 w-full bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition flex items-center justify-center'
        onClick={() => setView("addBank")}
      >
        <IoAdd className='mr-2' /> Neues Bankkonto hinzufügen
      </button>
    </div>
  );

  const renderAddBank = () => (
    <div className='w-[50%]'>
      <div className='mb-2'>
        {/* Name */}
        <label
          htmlFor='holder_name'
          className='block text-sm font-medium text-gray-700'
        >
          Name des Kontos:
        </label>
        <input
          type='text'
          name='name'
          id='name'
          required
          value={newBankAccount.name}
          onChange={(e) =>
            setNewBankAccount({
              ...newBankAccount,
              name: e.target.value,
            })
          }
          className='mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
        />
      </div>
      <div className='mb-2'>
        {/* Holder Name */}
        <label
          htmlFor='holder_name'
          className='block text-sm font-medium text-gray-700'
        >
          Name des Kontoinhabers:
        </label>
        <input
          type='text'
          name='holder_name'
          id='holder_name'
          required
          value={newBankAccount.holder_name}
          onChange={(e) =>
            setNewBankAccount({
              ...newBankAccount,
              holder_name: e.target.value,
            })
          }
          className='mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
        />
      </div>
      <div className='mb-2'>
        {/* IBAN */}
        <label
          htmlFor='iban'
          className='block text-sm font-medium text-gray-700'
        >
          IBAN:
        </label>
        <input
          type='text'
          name='iban'
          id='iban'
          required
          value={newBankAccount.iban}
          onChange={(e) =>
            setNewBankAccount({
              ...newBankAccount,
              iban: e.target.value,
            })
          }
          className='mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
        />
      </div>
      <div className='mb-2'>
        {/* Bank Code */}
        <label
          htmlFor='bank_code'
          className='block text-sm font-medium text-gray-700'
        >
          BIC:
        </label>
        <input
          type='text'
          name='bank_code'
          id='bank_code'
          required
          value={newBankAccount.bank_code}
          onChange={(e) =>
            setNewBankAccount({
              ...newBankAccount,
              bank_code: e.target.value,
            })
          }
          className='mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
        />
      </div>
      <div className='mb-2'>
        {/* Bank Name */}
        <label
          htmlFor='bank_name'
          className='block text-sm font-medium text-gray-700'
        >
          Name der Bank:
        </label>
        <input
          type='text'
          name='bank_name'
          id='bank_name'
          required
          value={newBankAccount.bank_name}
          onChange={(e) =>
            setNewBankAccount({
              ...newBankAccount,
              bank_name: e.target.value,
            })
          }
          className='mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
        />
      </div>

      {/* Submit Button */}
      <LoadingButton
        active={newBankAccountCompletlyFilled()}
        isLoading={loadingState}
        onClick={handleAddBankAccount}
        className='w-full bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition flex items-center justify-center'
      >
        <IoAdd className='mr-2' /> Bankkonto hinzufügen
      </LoadingButton>

      {/* Error message */}
      {errors.bankAccount && (
        <p className='text-red-500 text-sm mt-2'>{errors.bankAccount}</p>
      )}
    </div>
  );

  const renderSelectCrypto = () => (
    <div>
      <h2 className='text-xl font-semibold mb-4'>
        Wählen Sie ein Krypto-Konto aus
      </h2>
      {cryptoAccounts.length > 0 ? (
        <ul className='space-y-4'>
          {cryptoAccounts.map((account) => (
            <li
              key={account.uuid}
              className='border p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition'
            >
              <p className='text-sm font-medium text-gray-800 mb-1'>
                {account.name}
              </p>
              <p className='text-xs text-gray-500'>
                Adresse: {account.address}
              </p>
              <button
                className='mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition'
                onClick={() => handleSelectCryptoAccount(account)}
              >
                Dieses Krypto-Konto auswählen
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className='text-gray-600'>Keine Krypto-Konten verfügbar.</p>
      )}
      <button
        className='mt-6 w-full bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition flex items-center justify-center'
        onClick={() => setView("addCrypto")}
      >
        <IoAdd className='mr-2' /> Neues Krypto-Konto hinzufügen
      </button>
    </div>
  );

  const renderAddCrypto = () => (
    <div className='w-[50%]'>
      <div className='mb-2'>
        {/* Crypto Account Name */}
        <label
          htmlFor='crypto_name'
          className='block text-sm font-medium text-gray-700'
        >
          Konto Name:
        </label>
        <input
          type='text'
          required
          id='crypto_name'
          name='crypto_name'
          value={newCryptoAccountName}
          onChange={(e) => {
            e.preventDefault();
            setNewCryptoAccountName(e.target.value);
          }}
          className='mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
        />
      </div>

      {/* Connected Crypto Wallet Address */}
      <div className='bg-gray-100 rounded p-2 mb-2'>
        <p>Aktuelles Konto: </p>
        <p className='font-bold break-all'>{account?.address}</p>
      </div>

      {/* Add Button */}
      <LoadingButton
        isLoading={loadingState}
        active={newCryptoAccountName !== null}
        onClick={handleAddCryptoAccount}
        className='w-full bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition flex items-center justify-center'
      >
        <IoAdd className='mr-2' /> Krypto-Konto hinzufügen
      </LoadingButton>

      {/* Error Box */}
      {errors.cryptoAccount && (
        <p className='text-red-500 text-sm mt-2'>{errors.cryptoAccount}</p>
      )}
    </div>
  );

  const renderDeposit = () => (
    <div className='flex flex-col items-center'>
      <div className='w-full flex flex-col mt-4'>
        {/* Deposit Amount */}
        <div className='mb-2'>Ihr gewählter Einzahlungs Betrag:</div>
        <div className='border p-4 rounded-lg bg-gray-50 mb-4'>
          <p className='text-sm font-medium text-gray-800'>{amount} €</p>
        </div>

        {/* Selected Bank Account Info*/}
        <div className='mb-2'>Ausgewähltes Bankkonto:</div>
        {selectedBankAccount && (
          <div className='border p-4 rounded-lg bg-gray-50 mb-4'>
            <p className='text-sm font-medium text-gray-800'>
              {selectedBankAccount.holder_name} -{" "}
              {selectedBankAccount.bank_name}
            </p>
            <p className='text-xs text-gray-500'>
              IBAN: {selectedBankAccount.iban}
            </p>
          </div>
        )}

        {/* Selected Crypto Account Info*/}
        <div className='mb-2'>Ausgewähltes Krypto-Konto:</div>
        {selectedCryptoAccount && (
          <div className='border p-4 rounded-lg bg-gray-50 mb-4'>
            <p className='text-sm font-medium text-gray-800'>
              {selectedCryptoAccount.name}
            </p>
            <p className='text-xs text-gray-500'>
              Adresse: {selectedCryptoAccount.address}
            </p>
          </div>
        )}

        {/* Submit Button */}
        <LoadingButton
          isLoading={loadingState}
          onClick={handleSend}
          className='w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition'
        >
          Einzahlung initiieren
        </LoadingButton>

        {/* Error Box */}
        {errors.send && (
          <p className='text-red-500 text-sm mt-2'>{errors.send}</p>
        )}
      </div>
    </div>
  );

  const renderSuccess = () => (
    <div className='flex items-center flex-col justify-center gap-4 h-[30rem]'>
      <IoShieldCheckmarkSharp className='text-green-500 w-16 h-16' />
      <div className='text-2xl text-center text-gray-700 font-bold'>
        Ihr Geldtransfer wurde erfolgreich initiiert.
      </div>
      <div className='text-center text-gray-600'>
        <div className='w-full flex flex-col mt-4 gap-2'>
          <h3 className='text-lg font-semibold mb-4'>
            Einzahlungsinformationen
          </h3>

          {/* Amount */}
          <div className='flex justify-start flex-1 gap-2'>
            <p className='text-sm font-medium text-gray-800'>
              <span className='font-bold'>Betrag:</span> {amount} EUR
            </p>
          </div>

          {/* Bank Name */}
          <div className='flex justify-start flex-1 gap-2'>
            <p className='text-sm font-medium text-gray-800'>
              <span className='font-bold'>Bankname:</span>{" "}
              {paymentInfo.bank_name}
            </p>
          </div>

          {/* Bank Country */}
          <div className='flex justify-start flex-1 gap-2'>
            <p className='text-sm font-medium text-gray-800'>
              <span className='font-bold'>Land der Bank:</span>{" "}
              {paymentInfo.bank_country}
            </p>
          </div>

          {/* Bank Code */}
          <div className='flex justify-start flex-1 gap-2'>
            <p className='text-sm font-medium text-gray-800'>
              <span className='font-bold'>BIC:</span> {paymentInfo.bank_code}
            </p>
          </div>

          {/* Bank Account */}
          <div className='flex justify-start flex-1 gap-2'>
            <p className='text-sm font-medium text-gray-800'>
              <span className='font-bold'>IBAN:</span>{" "}
              {paymentInfo.bank_account}
            </p>
            <button
              className='text-blue-500 hover:text-blue-700'
              onClick={() =>
                navigator.clipboard.writeText(paymentInfo.bank_account)
              }
            >
              <IoCopy className='w-5 h-5' />
            </button>
          </div>

          {/* Reference Code */}
          <div className='flex justify-start flex-1 gap-2'>
            <p className='text-sm font-medium text-gray-800'>
              <span className='font-bold'>Referenzcode:</span> {reference}
            </p>
            <button
              className='text-blue-500 hover:text-blue-700'
              onClick={() => navigator.clipboard.writeText(reference)}
            >
              <IoCopy className='w-5 h-5' />
            </button>
          </div>

          <p className='text-sm text-gray-600 mb-4 mt-5'>
            Bitte geben Sie den Referenzcode bei Ihrer Überweisung an, damit die
            Zahlung korrekt zugeordnet werden kann. Und überweisen Sie von ihrem
            Ausgewählten Bankkonto.
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
    <div className='flex flex-col w-full max-w-4xl  items-center justify-center p-4'>
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
