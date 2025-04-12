import { Account } from "thirdweb/wallets";
import { Country, PaymentTypesArray } from "../../../../../types/payload-types";

export type DeskState =
  | "loading"
  | "ongoing"
  | "unverified"
  | "verified"
  | "in_progress"
  | "verificationRequestError";

export type TransactionState =
  | "started"
  | "pending"
  | "done"
  | "manuel"
  | "paymentPending";


export interface HelpDeskProps {
  country: Country;
  amount: number;
  account: Account;
  method: PaymentTypesArray[number];
}
