import { api } from "../../../../../context/UserContext";

export interface BitcoinVNQuote {
  id: string;
  depositAmount: number;
  depositFee: number;
  depositMethod: string;
  settleAmount: number;
  settleFee: number;
  settleMethod: string;
  rate: number;
  rawRate: number;
  createdAt: string;
  expiresAt: string;
  accepted: boolean;
}

interface BitcoinVNMetadata {
  min: number;
  max: number;
}

export async function getBitcoinVNMetaData(): Promise<BitcoinVNMetadata> {
  try {
    const result = await api.get<BitcoinVNMetadata>(
      "/api/fiatTransaction/bitcoinVN/getMetaData"
    );
    return result.data;
  } catch (error) {
    console.error("Error fetching BitcoinVN metadata:", error);
    throw error;
  }
}

export async function getBitcoinVNQuote(
  amount: number
): Promise<BitcoinVNQuote> {
  try {
    const result = await api.post<BitcoinVNQuote>(
      "/api/fiatTransaction/bitcoinVN/quote",
      {
        depositAmount: amount,
        settleAmount: null,
      }
    );
    return result.data;
  } catch (error) {
    console.error("Error fetching BitcoinVN quote:", error);
    throw error;
  }
}
