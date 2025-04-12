import { Account } from "thirdweb/wallets";
import { SwyptQuoteResponse } from "../../../../methods/SwyptQuote";

export type SwyptState = "input" | "awaitTransaction" | "loading" | "pooling" | "transaction-created" | "error" | "success";

export interface FormData {
  phone: string;
}

export interface InputProps {
  amount: number;
  startCurrency: string;
  endCurrency: string;
  quote: SwyptQuoteResponse;
  account: Account;
  formData: FormData;
  formError: string;
  onFormSubmit: (e: React.FormEvent) => void;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface AwaitTransactionProps {
  amount: number;
  startCurrency: string;
  endCurrency: string;
  quote: SwyptQuoteResponse;
  account: Account;
  onFinalize: () => Promise<void>;
}

export interface LoadingProps {
  // Empty as it doesn't require any props
}

export interface PoolingProps {
  // Empty as it doesn't require any props
}

export interface TransactionCreatedProps {
  // Empty as it doesn't require any props
}

export interface ErrorProps {
  // Empty as it doesn't require any props
}

export interface SuccessProps {
  // Empty as it doesn't require any props
} 