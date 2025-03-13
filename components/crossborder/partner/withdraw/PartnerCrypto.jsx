import React, { useEffect, useState, Fragment, useContext } from "react";
import {
  createThirdwebClient,
  getContract,
  readContract,
  prepareContractCall,
  sendAndConfirmTransaction,
} from "thirdweb";
import { polygon } from "thirdweb/chains";
import { AuthContext, sendErrorReport } from "@/context/UserContext";
import { IoClose } from "react-icons/io5";

import axios from "axios";
import { IoShieldCheckmarkSharp } from "react-icons/io5";
import TokenSelector from "@/tokenPayLib/components/Forms/TokenSelector";
import { useActiveAccount } from "thirdweb/react";
import { TokensByChainId } from "@/tokenPayLib/utilities/crypto/currencies";
import { parseUnits } from "ethers/lib/utils";
import Image from "next/image";
import { PATHS } from "@/tokenPayLib/utilities/crypto/getPath";
import QuoteV2Abi from "@/tokenPayLib/assets/quoteV2Abi.json";

import convertAnyToAny, {
  convertAnyToAnyDirect,
  uniswapAddresses,
} from "@/tokenPayLib/utilities/crypto/convertAnyToAny";
import numberWithZeros from "@/tokenPayLib/utilities/math/numberWithZeros";
import { encodePacked } from "thirdweb/utils";
import MiniLoader from "@/tokenPayLib/components/UI/MiniLoader";
import { IoIosInformationCircle } from "react-icons/io";
import { tokenPayAbstractionSimpleTransfer } from "@/tokenPayLib/assets/TokenPayAbstraction";
import { useTranslation } from "next-i18next";
import { STABLE_FIAT_MAP } from "@/tokenPayLib/utilities/stableCoinsMaps";

const client = createThirdwebClient({
  clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID,
});

export default function CryptoPartner({ amount, country, method }) {
  const [defaultToken, setDefaultToken] = useState(
    TokensByChainId[polygon.id][method.acceptedCrypto]
  );
  const [differentToken, setDifferentToken] = useState(false);
  const [selectedToken, setSelectedToken] = useState(null);
  const [amountToSend, setAmountToSend] = useState(amount);
  const [targetTokens, setTargetTokens] = useState(null);
  const [targetAddress, setTargetAddress] = useState("");
  const [errors, setErrors] = useState({});
  const [selectedTokenBalance, setSelectedTokenBalance] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useContext(AuthContext);
  const account = useActiveAccount();
  const [newTxHash, setNewTxHash] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [loadingQuote, setLoadingQuote] = useState(false);
  const [quote, setQuote] = useState(null);
  const [state, setState] = useState("transaction");

  const { t: tCrossborder } = useTranslation("crossborder");

  useEffect(() => {
    processTargetTokens(defaultToken);
  }, []);

  useEffect(() => {
    async function fetchQuote() {
      setLoadingQuote(true);
      let contract = getContract({
        client: client,
        chain: polygon,
        address: uniswapAddresses[polygon.id].quote,
        abi: QuoteV2Abi,
      });

      const path =
        PATHS[polygon.id][defaultToken.id.toUpperCase()][
          (selectedToken.id || selectedToken.symbol).toUpperCase()
        ];

      console.log(
        "fetch Quote",
        contract,
        path,
        defaultToken,
        selectedToken,
        amount,
        BigInt(amount * numberWithZeros(selectedToken?.decimals || 1))
      );

      const encodedPath = encodePacked(path[0], path[1]);

      const quote = await readContract({
        contract: contract,
        method: "quoteExactInput",
        params: [
          encodedPath,
          BigInt(amount * numberWithZeros(selectedToken?.decimals || 1)),
        ],
      });
      setQuote(quote);
      console.log("quote", quote);
      setLoadingQuote(false);
    }

    if (selectedToken && differentToken) {
      fetchQuote();
    }
  }, [selectedToken, differentToken]);

  const fetchTokenBalance = async (selectedToken) => {
    try {
      const contract = getContract({
        client,
        chain: polygon,
        address: selectedToken.contractAddress,
        abi: selectedToken.abi,
      });

      const balance = await readContract({
        contract,
        method: "function balanceOf(address) view returns (uint256)",
        params: [account.address],
      });

      setSelectedTokenBalance(balance);
    } catch (error) {
      sendErrorReport(
        `PartnerCrypto - withdraw - Error fetching token balance for ${selectedToken.id}`,
        error
      );
      console.error("Error fetching token balance:", error);
    }
  };

  const validateForm = () => {
    const validationErrors = {};

    if (differentToken) {
      if (!selectedToken) {
        validationErrors.selectedToken = tCrossborder(
          "withdraw.partnerCrypto.errorSelectCrypto"
        );
      }
    }

    if (!amountToSend || amountToSend <= 0) {
      validationErrors.amountToSend = tCrossborder(
        "withdraw.partnerCrypto.errorValidAmount"
      );
    }

    if (!targetAddress || !/^0x[a-fA-F0-9]{40}$/.test(targetAddress)) {
      validationErrors.targetAddress = tCrossborder(
        "withdraw.partnerCrypto.errorValidEmail"
      );
    }

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  function processTargetTokens(token) {
    if (!token) return;
    let targetTokenArr = Object.keys(
      PATHS[polygon.id][token.id.toUpperCase()]
    ).map((tokenId) => {
      return [tokenId, TokensByChainId[polygon.id][tokenId]];
    });

    targetTokenArr = targetTokenArr.filter((item) => {
      return item[1] !== undefined;
    });

    let targetTokens = Object.fromEntries(targetTokenArr);
    setTargetTokens(targetTokens);
    console.log("targetTokens", targetTokenArr);
    setSelectedToken(targetTokenArr[0][1]);

    return targetTokens;
  }

  const handleTransfer = async (token, amount, address) => {
    console.log("handle transfer", amount, token, address);

    const { transactionHash } = await tokenPayAbstractionSimpleTransfer(
      client,
      account,
      polygon,
      amount,
      token,
      address
    );

    return transactionHash;
  };

  const handleSend = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    if (differentToken) {
      try {
        await convertAnyToAnyDirect(
          defaultToken,
          BigInt(amount * numberWithZeros(defaultToken?.decimals || 1)),
          account,
          () => {},
          (error) => {
            throw error;
          },
          polygon,
          selectedToken
        );

        const feePercentage = 4n; // Represent 0.004 as 4/1000
        const divisor = 1000n;
        const sendAmount = quote[0] - (quote[0] * feePercentage) / divisor;

        let transactionHash = await handleTransfer(
          selectedToken,
          sendAmount.toString(),
          targetAddress
        );

        await axios.post("/api/fiatTransaction", {
          vendor: user.id,
          partner: "crypto",
          amount: Number(amount),
          currency: defaultToken.contractAddress,
          currencyName: defaultToken.id,
          transactionHash: transactionHash,
          UUID: transactionHash,
          sendingWallet: account?.address,
          currencyDecimals: defaultToken.decimals,
          receivingWallet: targetAddress,
          toAccountBankName: "",
          toAccountIdentifier: "",
          targetCountry: country.countryCode,
          toNetwork: "polygon",
          fromNetwork: "polygon",
          type: "Withdraw",
          finalCurrency: selectedToken.id,
          finalAmount: Number(sendAmount),
        });
      } catch (error) {
        const errors = {};
        sendErrorReport(
          `PartnerCrypto - withdraw - Error transfering token`,
          error
        );
        errors.conversionError = tCrossborder(
          "withdraw.partnerCrypto.errorConvertCrypto"
        );
        setErrors(errors);
        console.error("Error transfering token", error);
        setIsLoading(false);
        return;
      }
    } else {
      let transactionHash = await handleTransfer(
        defaultToken,
        parseUnits(amount.toString(), defaultToken.decimals),
        targetAddress
      );

      await axios.post("/api/fiatTransaction", {
        vendor: user.id,
        partner: "crypto",
        amount: Number(amount),
        currency: defaultToken.contractAddress,
        currencyName: defaultToken.id,
        transactionHash: transactionHash,
        UUID: transactionHash,
        sendingWallet: account?.address,
        currencyDecimals: defaultToken.decimals,
        receivingWallet: targetAddress,
        toAccountBankName: "",
        toAccountIdentifier: "",
        toNetwork: "polygon",
        fromNetwork: "polygon",
        type: "Withdraw",
        finalCurrency: defaultToken.id,
        finalAmount: amount,
      });
    }

    setState("success");

    setIsLoading(false);
    setIsOpen(true);
  };

  return (
    <div className="max-w-4xl w-full mx-auto p-6">
      {state === "transaction" && (
        <div>
          <h2 className="text-2xl font-bold mb-4">
            {STABLE_FIAT_MAP[defaultToken.name]?.id}{" "}
            {tCrossborder("withdraw.partnerCrypto.sendHeader")}
          </h2>
          <div className="flex flex-row gap-2 items-center bg-gray-100 rounded p-4">
            <div className="relative w-8 h-8 bg-uhuBlue flex items-center text-white font-bold justify-center rounded-full">
              {STABLE_FIAT_MAP[defaultToken.name]?.symbol}
            </div>
            <div>{STABLE_FIAT_MAP[defaultToken.name]?.id}</div>
            <div className="flex-1"></div>
            <div className="bg-uhuBlue text-[11px] text-white rounded px-1 text">
              via <span className="font-bold">{defaultToken.name}</span>
            </div>
            <div className="font-bold">
              {parseFloat(amount).toLocaleString()}
            </div>
            <div>{STABLE_FIAT_MAP[defaultToken.name]?.symbol}</div>
          </div>
          <div className="mt-4 text-sm text-gray-700">
            {tCrossborder("withdraw.partnerCrypto.walletInfo")}
          </div>
          <div className="mt-4 text-sm text-gray-700 flex gap-2 items-center bg-gray-100 rounded p-2">
            <IoIosInformationCircle className="text-2xl text-blue-500 inline" />
            {tCrossborder("withdraw.partnerCrypto.receiverInfo")}
          </div>
          <div className="">
            <div className="mt-4 mb-4">
              <label className="block font-medium text-gray-700 mb-1">
                {tCrossborder("withdraw.partnerCrypto.walletAddress")}
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-lg p-2"
                value={targetAddress}
                onChange={(e) => setTargetAddress(e.target.value)}
              />
              {errors.targetAddress && (
                <p className="text-red-500 text-sm">{errors.targetAddress}</p>
              )}
            </div>

            {errors.conversionError && (
              <p className="text-red-500 text-sm">{errors.conversionError}</p>
            )}
            <button
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
              onClick={handleSend}
              disabled={isLoading || !selectedToken || loadingQuote}
            >
              {isLoading
                ? tCrossborder("withdraw.partnerCrypto.send")
                : tCrossborder("withdraw.partnerCrypto.sendNow")}
            </button>
          </div>
        </div>
      )}

      {state === "success" && (
        <div className="max-w-4xl mx-auto p-6 w-full">
          <h1 className="text-2xl font-bold mb-6 text-green-600 text-center">
            {tCrossborder("withdraw.partnerCrypto.transactionSuccess")}
          </h1>
          <p className="text-center">
            {tCrossborder("withdraw.partnerCrypto.transactionSuccessInfo")}
          </p>
        </div>
      )}
    </div>
  );
}
