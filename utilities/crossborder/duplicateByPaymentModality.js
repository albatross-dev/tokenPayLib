/**
 * A function that takes a list of payment partners and if a payment partner has multiple
 * modalities they get split up and treaded as separate partners.
 * Also ensures we can support modalities and the rest of our pipeline
 * can stay the same
 */
function duplicateByPaymentModality(paymentPartners, key) {
  const partners = [];
  console.log("paymentPartners", paymentPartners, key);
  paymentPartners.forEach((partner) => {
    // check if partner[key] is an array
    if (!Array.isArray(partner[key])) {
      partner[key] = [partner[key]];
    }

    if (partner[key].length > 1) {
      // check if partner[key] is an array
      if (!Array.isArray(partner[key])) {
        partners.push(partner);
      }else{
      partner[key].forEach((modality) => {
        partners.push({
          ...partner,
          [key]: modality,
        });
      });
    }
    } else {
      partners.push(partner);
    }
  });

  return partners;
}

export default duplicateByPaymentModality;
