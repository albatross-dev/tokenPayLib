import React, { useEffect, useState, Fragment, useContext } from "react";
import { useActiveAccount } from "thirdweb/react";
import { createThirdwebClient, getContract, readContract } from "thirdweb";
import TokenSelectorSimple from "@/tokenPayLib/components/wallet/TokenSelectorSimple";
import { polygon } from "thirdweb/chains";
import numberWithZeros from "@/utilities/numberWithZeros";
import LoadingButton from "./LoadingButton";
import axios from "axios";
import { AuthContext, sendErrorReport } from "@/context/UserContext";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  Transition,
} from "@headlessui/react";
import SimpleList from "@/tokenPayLib/components/UI/SimpleList";
import moment from "moment";
import { IoShieldCheckmarkSharp } from "react-icons/io5";
import AddressDisplay from "@/tokenPayLib/components/UI/AddressDisplay";
import Loader from "@/tokenPayLib/components/UI/Loader";
import { formatCrypto, TokensByChainId } from "@/tokenPayLib/utilities/crypto/currencies";


const client = createThirdwebClient({
  clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID,
});

const columns = [
  {
    accessorKey: "amount",
    header: "Betrag",
    cell: (props) => {
      return <div className="table-cell ">{props.getValue()}</div>;
    },
  },
  {
    accessorKey: "currencyName",
    header: " Krypto-Währung",
    cell: (props) => {
      return <div className="table-cell ">{props.getValue()}</div>;
    },
  },
  {
    accessorKey: "receivingWallet",
    header: "Empfänger",
    cell: (props) => {
      return (
        <div className="table-cell ">
          <AddressDisplay value={props.getValue()}></AddressDisplay>
        </div>
      );
    },
  },
  {
    accessorKey: "sendingWallet",
    header: "Sender",
    cell: (props) => {
      return (
        <div className="table-cell ">
          <AddressDisplay value={props.getValue()}></AddressDisplay>
        </div>
      );
    },
  },
  {
    accessorKey: "transactionHash",
    header: "Hash",
    cell: (props) => {
      return (
        <div className="table-cell ">
          <AddressDisplay value={props.getValue()}></AddressDisplay>
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Datum",
    cell: (props) => {
      return (
        <div className="table-cell whitespace-nowrap">
          {moment(props.getValue()).format("DD.MM.YYYY, HH:mm")}
        </div>
      );
    },
  },
];

async function fetchBalance(contractAddress, abi, accountAddress) {
  try {
    const contract = getContract({
      client: client,
      chain: polygon,
      address: contractAddress,
      abi,
    });

    const result = await readContract({
      contract,
      method: "function balanceOf(address) view returns (uint256)",
      params: [accountAddress],
    });

    console.log("result", result);

    if (!result) {
      throw new Error("Failed to fetch balance");
    }

    return result;
  } catch (error) {
    console.log("error fetching balance", error);
    sendErrorReport("SendCrypto - Fetching balance failed", error);
    return 0; // Return zero balance in case of an error
  }
}

export default function SendCrypto({ setErrorMessage, setIsErrorPopupOpen }) {
  const [selectedToken, setSelectedToken] = useState(null);
  const [amount, setAmount] = useState(0);
  const [originTokens, setOriginTokens] = useState({});
  const [selectedTokenBalance, setSelectedTokenBalance] = useState(null);
  const account = useActiveAccount();
  const [targetAddress, setTargetAddress] = useState("");
  const [isLoading, setIsLoading] = useState("normal");
  const [errors, setErrors] = useState({});
  const { user } = useContext(AuthContext);
  const [newTxHash, setNewTxHash] = useState(null);

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setOriginTokens(TokensByChainId[polygon.id]);
  }, []);

  useEffect(() => {
    if (newTxHash) fetchTokenBalance(selectedToken);
  }, [newTxHash]);

  const handleMaxClick = () => {
    if (!selectedToken) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        amount: "Bitte wählen Sie zuerst eine Krypto- Krypto-Währung aus.",
      }));
      return;
    }

    setAmount(
      (Number(selectedTokenBalance) || 1) /
        numberWithZeros(selectedToken?.decimals || 1)
    );
  };

  const validate = () => {
    let errors = {};

    if (!selectedToken) {
      errors.selectedToken =
        "Bitte wählen Sie eine Krypto- Krypto-Währung aus.";
    }

    if (!amount || amount <= 0) {
      errors.amount = "Bitte geben Sie einen Betrag größer als 0 ein.";
    }

    if (!targetAddress || !/^0x[a-fA-F0-9]{40}$/.test(targetAddress)) {
      errors.targetAddress = "Bitte geben Sie eine gültige Wallet-Adresse ein.";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const fetchTokenBalance = async (selectedToken) => {
    setSelectedToken(selectedToken);
    console.log("account", account);
    const balance = await fetchBalance(
      selectedToken.contractAddress,
      selectedToken.abi,
      account.address
    );

    setSelectedTokenBalance(balance);
    setErrors((prevErrors) => ({
      ...prevErrors,
      selectedToken: "",
    }));
  };

  const handleSend = async () => {
    if (validate()) {
      setIsLoading("processing");
      try {
        console.log(
          selectedToken,
          targetAddress,
          amount,
          Number(amount) * 10 ** selectedToken.decimals
        );

        // Step 2: Send Stasis tokens using Thirdweb
        const { transactionHash } = await tokenPayAbstractionSimpleTransfer(
          client,
          account,
          polygon,
          Number(amount) * 10 ** selectedToken.decimals,
          selectedToken,
          targetAddress
        );

        let transferData = {
          amount: Number(amount),
          currency: selectedToken.contractAddress,
          currencyName: selectedToken.id,
          transactionHash: transactionHash,
          sendingWallet: account?.address,
          currencyDecimals: selectedToken.decimals,
          receivingWallet: targetAddress,
        }

        if(user.type === "vendor"){
          transferData.vendor = user.id;
        }else{
          transferData.consumer = user.id;
        }

        await axios.post("/api/cryptoTransfer", transferData);

        setTargetAddress("");
        setAmount(0);

        setIsLoading("success");
        setNewTxHash(transactionHash);
        // set on normal after 20 seconds
        setTimeout(() => {
          setIsLoading("normal");
        }, 20000);
      } catch (error) {
        console.log("error handle send", error);
        setErrorMessage({
          message: "Bitte versuchen Sie es später nochmal",
          error: error,
        });
        sendErrorReport("SendCrypto - Sending failed", error);
        setIsLoading("error");
        setTimeout(() => {
          setIsLoading("normal");
        }, 20000);
      }

      // Add your send logic here
    }
  };

  return (
    <>
      <Transition appear show={isOpen ? true : false} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50"
          onClose={() => {
            setIsOpen(false);
          }}
        >
          <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </TransitionChild>

            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="max-w-md w-full transform  rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <DialogTitle
                  as="h3"
                  className="text-2xl my-2d font-bold leading-6 text-gray-900"
                >
                  Krypto-Währungen versenden
                </DialogTitle>

                {isLoading === "processing" ? (
                  <div className="flex items-center justify-center h-[30rem]">
                    <Loader></Loader>
                  </div>
                ) : isLoading === "success" ? (
                  <div className="flex items-center flex-col justify-center gap-4 h-[30rem]">
                    <IoShieldCheckmarkSharp className="text-gray-700 w-16 h-16 m-2" />
                    <div className="w-full border-b pb-2 text-4xl text-center text-gray-700 font-bold">
                      Zahlung erfolgreich abgeschlossen!
                    </div>
                    <div className="text-center">
                      Ihr Geldtransfer wurde erfolgreich abgeschlossen.
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <div className="max-w-xl w-full mx-auto flex flex-col mt-4">
                      <div>
                        1. Welche Krypto- Krypto-Währung wollen Sie verschicken?
                      </div>
                      <TokenSelectorSimple
                        onSelect={async (selectedToken) => {
                          fetchTokenBalance(selectedToken);
                        }}
                        tokens={originTokens}
                        selectedToken={selectedToken}
                      />
                      {errors.selectedToken && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.selectedToken}
                        </p>
                      )}
                      <div className="mt-4 mb-2">
                        2. Welchen Betrag wollen Sie verschicken?
                      </div>
                      <div className="flex flex-row gap-2">
                        <input
                          type="number"
                          className="p-2 w-full border rounded-md flex-1"
                          value={amount}
                          onChange={(e) => {
                            if (!selectedToken) {
                              setErrors((prevErrors) => ({
                                ...prevErrors,
                                amount:
                                  "Bitte wählen Sie zuerst eine Krypto- Krypto-Währung aus.",
                              }));
                            } else {
                              setAmount(e.target.value);
                              setErrors((prevErrors) => ({
                                ...prevErrors,
                                amount: "",
                              }));
                            }
                          }}
                          max={selectedTokenBalance}
                          disabled={!selectedToken}
                        />
                        <button
                          type="button"
                          className={`inline-flex items-center justify-center rounded-md border border-transparent ${
                            selectedToken
                              ? "bg-blue-100 text-blue-900"
                              : "bg-gray-200 text-gray-500"
                          } px-4 py-2 text-sm font-medium hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2`}
                          onClick={handleMaxClick}
                          disabled={!selectedToken}
                        >
                          Max.{" "}
                          {formatCrypto(
                            selectedTokenBalance || 0,
                            selectedToken?.decimals || 18,
                            6
                          )}{" "}
                          {selectedToken?.name}
                        </button>
                      </div>
                      {errors.amount && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.amount}
                        </p>
                      )}
                      <div className="mt-4 mb-2">
                        3. An wen wollen Sie Krypto-Währungen versenden?
                      </div>
                      <input
                        type="text"
                        placeholder="0x42350897349087..."
                        className="p-2 w-full border rounded-md flex-1"
                        value={targetAddress}
                        onChange={(e) => {
                          setTargetAddress(e.target.value);
                          setErrors((prevErrors) => ({
                            ...prevErrors,
                            targetAddress: "",
                          }));
                        }}
                      />
                      {errors.targetAddress && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.targetAddress}
                        </p>
                      )}

                      <div className="h-4"></div>

                      <LoadingButton
                        isLoading={isLoading}
                        onClick={handleSend}
                        openError={() => {
                          setIsErrorPopupOpen();
                        }}
                        disabled={
                          Object.keys(errors).length > 0 || !selectedToken
                        }
                      >
                        Jetzt senden
                      </LoadingButton>
                    </div>
                  </div>
                )}
              </DialogPanel>
            </TransitionChild>
          </div>
        </Dialog>
      </Transition>
      <div>
        <div></div>
        <SimpleList
          collection={"cryptoTransfer"}
          columns={columns}
          loader={newTxHash}
        >
          <button
            onClick={() => {
              setIsOpen(true);
            }}
            className="btn-primary"
          >
            Neue Transaktion
          </button>
        </SimpleList>
      </div>
    </>
  );
}
