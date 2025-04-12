import { FiatTransaction } from "./payload-types";

export type FiatTransactionRequest = Omit<FiatTransaction, 'id' | 'createdAt' | 'updatedAt'>;
