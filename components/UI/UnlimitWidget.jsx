import React, { useEffect } from 'react';
import { GateFiSDK } from '@gatefi/js-sdk';
import { useTranslation } from "next-i18next";
import {
  useActiveAccount,
} from "thirdweb/react";

const UnlimitWidget = () => {

  const { t } = useTranslation("common");
  const account = useActiveAccount();

  useEffect(() => {
    // Initialize the GateFi SDK in embedded mode
    const instance = new GateFiSDK({
      merchantId: "7bd7c0da-4acc-40d0-b3c9-7d658affbddd", // Replace with your actual merchant ID
      displayMode: "embedded",
      nodeSelector: "#crypto-widget-container", // The ID of the container div
      walletAddress: account.address,
      styles: {
        type: "light",
        primaryBackground: "#ffffff"
      }
    });

    // Cleanup on component unmount (optional)
    return () => {
      instance?.destroy(); // This assumes the SDK provides a `destroy` method to clean up
    };
  }, []);

  return (
    <div id="crypto-widget-container" style={{
      width: "100%",
      height: "100%",
      minHeight: "700px",
      display: "flex",
      marginTop: "2rem",
      justifyContent: "center",
    }}>
    </div>
  );
};

export default UnlimitWidget;