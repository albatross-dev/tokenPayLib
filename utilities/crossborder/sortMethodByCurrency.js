/**
 * Sorts the payment methods by the currency they accept
 * @param {*} methods as retrieved from the backend 
 * @param {*} transfer boolean to determine if the methods are for a transfer (crossborder) or not
 * @returns 
 */
export default function sortMethodByCurrencyWithdraw(methods, transfer) {
  let sortedMethods = {};

  methods.forEach((method) => {
    if (!sortedMethods[method.acceptedCrypto]) {
      sortedMethods[method.acceptedCrypto] = [];
    }

    if (transfer) {
      if (!method.withdrawOnly)
        sortedMethods[method.acceptedCrypto].push(method);
    } else {
      if (!method.noWithdraw) sortedMethods[method.acceptedCrypto].push(method);
    }
  });

  return sortedMethods;
}

/**
 * Categorizes the given methods into currencies and sorts out all methods that do not support deposits.
 *
 * @param {*} methods as retrieved from the backend
 * @returns an object with the currencie string as keys and a list of methods that support that currencie.
 */
export function sortMethodByCurrencyDeposit(methods) {
  let sortedMethods = {};

  methods.forEach((method) => {
    if (!sortedMethods[method.acceptedCrypto]) {
      sortedMethods[method.acceptedCrypto] = [];
    }

    if (method.supportDeposit)
      sortedMethods[method.acceptedCrypto].push(method);
  });

  return sortedMethods;
}