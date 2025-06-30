import { useTranslation } from "next-i18next";
import { useEffect, useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import { Account } from "thirdweb/wallets";
import { api, sendErrorReport } from "../../../../../../context/UserContext";
import { Consumer, Vendor } from "../../../../../types/payload-types";
import Loader from "../../../../UI/Loader";
import { LoadingButtonStates } from "../../../../UI/LoadingButton";
import { BankAccount, CryptoAccount, PaymentInfo, StasisErrors } from "../../universal/stasis.types";
import { AddBank, AddCrypto, Deposit, SelectBank, SelectCrypto, StasisKYC, Success } from "./Slides";
import { useRouter } from "next/router";

interface StasisHeaderProps {
  view: string;
  setView: (view: string) => void;
}

interface StasisProps {
  amount: number;
  account: Account;
  user: Vendor | Consumer;
}

function StasisHeader({ view, setView }: StasisHeaderProps) {
  const { t: tCrossborder } = useTranslation("crossborder");

  const viewTitles: Record<string, string> = {
    addBank: tCrossborder("deposit.stasis.header.addBank"),
    addCrypto: tCrossborder("deposit.stasis.header.addCrypto"),
    selectCrypto: tCrossborder("deposit.stasis.header.selectCrypto"),
    selectBank: tCrossborder("deposit.stasis.header.selectBank"),
    deposit: tCrossborder("deposit.stasis.header.deposit"),
  };

  const previousView: Record<string, string> = {
    selectCrypto: "selectBank",
    addBank: "selectBank",
    addCrypto: "selectCrypto",
    deposit: "selectCrypto",
  };

  const handleBackClick = () => {
    setView(previousView[view]);
  };

  return (
    <div className="flex w-full items-center mb-4 bg-gray-100 p-4 rounded-lg shadow-sm">
      {view !== "selectBank" && view !== "success" && (
        <button className="mr-4 text-gray-500 hover:text-gray-700 transition" onClick={handleBackClick}>
          <IoArrowBack className="w-6 h-6" />
        </button>
      )}
      <div className="text-2xl font-bold leading-6 text-gray-900 flex-grow">
        {viewTitles[view] || tCrossborder("deposit.stasis.header.default")}
      </div>
    </div>
  );
}

export default function Stasis({ amount, account, user }: StasisProps) {
  const [loadingState, setLoadingState] = useState<LoadingButtonStates>("normal");
  const [errors, setErrors] = useState<StasisErrors>({
    bankAccount: null,
    cryptoAccount: null,
    amount: null,
    send: null,
  });
  const router = useRouter();

  const [view, setView] = useState<string>("selectBank");
  const [bankAccounts, setBankAccounts] = useState<BankAccount[]>([]);
  const [cryptoAccounts, setCryptoAccounts] = useState<CryptoAccount[]>([]);

  const [newCryptoAccountName, setNewCryptoAccountName] = useState<string | null>(null);

  const [selectedBankAccount, setSelectedBankAccount] = useState<BankAccount | null>(null);
  const [selectedCryptoAccount, setSelectedCryptoAccount] = useState<CryptoAccount | null>(null);

  const [reference, setReference] = useState<string>("");
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo | null>(null);
  const { t: tCrossborder } = useTranslation("crossborder");

  useEffect(() => {
    async function fetchData() {
      setLoadingState("processing");
      await fetchBankAccounts();
      await fetchCryptoAccounts();
      setLoadingState("normal");
    }
    fetchData();
  }, [account]);

  const fetchBankAccounts = async () => {
    if (!user.stasisClientUUID) {
      console.log("Stasis client UUID is missing");
      return;
    }
    try {
      const response = await api.get("/api/fiatTransaction/stasis/getBankAccounts");
      setBankAccounts(response.data);
    } catch (error) {
      sendErrorReport("Stasis - Deposit - Fetching bank accounts failed", error);
      setErrors({
        ...errors,
        bankAccount: tCrossborder("deposit.stasis.errors.bankAccountFetch"),
      });
      console.error("Error fetching bank accounts", error);
    }
  };

  const fetchCryptoAccounts = async () => {
    if (!user.stasisClientUUID) {
      console.log("Stasis client UUID is missing");
      return;
    }
    try {
      const response = await api.get("/api/fiatTransaction/stasis/getCryptoAccounts");
      setCryptoAccounts(response.data);
    } catch (error) {
      sendErrorReport("Stasis - Deposit - Fetching crypto accounts failed", error);
      setErrors({
        ...errors,
        cryptoAccount: tCrossborder("deposit.stasis.errors.cryptoAccountFetch"),
      });
      console.error("Error fetching crypto accounts", error);
    }
  };

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
      const walletAddress = account.address;
      const readableMessage = `I confirm the ownership of address ${
        account.address
      }. Signature time: ${new Date().toISOString()}.`;

      // Convert this message to a hex string (this is what your example shows)
      const wallet_message = "0x" + Buffer.from(readableMessage).toString("hex");

      const wallet_signature = await account.signMessage({
        message: wallet_message,
      });

      await api.post("/api/fiatTransaction/stasis/createCryptoAccount", {
        name: newCryptoAccountName,
        network_type: "polygon",
        address: walletAddress,
        wallet_message,
        wallet_signature,
      });

      await fetchCryptoAccounts();
      setView("selectCrypto");
      setErrors({ ...errors, cryptoAccount: null });
      setLoadingState("normal");
    } catch (error) {
      sendErrorReport("Stasis - Deposit - Creating crypto account failed", error);
      console.error("Error creating crypto account", error);
      setView("selectCrypto");
      setErrors({
        ...errors,
        cryptoAccount: tCrossborder("deposit.stasis.errors.cryptoAccountCreate"),
      });
    }
  };

  const handleSelectBankAccount = (bankAccount: BankAccount) => {
    setSelectedBankAccount(bankAccount);
    setView("selectCrypto");
  };

  const handleSelectCryptoAccount = (cryptoAccount: CryptoAccount) => {
    setSelectedCryptoAccount(cryptoAccount);
    setView("deposit");
  };

  const handleSend = async () => {
    if (!selectedBankAccount || !selectedCryptoAccount) return;

    setLoadingState("processing");
    try {
      const createDepositRes = await api.post("/api/fiatTransaction/stasis/createDeposit", {
        amount: amount,
        bankAccountId: selectedBankAccount.uuid,
        cryptoAccountId: selectedCryptoAccount.uuid,
      });

      /*
      setReference(createDepositRes.data.toAccountReference);
      setPaymentInfo(createDepositRes.data.paymentInfo);
      setView("success");
      setLoadingState("normal");
      */

      // route to transaction page
      router.push(`/transaction/${createDepositRes.data.transaction.id}`);
    } catch (error) {
      sendErrorReport("Stasis - Deposit - Creating deposit failed", error);
      console.error("Error handling send", error);
      setView("deposit");
      setLoadingState("normal");
      setErrors({
        ...errors,
        send: tCrossborder("deposit.stasis.errors.transactionError"),
      });
    }
  };

  const renderLoader = () => (
    <div className="flex items-center justify-center h-[30rem]">
      <Loader />
    </div>
  );

  if (loadingState === "processing") {
    return renderLoader();
  }

  const kycMissing = user.stasisKYBStatus !== "approved";

  return (
    <div className="flex flex-col w-full max-w-4xl items-center justify-center p-4">
      <StasisHeader view={view} setView={setView} />

      {kycMissing ? (
        <StasisKYC />
      ) : view === "selectBank" ? (
        <SelectBank
          bankAccounts={bankAccounts}
          onSelectBank={handleSelectBankAccount}
          onAddBank={() => setView("addBank")}
        />
      ) : view === "selectCrypto" ? (
        <SelectCrypto
          cryptoAccounts={cryptoAccounts}
          onSelectCrypto={handleSelectCryptoAccount}
          onAddCrypto={() => setView("addCrypto")}
        />
      ) : view === "addBank" ? (
        <AddBank
          loadingState={loadingState}
          errors={errors}
          setLoadingState={setLoadingState}
          fetchBankAccounts={fetchBankAccounts}
          setErrors={setErrors}
          setView={setView}
        />
      ) : view === "addCrypto" ? (
        <AddCrypto
          account={account}
          newCryptoAccountName={newCryptoAccountName}
          onCryptoAccountNameChange={setNewCryptoAccountName}
          onAddCryptoAccount={handleAddCryptoAccount}
          loadingState={loadingState}
          errors={errors}
        />
      ) : view === "deposit" && selectedBankAccount && selectedCryptoAccount ? (
        <Deposit
          amount={amount}
          selectedBankAccount={selectedBankAccount}
          selectedCryptoAccount={selectedCryptoAccount}
          onSend={handleSend}
          loadingState={loadingState}
          errors={errors}
        />
      ) : view === "success" && paymentInfo ? (
        <Success amount={amount} reference={reference} paymentInfo={paymentInfo} />
      ) : (
        renderLoader()
      )}
    </div>
  );
}
