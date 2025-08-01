import React, { Fragment } from "react";
import { Dialog, DialogPanel, DialogTitle, TransitionChild, Transition } from "@headlessui/react";
import { IoShieldCheckmarkSharp } from "react-icons/io5";
import Loader from "../UI/Loader";
import TokenSelector from "../Forms/TokenSelector";
import { formatCrypto } from "../../utilities/crypto/currencies";
import LoadingButton, { LoadingButtonStates } from "../UI/LoadingButton";
import { SimpleToken } from "@/tokenPayLib/types/token.types";
import { TFunction } from "i18next";
import { Errors } from "@/tokenPayLib/hooks/useSendCryptoForm";

interface SendCryptoDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  isLoading: LoadingButtonStates;
  setIsLoading: (isLoading: LoadingButtonStates) => void;
  selectedToken: SimpleToken | null;
  originTokens: Record<string, SimpleToken>;
  amount: string;
  setAmount: (amount: string) => void;
  targetAddress: string;
  setTargetAddress: (targetAddress: string) => void;
  errors: Errors;
  handleSend: () => void;
  handleMaxClick: () => void;
  selectedTokenBalance: number | null;
  maxAmount: number;
  fetchTokenBalance: (token: SimpleToken) => void;
  tAccount: TFunction;
  setFieldError: (field: string, error: string) => void;
  clearFieldError: (field: string) => void;
}

export default function SendCryptoDialog({
  isOpen,
  setIsOpen,
  isLoading,
  setIsLoading,
  selectedToken,
  originTokens,
  amount,
  setAmount,
  targetAddress,
  setTargetAddress,
  errors,
  handleSend,
  handleMaxClick,
  selectedTokenBalance,
  maxAmount,
  fetchTokenBalance,
  tAccount,
  setFieldError,
  clearFieldError,
}: SendCryptoDialogProps) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={() => setIsOpen(false)}>
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
            <DialogPanel className="max-w-md w-full transform rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
              <DialogTitle as="h3" className="text-2xl my-2d font-bold leading-6 text-gray-900">
                {tAccount("sendCrypto.dialog.title")}
              </DialogTitle>

              {isLoading === "processing" ? (
                <div className="flex items-center justify-center h-[30rem]">
                  <Loader />
                </div>
              ) : isLoading === "success" ? (
                <div className="flex items-center flex-col justify-center gap-4 h-[30rem]">
                  <IoShieldCheckmarkSharp className="text-gray-700 w-16 h-16 m-2" />
                  <div className="w-full border-b pb-2 text-4xl text-center text-gray-700 font-bold">
                    {tAccount("sendCrypto.dialog.successTitle")}
                  </div>
                  <div className="text-center">{tAccount("sendCrypto.dialog.successText")}</div>
                  <div className="flex flex-row gap-2">
                    <button
                      type="button"
                      className="bg-uhuBlue text-white px-4 py-2 rounded-md"
                      onClick={() => setIsLoading("normal")}
                    >
                      {tAccount("sendCrypto.dialog.newTransaction")}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <div className="max-w-xl w-full mx-auto flex flex-col mt-4">
                    <div>{tAccount("sendCrypto.dialog.step1")}</div>
                    <TokenSelector
                      type="token"
                      onSelect={fetchTokenBalance}
                      tokens={originTokens}
                      selectedToken={selectedToken}
                      selectText={tAccount("sendCrypto.dialog.select")}
                    />
                    {errors.selectedToken && <p className="text-red-500 text-sm mt-1">{errors.selectedToken}</p>}
                    <div className="mt-4 mb-2">{tAccount("sendCrypto.dialog.step2")}</div>
                    <div className="flex flex-row gap-2">
                      <input
                        type="number"
                        className="p-2 w-full border rounded-md flex-1"
                        value={amount}
                        placeholder="0.00"
                        onChange={(e) => {
                          if (!selectedToken) {
                            setFieldError("amount", tAccount("sendCrypto.errors.selectTokenFirst"));
                          } else {
                            // check if the number is a valid number
                            if (isNaN(Number(e.target.value))) {
                              setFieldError("amount", tAccount("sendCrypto.errors.enterValidAmount"));
                            } else {
                              clearFieldError("amount");

                              // Convert comma to dot for decimal separator
                              const normalizedValue = e.target.value.replace(",", ".");
                              const decimalPart = normalizedValue.split(".")[1];
                              console.log("decimal check", decimalPart?.length, selectedToken?.decimals);
                              // check if the number has more decimals than the token
                              if (decimalPart?.length > selectedToken?.decimals) {
                                setFieldError("amount", tAccount("sendCrypto.errors.maxDecimals1") + (selectedToken?.decimals || 0) + tAccount("sendCrypto.errors.maxDecimals2"));
                              } else {
                                clearFieldError("amount");

                                // check if the number is greater than the max amount
                                if (Number(e.target.value) > maxAmount) {
                                  setFieldError("amount", tAccount("sendCrypto.errors.insufficientBalance"));
                                } else {
                                  clearFieldError("amount");
                                }
                              }
                            }

                            setAmount(e.target.value);
                          }
                        }}
                        max={maxAmount}
                        disabled={!selectedToken}
                      />
                      <button
                        type="button"
                        className={`inline-flex items-center justify-center rounded-md border border-transparent ${
                          selectedToken ? "bg-blue-100 text-blue-900" : "bg-gray-200 text-gray-500"
                        } px-4 py-2 text-sm font-medium hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2`}
                        onClick={handleMaxClick}
                        disabled={!selectedToken}
                      >
                        {tAccount("sendCrypto.dialog.max")}
                        {formatCrypto(selectedTokenBalance || 0, selectedToken?.decimals || 18, 6)}{" "}
                        {selectedToken?.name}
                      </button>
                    </div>
                    {errors.amount && <p className="text-red-500 text-sm mt-1">{errors.amount}</p>}
                    <div className="mt-4 mb-2">{tAccount("sendCrypto.dialog.step3")}</div>
                    <input
                      type="text"
                      placeholder="0x42350897349087..."
                      className="p-2 w-full border rounded-md flex-1"
                      value={targetAddress}
                      onChange={(e) => {
                        setTargetAddress(e.target.value);
                        clearFieldError("targetAddress");
                      }}
                    />
                    {errors.targetAddress && <p className="text-red-500 text-sm mt-1">{errors.targetAddress}</p>}

                    <div className="h-4"></div>

                    <LoadingButton
                      isLoading={isLoading}
                      onClick={handleSend}
                      active={Boolean(
                        !isNaN(Number(amount)) &&
                          Object.keys(errors).length === 0 &&
                          selectedToken &&
                          Number(amount) > 0 &&
                          targetAddress.length > 0
                      )}
                    >
                      {tAccount("sendCrypto.dialog.sendButton")}
                    </LoadingButton>
                  </div>
                </div>
              )}
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  );
}
