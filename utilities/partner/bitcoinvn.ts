import { sendErrorReport } from "@/context/UserContext";
import axios, { AxiosResponse, AxiosError } from "axios";

// --- Type Definitions ---

interface QuoteParams {
  depositMethod: string;
  depositAmount?: number;
  settleMethod: string;
  settleAmount?: number;
}

interface MetaDataParams {
  depositMethod: string;
  settleMethod: string;
}

interface BitcoinVNResponse {
  [key: string]: any;
}

// --- Function Implementations ---

/**
 * Retrieves a quote for a BitcoinVN fiat transaction.
 */
export async function getQuote(
  params: QuoteParams
): Promise<BitcoinVNResponse | null> {
  try {
    const response: AxiosResponse<BitcoinVNResponse> = await axios.post(
      "api/fiatTransaction/bitcoinVN/v2/quote",
      params
    );

    return response.data;
  } catch (error: any) {
    sendErrorReport("Error while retrieving quote from bitcoinVN", error);
    if (axios.isAxiosError(error)) {
      console.error(
        "Error while retrieving quote from bitcoinVN (Axios Error):",
        error.message
      );
      if (error.response) {
        console.error("Response Data:", error.response.data);
        console.error("Response Status:", error.response.status);
        console.error("Response Headers:", error.response.headers);
      } else if (error.request) {
        console.error("Request:", error.request);
      }
    } else {
      console.error(
        "Error while retrieving quote from bitcoinVN (Generic Error):",
        error
      );
    }
    return null;
  }
}

/**
 * Retrieves metadata for a BitcoinVN fiat transaction.
 */
export async function getMetaData(
  params: MetaDataParams
): Promise<BitcoinVNResponse | null> {
  try {
    const response: AxiosResponse<BitcoinVNResponse> = await axios.post(
      "/api/fiatTransaction/bitcoinVN/v2/meta",
      params
    );

    return response.data;
  } catch (error: any) {
    sendErrorReport("Error while retrieving metadata from bitcoinVN", error);
      if (axios.isAxiosError(error)) {
        console.error(
          "Error while retrieving metadata from bitcoinVN (Axios Error):",
          error.message
        );
        if (error.response) {
          console.error("Response Data:", error.response.data);
          console.error("Response Status:", error.response.status);
          console.error("Response Headers:", error.response.headers);
        } else if (error.request) {
          console.error("Request:", error.request);
        }
      } else {
        console.error(
          "Error while retrieving metadata from bitcoinVN (Generic Error):",
          error
        );
      }
    return null;
  }
}