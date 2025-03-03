"use client";

import React, { useState, useEffect } from "react";
import { useActiveAccount } from "thirdweb/react";
import QRCode from "react-qr-code";
import { FiCopy, FiCheck } from "react-icons/fi";
import { useTranslation } from "next-i18next";

const WalletQRCode = () => {
  const account = useActiveAccount();
  const [isClient, setIsClient] = useState(false);
  const [copied, setCopied] = useState(false);
  const {t} = useTranslation("common");

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleCopy = () => {
    if (account?.address) {
      navigator.clipboard.writeText(account.address).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 5000);
      });
    }
  };

  return (
    <div className="flex-1 flex flex-col justify-center h-full items-center w-full">
      <h2 className="text-2xl font-semibold mb-6">{t("WalletQRCode.your_wallet")}</h2>
      {isClient && account?.address ? (
        <div className="text-center">
          <div
            style={{
              height: "auto",
              margin: "0 auto",
              maxWidth: 400,
              width: "100%",
            }}
          >
            <QRCode
              size={256}
              style={{ height: "auto", maxWidth: "100%", width: "100%" }}
              value={account.address}
              viewBox={`0 0 256 256`}
            />
          </div>
          <p className="flex items-center justify-center bg-uhuBlue rounded-full text-sm mt-4 text-white py-1 font-mono pl-3">
            Public Key: {account.address}
            <button
              onClick={handleCopy}
              className="ml-2 rounded-full pr-2 pl-2"
            >
              {copied ? <FiCheck size={16} /> : <FiCopy size={16} />}
            </button>
          </p>
        </div>
      ) : (
        <p className="text-center">{t("WalletQRCode.no_wallet_connected")}</p>
      )}
    </div>
  );
};

export default WalletQRCode;
