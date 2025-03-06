import React, { useContext, useEffect } from "react";
import OvexKYCForm from "./PartnerKYCForms/OvexKYCForm";
import { FormProvider, useForm } from "react-hook-form";
import BitcoinVNHelpDeskKYCForm from "./PartnerKYCForms/BitcoinVNHelpDeskKYCForm";
import KoyweHelpDeskKYCForm from "./PartnerKYCForms/KoyweHelpDeskKYCForm";
import KotaniPayHelpDeskKYCForm from "./PartnerKYCForms/KotaniPayHelpDeskKYCForm";
import { useTranslation } from "next-i18next";
import { AuthContext } from "../../../../../../../../context/UserContext";

function FormRenderer({ method, setValue, methods }) {
  const { t: tCrossborder } = useTranslation("crossborder");

  const { user } = useContext(AuthContext);

  if(user?.collection === "vendor"){
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
        return (
          <div className="mb-4 bg-gray-100 rounded p-4">
            {tCrossborder("withdraw.helpDeskKYC.coinHackoInfo")}
          </div>
        );
      default:
        return (
          <div className="mb-4 bg-gray-100 rounded p-4">
            {tCrossborder("withdraw.helpDeskKYC.noInfoNeeded")}
          </div>
        );
    }
  }else{
    return (
      <div className="mb-4 bg-gray-100 rounded p-4">
        {tCrossborder("withdraw.helpDeskKYC.noInfoNeeded")}
      </div>
    );
  }
  
}

export default function HelpDeskVerificationForm({
  handleVerificationRequest,
  method,
}) {
  const methods = useForm();
  const { handleSubmit, setValue } = methods;

  const { t: tCrossborder } = useTranslation("crossborder");

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="font-bold text-xl">
        {tCrossborder("withdraw.helpDeskKYC.noAccessInfo")}
      </div>
      <div>{tCrossborder("withdraw.helpDeskKYC.noAccessText")}</div>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(handleVerificationRequest)}>
          <FormRenderer method={method} setValue={setValue} methods={methods} />
          <div className="">
            <button
              type="submit"
              className="cursor-pointer inline-block bg-uhuBlue rounded py-1 px-2 font-bold text-white"
            >
              {tCrossborder("withdraw.helpDeskKYC.accessRequest")}
            </button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
