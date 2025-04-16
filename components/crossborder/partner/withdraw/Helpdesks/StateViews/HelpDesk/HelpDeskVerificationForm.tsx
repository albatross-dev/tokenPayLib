import React, { useContext } from "react";
import { FieldValues, FormProvider, useForm, UseFormReturn, UseFormSetValue } from "react-hook-form";
import OvexKYCForm from "./PartnerKYCForms/Vendor/OvexKYCForm";
import BitcoinVNHelpDeskKYCForm from "./PartnerKYCForms/Vendor/BitcoinVNHelpDeskKYCForm";
import KoyweHelpDeskKYCForm from "./PartnerKYCForms/Vendor/KoyweHelpDeskKYCForm";
import KotaniPayHelpDeskKYCForm from "./PartnerKYCForms/Vendor/KotaniPayHelpDeskKYCForm";
import { useTranslation } from "next-i18next";
import { AuthContext } from "../../../../../../../../context/UserContext";
import OvexKYCFormConsumer from "./PartnerKYCForms/Consumer/OvexKYCForm";
import BitcoinVNHelpDeskKYCFormConsumer from "./PartnerKYCForms/Consumer/BitcoinVNHelpDeskKYCForm";
import KotaniPayHelpDeskKYCFormConsumer from "./PartnerKYCForms/Consumer/KotaniPayHelpDeskKYCForm";
import { PaymentTypesArray } from "../../../../../../../types/payload-types";

interface FormRendererProps {
  method: PaymentTypesArray[number];
  setValue: UseFormSetValue<FieldValues>;
  methods: UseFormReturn<FieldValues, any, undefined>;
}

function FormRenderer({ method, setValue, methods }: FormRendererProps) {
  const { t: tCrossborder } = useTranslation("crossborder");

  const { user } = useContext(AuthContext);

  console.log("user", user);

  if (user?.type === "vendor") {
    switch (method?.type) {
      case "ovex":
        return <OvexKYCForm setValue={setValue} methods={methods} />;
      case "bitcoin_vn_helpdesk":
        return (
          <BitcoinVNHelpDeskKYCForm setValue={setValue} methods={methods} />
        );
      case "koywe_helpdesk":
        return <KoyweHelpDeskKYCForm setValue={setValue} methods={methods} />;
      case "kotanipay_helpdesk":
        return (
          <KotaniPayHelpDeskKYCForm setValue={setValue} methods={methods} />
        );
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
  } else {
    switch (method?.type) {
      case "ovex":
        return <OvexKYCFormConsumer setValue={setValue} methods={methods} />;
      case "bitcoin_vn_helpdesk":
        return (
          <BitcoinVNHelpDeskKYCFormConsumer
            setValue={setValue}
            methods={methods}
          />
        );
      case "kotanipay_helpdesk":
        return (
          <KotaniPayHelpDeskKYCFormConsumer
            setValue={setValue}
            methods={methods}
          />
        );
      case "coinhako_helpdesk":
        return (
          <div className="mb-4 bg-gray-100 rounded p-4">
            {tCrossborder("withdraw.helpDeskKYC.coinHackoInfo")}
          </div>
        );
      case "koywe_helpdesk":
      default:
        return (
          <div className="mb-4 bg-gray-100 rounded p-4">
            {tCrossborder("withdraw.helpDeskKYC.noInfoNeeded")}
          </div>
        );
    }
  }
}

interface HelpDeskVerificationFormProps {
  handleVerificationRequest: (data: any) => void;
  method: PaymentTypesArray[number];
}

export default function HelpDeskVerificationForm({
  handleVerificationRequest,
  method,
}: HelpDeskVerificationFormProps) {
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
