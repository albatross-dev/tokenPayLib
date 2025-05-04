import React, { useEffect, useState } from "react";
import axios from "axios";
import { Account } from "thirdweb/wallets";
import { Consumer, Vendor } from "../../../../../types/payload-types";
import {
  Loading,
  Error,
  Overview,
  Created,
  Unverified,
  ComponentState,
  BitcoinVNTransaction,
} from "./Slides";
import { getQuote } from "../../../../../utilities/partner/bitcoinvn";
import { sendErrorReport } from "../../../../../../context/UserContext";
import { BitcoinVNQuote } from "../../universal/bitcoinVNUtils";

interface BitcoinVNProps {
  amount: number;
  startCurrency: string;
  endCurrency: string;
  account: Account;
  user: Vendor | Consumer;
}

export default function BitcoinVN({
  amount,
  startCurrency,
  endCurrency,
  account,
  user,
}: BitcoinVNProps) {
  const [state, setState] = useState<ComponentState>("loading");
  const [quote, setQuote] = useState<BitcoinVNQuote | null>(null);
  const [transaction, setTransaction] = useState<BitcoinVNTransaction | null>(
    null
  );

  useEffect(() => {
    setState("loading");
    getQuote({
      depositMethod: startCurrency,
      settleMethod: endCurrency,
      depositAmount: amount,
    })
      .then((bitcoinVNQuote) => {
        if (bitcoinVNQuote) {
          setQuote(bitcoinVNQuote as BitcoinVNQuote);
          setState("overview");
        } else {
          setState("error");
        }
      })
      .catch((reason) => {
        sendErrorReport(
          "BitcoinVNQuote- Deposit - Fetching quote failed",
          reason
        );
        console.log("Failed to get bictoinVN quote:", reason);
        setState("error");
      });
  }, []);

  const handleStartTransaction = async () => {
    setState("loading");

    try {
      const result = await axios.post<BitcoinVNTransaction>(
        "/api/fiatTransaction/bitcoinVN/v2/createDeposit",
        {
          quote: quote?.id,
          address: account.address,
        }
      );

      setTransaction(result.data);
      setState("created");
    } catch (error) {
      sendErrorReport(
        "BitcoinVNQuote - Deposit - Creating transaction failed",
        error
      );
      console.error(
        "(BitcoinVN::deposit::handleStartTransaktion) An Error Occured: ",
        error
      );
      setState("error");
    }
  };

  if (user.bitcoinVNStatus !== "verified") {
    return <Unverified />;
  }

  switch (state) {
    case "loading":
      return <Loading />;
    case "error":
      return <Error />;
    case "overview":
      return quote ? (
        <Overview quote={quote} onStartTransaction={handleStartTransaction} />
      ) : null;
    case "created":
      return transaction ? <Created transaction={transaction} /> : null;
    default:
      return <Loading />;
  }
}
