import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ChainSelector, { chainsBridge } from "../Forms/ChainSelector";
import Image from "next/image";
import ConvertStateButton from "../UI/ConvertStateButton";
import tokenyByChain from "@/tokenPayLib/utilities/crypto/tokenByChain";
import { useActiveAccount, useActiveWalletChain } from "thirdweb/react";
import currencies, {
  ERC20ABI,
  formatCrypto,
  LogoByShortName,
  TokensByChainId,
} from "@/tokenPayLib/utilities/crypto/currencies";
import { readContract, getContract } from "thirdweb";
import { client } from "@/pages/_app";
import getChainById from "@/tokenPayLib/utilities/crypto/getChainById";
import MiniLoader from "../UI/MiniLoader";
import BridgeModalUniversal from "../Modals/BridgeModalUniversal";

const CrossChainSection = () => {
  const { t } = useTranslation("common");

  // TW hooks
  const account = useActiveAccount();
  const activeChain = useActiveWalletChain();

  // UI States
  const [loading, setLoading] = useState({}); // loading state for each token

  // bridge modal
  const [showBridgeModal, setShowBridgeModal] = useState(false);
  const [bridgeToken, setBridgeToken] = useState(null);
  const [balanceOfStableLoading, setBalanceOfStableLoading] = useState(false);
  const [balanceOfStableData, setBalanceOfStableData] = useState(0);
  const [selectedChain, setSelectedChain] = useState(null);

  useEffect(()=>{
    console.log("loading",loading);
  },[loading]);

  useEffect(() => {
    fetchStableBalance();
  }, [activeChain]);

  async function fetchStableBalance() {
    setBalanceOfStableLoading(true);
    const stableContract = getContract({
      client: client,
      chain: getChainById(activeChain.id),
      address: TokensByChainId[activeChain?.id]["USDC"].contractAddress,
      abi: ERC20ABI,
    });

    const resultStableBalance = await readContract({
      contract: stableContract,
      method: "function balanceOf(address) view returns (uint256)",
      params: [account?.address],
    });

    console.log("resultStableBalance", resultStableBalance);

    setBalanceOfStableData(resultStableBalance);
    setBalanceOfStableLoading(false);
  }

  return (
    <div className="cross-chain-section">
      <BridgeModalUniversal
        show={showBridgeModal}
        closeModal={() => setShowBridgeModal(false)}
        token={TokensByChainId[activeChain?.id]["USDC"]}
        chain={activeChain}
        spokePool={tokenyByChain[activeChain?.id]?.spokePool}
        maxAmount={balanceOfStableData}
        destinationChainId={selectedChain?.chainId}
        onStart={() => {
          console.log("onStart", selectedChain?.chainId);
          setLoading((prevState) => ({
            ...prevState,
            [`${selectedChain?.chainId}`]: "processing",
          }));
        }}
        onFinish={() => {
          setLoading((prevState) => ({
            ...prevState,
            [selectedChain?.chainId]: "normal",
          }));
          setTimeout(() => {
            fetchStableBalance();
          }, 1000);
        }}
      />
      <div className="bg-gray-100 p-4 my-4 rounded-lg">
        <div className="mb-2 mt-4 font-bold">{t("info_text_chain_h")}</div>
        <div className="mb-2">{t("info_text_chain_p1")}</div>
        <div className="mb-2">{t("info_text_chain_p2")}</div>
      </div>
      <div>{t("active_chain")}</div>
      <ChainSelector chainList={chainsBridge} />

      <div className="flex mt-4 flex-row items-center justify-between bg-gray-100 rounded-lg p-4">
        <div className="text-xl font-bold">Ihr USDC Guthaben</div>
        <div className="flex flex-row gap-2">
        <div className="font-bold text-xl">
          {balanceOfStableLoading ? (
            <MiniLoader></MiniLoader>
          ) : (
            formatCrypto(balanceOfStableData,6,6)
          )}
        </div>
        <Image
          src={LogoByShortName["USDC"]}
          className="h-8 w-8"
          alt="USDC Logo"
        />
        </div>
      </div>
      <div className="mt-4">{t("target_chain")}</div>
      <div className="flex flex-col gap-4 mt-4">
        {chainsBridge
          .filter((chain) => chain.chainId !== activeChain.id)
          .map((chain) => {
            return (
              <div key={chain.chainId + "chains"} className="flex flex-col">
                <div className="pt-2  pb-2 rounded-md flex flex-row items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Image
                      src={chain.logo}
                      className="h-5 w-5"
                      alt={`${chain.name} Logo`}
                    />
                    <div className="text-lg font-semibold">{chain.name}</div>
                  </div>
                  <ConvertStateButton
                    onClick={() => {
                      setSelectedChain(chain);
                      setShowBridgeModal(true);
                    }}
                    state={loading[`${chain.chainId}`]}
                  >
                    <Image
                      src={LogoByShortName["USDC"]}
                      className="h-6 w-6"
                      alt="USDC Logo"
                    />
                  </ConvertStateButton>
                </div>
              </div>
            );
          })}
        <div></div>
      </div>
    </div>
  );
};

export default CrossChainSection;
