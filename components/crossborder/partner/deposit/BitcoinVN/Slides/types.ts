import { FiatTransaction } from "../../../../../../types/payload-types";
import { BitcoinVNQuote } from "../../../../methods/BitcoinVNQuote";

export type ComponentState = "loading" | "error" | "overview" | "created";

export interface OverviewProps {
  quote: BitcoinVNQuote;
  onStartTransaction: () => Promise<void>;
}

// Extend FiatTransaction with the additional properties needed for BitcoinVN
export interface BitcoinVNTransaction extends FiatTransaction {
  depositAmount: number;
  depositMethod: string;
  shortId: string;
  bank: string;
  accountHolder: string;
  accountNumber: string;
}

export interface CreatedProps {
  transaction: BitcoinVNTransaction;
}

export interface UnverifiedProps {
  // Empty for now as it doesn't require any props
}

export interface LoadingProps {
  // Empty for now as it doesn't require any props
}

export interface ErrorProps {
  // Empty for now as it doesn't require any props
} 