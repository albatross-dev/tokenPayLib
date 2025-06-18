import { Account } from "thirdweb/wallets";
import {
  Consumer,
  PaymentTypesArray,
  Vendor,
} from "../../../../../types/payload-types";
export interface FormData {
  phone: string;
}

export interface SwyptProps {
  amount: number;
  account: Account;
  user: Vendor | Consumer;
  method: PaymentTypesArray[number];
}

export type SwyptState =
  | "input"
  | "loading"
  | "transaction-created"
  | "error"
  | "success";
