import axios from "axios";

/**
 * Retrieves metadata for a BitcoinVN fiat transaction.
 *
 * @param {Object} params - The parameters for the metadata request.
 * @param {string} params.depositMethod - The deposit method to be used for the transaction.
 * @param {number} params.depositAmount - The amount to be deposited in the transaction.
 * @param {string} params.settleMethod - The settlement method to be used for the transaction.
 * @param {number} params.settleAmount - The amount to be settled in the transaction.
 * @returns {Promise<Object | null>} A promise that resolves with the metadata for the
 *  transaction or null if the api call failed.
 */
export async function getQuote({
  depositMethod,
  depositAmount,
  settleMethod,
  settleAmount,
}: {
  depositMethod: string;
  depositAmount?: number;
  settleMethod: string;
  settleAmount?: number;
}) {
  try {
    const response = await axios.post(
      "api/fiatTransaction/bitcoinVN/v2/quote",
      {
        depositMethod,
        depositAmount,
        settleMethod,
        settleAmount,
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error while retrieving quote from bitcoinVN: ", error);
    return null;
  }
}

/**
 * Retrieves a quote for a BitcoinVN fiat transaction.
 *
 * @param {Object} params - The parameters for the quote request.
 * @param {string} params.depositMethod - The deposit method to be used for the transaction.
 * @param {string} params.settleMethod - The settlement method to be used for the transaction.
 * @returns {Promise<Object | null>} A promise that resolves with the quote data for the
 *  transaction or null if the api call failed.
 */
export async function getMetaData({
  depositMethod,
  settleMethod,
}: {
  depositMethod: string;
  settleMethod: string;
}) {
  try {
    const response = await axios.post(
      "/api/fiatTransaction/bitcoinVN/v2/meta",
      {
        depositMethod,
        settleMethod,
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error while retrieving metadata from bitcoinVN: ", error);
    return null;
  }
}
