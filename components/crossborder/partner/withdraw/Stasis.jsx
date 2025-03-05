'use client'

import { AuthContext } from "@/context/UserContext";
import { Fragment, useContext, useEffect, useState } from "react";
import { IoShieldCheckmarkSharp, IoArrowBack, IoAdd } from "react-icons/io5";
import Loader from "@/tokenPayLib/components/UI/Loader";
import { useActiveAccount } from "thirdweb/react";
import currencies, { formatCrypto } from "@/utilities/currencies";
import {
  createThirdwebClient,
  getContract,
  readContract,
  prepareContractCall,
  sendAndConfirmTransaction,
} from "thirdweb";
import { polygon } from "thirdweb/chains";
import numberWithZeros from "@/utilities/numberWithZeros";
import axios from 'axios';
import LoadingButton from "@/tokenPayLib/components/UI/LoadingButton";
import fetchBalance from "@/tokenPayLib/utilities/crypto/fetchBalance";
import Link from "next/link";
import { client } from "@/pages/_app";
import { tokenPayAbstractionSimpleTransfer } from "@/tokenPayLib/assets/TokenPayAbstraction";

const POOL_FEE = 0.004;

export default function Stasis({ amount, account, user }) {
  const [isLoading, setIsLoading] = useState("normal");
  const [errors, setErrors] = useState({});
  const [selectedToken, setSelectedToken] = useState(currencies["EURS"]);
  const [selectedTokenBalance, setSelectedTokenBalance] = useState(null);
  const [selectedBankAccount, setSelectedBankAccount] = useState(null);
  const [view, setView] = useState('select'); // 'select', 'add', or 'withdraw'
  const [bankAccounts, setBankAccounts] = useState([]);
  const [newBankAccount, setNewBankAccount] = useState({
    name: '',
    iban: '',
    bank_code: '',
    bank_name: '',
    holder_name: '',
  });
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    fetchTokenBalance(selectedToken);
    fetchBankAccounts();
  }, [account, user.euroEAccount]);

  const fetchBankAccounts = async () => {
    try {
      const response = await axios.get('/api/vendor/stasis/getBankAccounts');
      setBankAccounts(response.data);
    } catch (error) {
      console.error('Error fetching bank accounts', error);
    }
  };

  const handleInputChange = (e) => {
    setNewBankAccount({ ...newBankAccount, [e.target.name]: e.target.value });
  };

  const handleAddBankAccount = async () => {

    console.log("newBankAccount", newBankAccount);

    if ( !newBankAccount.iban || !newBankAccount.bank_code || !newBankAccount.bank_name || !newBankAccount.holder_name) {
      setErrors({ ...errors, bankAccount: "Bitte füllen Sie alle Felder aus." });
      return;
    }

    newBankAccount.name = newBankAccount.bank_name;

    setIsProcessing(true);
    try {
      await axios.post('/api/vendor/stasis/createBankAccount', newBankAccount);
      await fetchBankAccounts();
      setView('select');
      setErrors({ ...errors, bankAccount: "" });
    } catch (error) {
      console.error('Error creating bank account', error);
      setErrors({ ...errors, bankAccount: "Fehler beim Erstellen des Bankkontos." });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSelectBankAccount = (account) => {
    setSelectedBankAccount(account);
    setView('withdraw');
  };

  const fetchTokenBalance = async (selectedToken) => {
    setSelectedToken(selectedToken);
    if (!account) return;
    const balance = await fetchBalance(
      selectedToken.contractAddress,
      selectedToken.abi,
      account.address
    );
    setSelectedTokenBalance(balance);
    setErrors((prevErrors) => ({ ...prevErrors, selectedToken: "" }));
  };

  const validate = () => {
    let newErrors = {};
    if (!amount || amount < 10) {
      newErrors.amount = "Bitte geben Sie einen Betrag größer als 10 ein.";
    }
    // check if amount is greater than balance
    if (Number(amount) > Number(selectedTokenBalance)) {
      newErrors.amount = "Sie haben nicht genügend Guthaben.";
    }

    if (!selectedBankAccount) {
      newErrors.bankAccount = "Bitte wählen Sie ein Bankkonto aus.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSend = async () => {
    // only allow if amount is greater than 10
    if (Number(amount) < 10) {
      setErrors({ ...errors, amount: "Der Mindestbetrag beträgt 10 EUR." });
      return;
    }

    if (validate() && account) {
      setIsLoading("processing");
      try {
        // Step 1: Create withdrawal order
        const withdrawalResponse = await axios.post("/api/fiatTransaction/stasis/createWithdraw", {
          incoming_amount: Number(amount-(amount*POOL_FEE)),
          bankAccountId: selectedBankAccount.uuid,
        });

        const { order, transaction } = withdrawalResponse.data;
        const depositAddress = order.deposit_address;

        // Step 2: Send Stasis tokens using Thirdweb
          const { transactionHash } = await tokenPayAbstractionSimpleTransfer(
              client,
              account,
              polygon,
              Number(amount) * 10 ** selectedToken.decimals,
              selectedToken,
              depositAddress
            ) 

        newHash(transactionHash);

        // Step 3: Update the transaction with the hash
        await axios.patch(`/api/fiatTransaction/${transaction.id}`, {
          transactionHash: transactionHash,
        });

        setIsLoading("success");
        setTimeout(() => {
          setIsOpen(false);
          setIsLoading("normal");
        }, 3000);
      } catch (error) {
        console.error("Error handling send", error);
        setErrors({ ...errors, send: "Bitte versuchen Sie es später nochmal" });
        setIsLoading("normal");
      }
    }
  };

  const renderHeader = () => (
    <div className="flex items-center mb-4">
      {view !== 'select' && (
        <button 
          className="mr-4 text-gray-500 hover:text-gray-700 transition"
          onClick={() => setView('select')}
        >
          <IoArrowBack className="w-6 h-6" />
        </button>
      )}
      <div as="h3" className="text-2xl font-bold leading-6 text-gray-900 flex-grow">
        {view === 'add' ? 'Neues Bankkonto hinzufügen' : 'Auszahlen'}
      </div>
    </div>
  );
  
  return (
    <div className="flex flex-col w-full max-w-4xl  items-center justify-center p-4">
     {renderHeader()}
        {isLoading === "processing" ? (
          <div className="flex items-center justify-center h-[30rem]">
            <Loader />
          </div>
        ) : user?.stasisKYBStatus !== "approved" ? (
          <div>
            <h2 className="text-xl font-semibold mb-4">Weitere Informationen erforderlich</h2>
            <p className="text-gray-600">Bitte geben Sie weitere Informationen an. Diese werden im Rahmen eines Know-Your-Customer-Prozesses durch TokenPay gesammelt und an den TokenPay-Partner Stasis weitergegeben.</p>
            <Link href="/kyc/stasis" className="mt-4 bg-uhuBlue text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition flex items-center justify-center">
            Jetzt Informationen vervollständigen
            </Link>
          </div>
        ) : isLoading === "success" ? (
          <div className="flex items-center flex-col justify-center gap-4 h-[30rem]">
            <IoShieldCheckmarkSharp className="text-green-500 w-16 h-16" />
            <div className="text-2xl text-center text-gray-700 font-bold">
              Zahlung erfolgreich abgeschlossen!
            </div>
            <div className="text-center text-gray-600">
              Ihr Geldtransfer wurde erfolgreich initiiert.
            </div>
          </div>
        ) : view === 'select' ? (
          <div>
            <h2 className="text-xl font-semibold mb-4">Wählen Sie ein Bankkonto aus</h2>
            {bankAccounts.length > 0 ? (
              <ul className="space-y-4">
                {bankAccounts.map((account) => (
                  <li key={account.uuid} className="border p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition">
                    <p className="text-sm font-medium text-gray-800">{account.holder_name} - {account.bank_name}</p>
                    <p className="text-xs text-gray-500">IBAN: {account.iban}</p>
                    <button 
                      className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                      onClick={() => handleSelectBankAccount(account)}
                    >
                      Dieses Konto auswählen
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600">Keine Bankkonten verfügbar.</p>
            )}
            <button 
              className="mt-6 w-full bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition flex items-center justify-center"
              onClick={() => setView('add')}
            >
              <IoAdd className="mr-2" /> Neues Bankkonto hinzufügen
            </button>
          </div>
        ) : view === 'add' ? (
          <div>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-sm font-medium text-gray-700">Name des Kontoinhabers:</label>
                <input
                  type="text"
                  name="holder_name"
                  value={newBankAccount.holder_name}
                  onChange={handleInputChange}
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">IBAN:</label>
                <input
                  type="text"
                  name="iban"
                  value={newBankAccount.iban}
                  onChange={handleInputChange}
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Bankname:</label>
                <input
                  type="text"
                  name="bank_name"
                  value={newBankAccount.bank_name}
                  onChange={handleInputChange}
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">BIC:</label>
                <input
                  type="text"
                  name="bank_code"
                  value={newBankAccount.bank_code}
                  onChange={handleInputChange}
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <LoadingButton
                isLoading={isProcessing}
                onClick={handleAddBankAccount}
                disabled={Object.keys(errors).length > 0}
                className="w-full bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition flex items-center justify-center"
              >
                <IoAdd className="mr-2" /> Bankkonto hinzufügen
              </LoadingButton>
            </form>
            {errors.bankAccount && (
              <p className="text-red-500 text-sm mt-2">{errors.bankAccount}</p>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <div className="w-full flex flex-col mt-4">
              <div className="text-gray-600">Guthaben</div>
              <div className="text-4xl font-bold mb-4">
                {formatCrypto(selectedTokenBalance || 0, selectedToken?.decimals || 18, 6)} {selectedToken.name}
              </div>
              <div className="mb-2">Auszahlungsbetrag in {selectedToken.name}:</div>
              

              {errors.amount && (
                <p className="text-red-500 text-sm mb-4">{errors.amount}</p>
              )}
              <div className="mb-2">Ausgewähltes Bankkonto:</div>
              {selectedBankAccount && (
                <div className="border p-4 rounded-lg bg-gray-50 mb-4">
                  <p className="text-sm font-medium text-gray-800">{selectedBankAccount.holder_name} - {selectedBankAccount.bank_name}</p>
                  <p className="text-xs text-gray-500">IBAN: {selectedBankAccount.iban}</p>
                </div>
              )}
              <LoadingButton
                isLoading={isLoading === "processing"}
                onClick={handleSend}
                disabled={Object.keys(errors).length > 0 || !selectedBankAccount}
                className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
              >
                Jetzt Auszahlen
              </LoadingButton>
              {errors.send && (
                <p className="text-red-500 text-sm mt-2">{errors.send}</p>
              )}
            </div>
          </div>
        )}
  </div>
  )
}
