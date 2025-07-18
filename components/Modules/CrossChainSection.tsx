import React, { useEffect, useState } from "react";
import { useTranslation } from "next-i18next";
import ChainSelector, { chainsBridge } from "../Forms/ChainSelector";
import Image from "next/image";
import ConvertStateButton from "../UI/ConvertStateButton";
import tokenyByChain from "../../utilities/crypto/tokenByChain";
import { useActiveAccount, useActiveWalletChain } from "thirdweb/react";
import { ERC20ABI, formatCrypto, LogoByShortName, TokensByChainId } from "../../utilities/crypto/currencies";
import { readContract, getContract } from "thirdweb";
import client from "@/utilities/thirdweb-client";
import getChainById from "../../utilities/crypto/getChainById";
import MiniLoader from "../UI/MiniLoader";
import BridgeModalUniversal from "../Modals/BridgeModalUniversal";
import UniversalModal, { MODAL_TYPE_SUCCESS } from "../Modals/UniversalModal";
import { ChainDetails } from "../../types/chainDetails.types";

interface LoadingState {
  [key: string]: "normal" | "processing" | "error";
}

const CrossChainSection: React.FC = () => {
  const { t } = useTranslation("common");

  // TW hooks
  const account = useActiveAccount();
  const activeChain = useActiveWalletChain();

  // UI States
  const [loading, setLoading] = useState<LoadingState>({}); // loading state for each token

  // bridge modal
  const [showBridgeModal, setShowBridgeModal] = useState<boolean>(false);
  const [balanceOfStableLoading, setBalanceOfStableLoading] = useState<boolean>(false);
  const [balanceOfStableData, setBalanceOfStableData] = useState<bigint>(BigInt(0));
  const [selectedChain, setSelectedChain] = useState<ChainDetails | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);

  useEffect(() => {
    console.log("loading", loading);
  }, [loading]);

  useEffect(() => {
    if (activeChain) {
      fetchStableBalance();
    }
  }, [activeChain]);

  /**
   * Fetches the stable balance of the active chain
   */
  async function fetchStableBalance(): Promise<void> {
    if (!activeChain?.id || !account?.address) return;

    setBalanceOfStableLoading(true);
    const stableContract = getContract({
      client: client,
      chain: getChainById(activeChain.id),
      address: TokensByChainId[activeChain.id]["USDC"].contractAddress,
      abi: ERC20ABI as Array<any>,
    });

    const resultStableBalance = await readContract({
      contract: stableContract,
      method: "function balanceOf(address) view returns (uint256)",
      params: [account.address],
    });

    setBalanceOfStableData(resultStableBalance);
    setBalanceOfStableLoading(false);
  }

  return (
    <div className="cross-chain-section">
      <UniversalModal
        isOpen={showSuccessModal}
        type={MODAL_TYPE_SUCCESS}
        title={t("exchange_success_title")}
        message={t("exchange_success_message")}
        closeModal={() => setShowSuccessModal(false)}
      />
      <BridgeModalUniversal
        show={showBridgeModal}
        closeModal={() => setShowBridgeModal(false)}
        token={activeChain ? TokensByChainId[activeChain?.id]["USDC"] : null}
        chain={activeChain}
        spokePool={tokenyByChain[activeChain?.id]?.spokePool}
        maxAmount={Number(balanceOfStableData)}
        destinationChainId={selectedChain?.chainId}
        onStart={() => {
          setLoading((prevState) => ({
            ...prevState,
            [`${selectedChain?.chainId}`]: "processing",
          }));
        }}
        onFinish={(success) => {
          if (success) {
            setLoading((prevState) => ({
              ...prevState,
              [selectedChain?.chainId]: "normal",
            }));
            setTimeout(() => {
              fetchStableBalance();
            }, 1000);
            setShowSuccessModal(true);
          } else {
            setLoading((prevState) => ({
              ...prevState,
              [selectedChain?.chainId]: "error",
            }));
          }
        }}
      />
      <div className="bg-gray-100 p-4 my-4 rounded-lg">
        <div className="mb-2 mt-4 font-bold">{t("info_text_chain_h")}</div>
        <div className="mb-2">{t("info_text_chain_p1")}</div>
        <div className="mb-2">{t("info_text_chain_p2")}</div>
      </div>
      <div>{t("active_chain")}</div>
      <ChainSelector disabled={!account} type="chain" chainList={chainsBridge} />

      <div className="flex mt-4 flex-row items-center justify-between bg-gray-100 rounded-lg p-4">
        <div className="text-xl font-bold">{t("info_usdc_balance")}</div>
        <div className="flex flex-row gap-2 items-center">
          <div className="font-bold text-xl">
            <span className="flex flex-row items-center gap-2">
              <span className={`${(balanceOfStableLoading || !account) && "loadingPanel"}`}>
                {formatCrypto(Number(balanceOfStableData), 6, 6)}
              </span>
            </span>
          </div>

          <Image src={LogoByShortName["USDC"]} className="h-8 w-8" alt="USDC Logo" />
        </div>
      </div>
      <div className="mt-4">{t("target_chain")}</div>
      <div className="flex flex-col gap-4 mt-4">
        {chainsBridge
          .filter((chain) => chain.chainId !== activeChain?.id)
          .map((chain) => {
            return (
              <div key={chain.chainId + "chains"} className="flex flex-col">
                <div className="pt-2  pb-2 rounded-md flex flex-row items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Image src={chain.logo} className="h-5 w-5" alt={`${chain.name} Logo`} />
                    <div className="text-lg font-semibold">{chain.name}</div>
                  </div>
                  <ConvertStateButton
                    onClick={() => {
                      setSelectedChain(chain);
                      setShowBridgeModal(true);
                    }}
                    disabled={!account}
                    state={loading[`${chain.chainId}`]}
                  >
                    <Image src={LogoByShortName["USDC"]} className="h-6 w-6" alt="USDC Logo" />
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
