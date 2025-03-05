import React, { useEffect } from "react";
import OvexKYCForm from "./PartnerKYCForms/OvexKYCForm";
import { FormProvider, useForm } from "react-hook-form";
import BitcoinVNHelpDeskKYCForm from "./PartnerKYCForms/BitcoinVNHelpDeskKYCForm";
import KoyweHelpDeskKYCForm from "./PartnerKYCForms/KoyweHelpDeskKYCForm";
import KotaniPayHelpDeskKYCForm from "./PartnerKYCForms/KotaniPayHelpDeskKYCForm";

function FormRenderer({method, setValue, methods}) {
  switch (method?.type) {
    case "ovex":
      return <OvexKYCForm setValue={setValue} methods={methods} />;
    case "bitcoin_vn_helpdesk":
      return <BitcoinVNHelpDeskKYCForm setValue={setValue} methods={methods} />;
    case "koywe_helpdesk":
      return <KoyweHelpDeskKYCForm setValue={setValue} methods={methods} />;
    case "kotanipay_helpdesk":
      return <KotaniPayHelpDeskKYCForm setValue={setValue} methods={methods} />;
    case "coinhako_helpdesk":
      return <div className="mb-4 bg-gray-100 rounded p-4">Unsere Prozesse unterliegen hohen Compliance-Anforderungen, wodurch ein gewisser Verwaltungsaufwand entsteht. Daher lohnt sich eine Durchführung in der Regel erst ab einer Summe von 10.000$ . Sobald dieser Schwellenwert erreicht ist, nehmen wir individuell Kontakt mit Ihnen auf, um alle weiteren Schritte effizient und persönlich zu besprechen.</div>; 
    default:
      return <div className="mb-4 bg-gray-100 rounded p-4">Es werden keine weiteren Informationen benötigt.</div>;
  }
}

export default function HelpDeskVerificationForm({
  handleVerificationRequest,
  method,
}) {

  const methods = useForm();
  const { handleSubmit, setValue } = methods;

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="font-bold text-xl">
        Sie sind für Ihre Währungsstrecke noch nicht freigeschaltet.
      </div>
      <div>
        Diese Währungsstrecke ist für Sie noch nicht freigeschaltet. Bitte
        ergänzen Sie die folgenden Informationen.
      </div>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(handleVerificationRequest)}>
        <FormRenderer method={method} setValue={setValue} methods={methods}/>
        <div className="">
        <button
          type="submit"
          className="cursor-pointer inline-block bg-uhuBlue rounded py-1 px-2 font-bold text-white"
        >
          Jetzt freischalten
        </button>
      </div>
      </form>
      </FormProvider>
     
      
    </div>
  );
}
