import axios from "axios";
import React, { useEffect, useState } from "react";
import MiniLoader from "@/tokenPayLib/components/UI/MiniLoader";
import { sendErrorReport } from "@/context/UserContext";
import { sendError } from "next/dist/server/api-utils";

/**
 * Get the metadata for BitcoinVN transactions
 * @returns {Promise<{min: number, max: number}>}
 */
export async function getBitcoinVNMetaData() {
  try {
    const result = await axios.get(
      "/api/fiatTransaction/bitcoinVN/getMetaData"
    );
    return result.data;
  } catch (error) {
    sendErrorReport("BitcoinVNQuote - Fetching metadata failed", error);
    console.error("Fehler beim Abrufen der Metadaten:", error);
    throw error;
  }
}

/**
 * Get a quote for a BitcoinVN transaction
 * @param {number} amount - The amount to deposit
 * @returns {Promise<{depositAmount: number, depositMethod: string, depositFee: number, settleAmount: number, settleMethod: string}>}
 */
export async function getBitcoinVNQuote(amount) {
  try {
    const result = await axios.post("/api/fiatTransaction/bitcoinVN/quote", {
      depositAmount: amount,
      settleAmount: null,
    });
    return result.data;
  } catch (error) {
    sendErrorReport("BitcoinVNQuote - Fetching quote failed", error);
    console.error("Fehler beim Abrufen des Angebots:", error);
    throw error;
  }
}

export default function BitcoinVNQuote({
  method,
  amount,
  selectedMethod,
  handleSelect,
}) {
  const [minAmountDifference, setMinAmountDifference] = useState(0);
  const [maxAmountDifference, setMaxAmountDifference] = useState(0);
  const [isDisabled, setIsDisabled] = useState(true);
  const [state, setState] = useState("loading");
  const [metaData, setMetaData] = useState(null);
  const [quote, setQuote] = useState(null);
  const [prevAmount, setPrevAmount] = useState(amount); // Track previous amount to clear quote on change


  useEffect(() => {
    setState("loading");
    getBitcoinVNMetaData()
      .then((data) => {
        setMetaData(data);
        setState("metadata-loaded");
      })
      .catch((error) => {
        sendErrorReport("BitcoinVNQuote - Fetching metadata failed", error);
        console.error("Fehler beim Laden der Metadaten:", error);
        setState("error");
      });
  }, []);

  useEffect(() => {
    // Reset quote if the amount changes
    if (prevAmount !== amount) {
      setQuote(null);
      setPrevAmount(amount);
    }

    if (!metaData || amount <= 0) {
      setIsDisabled(true);
      return;
    }

    if (amount < metaData.min) {
      setMinAmountDifference(metaData.min - amount);
      setMaxAmountDifference(0);
      setIsDisabled(true);
      setState("metadata-loaded");
    } else if (amount > metaData.max) {
      setMinAmountDifference(0);
      setMaxAmountDifference(amount - metaData.max);
      setIsDisabled(true);
      setState("metadata-loaded");
    } else {
      setMinAmountDifference(0);
      setMaxAmountDifference(0);
      setIsDisabled(false);
      setState("loading-quote");

      getBitcoinVNQuote(amount)
        .then((res) => {
          setQuote(res);
          setState("loaded");
        })
        .catch((err) => {
          sendErrorReport("BitcoinVNQuote - Fetching quote failed", err);
          console.error("Fehler beim Abrufen des Angebots:", err);
          setState("error");
        });
    }
  }, [amount, metaData, prevAmount]);

  return (
    <div>
      <div
        className={`p-4 rounded-md flex flex-row gap-4 justify-between items-center ${
          selectedMethod?.name === method.name
            ? "bg-uhuBlue text-white"
            : "bg-uhuGray"
        }`}
        onClick={() => !isDisabled && handleSelect(method)}
      >
        {/* Method Name */}
        <h3 className="text-lg font-semibold">{method.name}</h3>

        {/* Loader or Error */}
        {state === "loading" && <MiniLoader />}
        {state === "loading-quote" && <MiniLoader />}
        {state === "error" && <p className="text-sm text-red-500">Fehler</p>}

        {/* Amount Validation */}
        {minAmountDifference > 0 && (
          <p className="text-sm text-red-500">
            Fügen Sie {minAmountDifference.toFixed(2)} hinzu, um den
            Mindestbetrag zu erreichen.
          </p>
        )}
        {maxAmountDifference > 0 && (
          <p className="text-sm text-red-500">
            Reduzieren Sie den Betrag um {maxAmountDifference.toFixed(2)}, um
            den Höchstbetrag nicht zu überschreiten.
          </p>
        )}

        {/* Quote Details */}
        {state === "loaded" && quote && (
          <div className="flex gap-4">
            <p>
              <strong>Auszahlungsbetrag:</strong> {quote.settleAmount}{" "}
              {quote.settleMethod.toUpperCase()}
            </p>
            <p>
              <strong>Gebühr:</strong> {quote.depositFee.toFixed(2)}{" "}
              {quote.depositMethod.toUpperCase()}
            </p>
          </div>
        )}
      </div>{" "}
      {/* Min and Max Values */}
      {metaData && (
        <div className="flex items-end justify-end gap-2">
          <p className="text-sm">
            <strong>Mindestbetrag:</strong> {metaData.min.toFixed(2)} USDC</p>
          <p className="text-sm">
            <strong>Höchstbetrag:</strong> {metaData.max.toFixed(2)} USDC
            {method.currency}
          </p>
        </div>
      )}
    </div>
  );
}
