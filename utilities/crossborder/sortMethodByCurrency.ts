import { PaymentTypesArray } from "../../types/payload-types";

/**
 * Sorts the payment methods by the currency they accept
 * @param {*} methods as retrieved from the backend
 * @param {*} transfer boolean to determine if the methods are for a transfer (crossborder) or not
 * @returns
 */
export default function sortMethodByCurrencyWithdraw(
  methods: PaymentTypesArray,
  transfer: boolean
): Record<string, PaymentTypesArray> {
  let sortedMethods: Record<string, any[]> = {};

  methods.forEach((method) => {
    // Ensure acceptedCrypto is an array (split if it's a string)
    // EURS or EURS,USDC,USDT
    const acceptedCurrencies: string[] =
      typeof method.acceptedCrypto === "string"
        ? method.acceptedCrypto.split(",").map((c) => c.trim()) // Split and trim spaces
        : [method.acceptedCrypto || ""]; // Wrap single currency in an array

    acceptedCurrencies.forEach((currency: string) => {
      if (!sortedMethods[currency]) {
        sortedMethods[currency] = [];
      }

      if (transfer) {
        if (!method.withdrawOnly) sortedMethods[currency].push(method);
      } else {
        if (!method.noWithdraw) sortedMethods[currency].push(method);
      }
    });
  });

  return sortedMethods;
}

/**
 * Categorizes the given methods into currencies and sorts out all methods that do not support deposits.
 *
 * @param {*} methods as retrieved from the backend
 * @returns an object with the currencie string as keys and a list of methods that support that currencie.
 */
export function sortMethodByCurrencyDeposit(
  methods: PaymentTypesArray
): Record<string, PaymentTypesArray> {
  let sortedMethods: Record<string, any[]> = {};

  methods.forEach((method) => {
    // Ensure acceptedCrypto is an array (split if it's a string)
    // EURS or EURS,USDC,USDT
    const acceptedCurrencies: string[] =
      typeof method.acceptedCrypto === "string"
        ? method.acceptedCrypto.split(",").map((c) => c.trim()) // Split and trim spaces
        : [method.acceptedCrypto || ""]; // Wrap single currency in an array

    console.log("acceptedCurrencies", method.name, acceptedCurrencies);

    acceptedCurrencies.forEach((currency: string) => {
      if (!sortedMethods[currency]) {
        sortedMethods[currency] = [];
      }

      if (method.supportDeposit) {
        // copy method and replace acceptedCrypto with currency
        let methodCopy = { ...method, acceptedCrypto: currency };
        sortedMethods[currency].push(methodCopy);
      }
    });
  });

  console.log("sortedMethods", sortedMethods);

  return sortedMethods;
}
