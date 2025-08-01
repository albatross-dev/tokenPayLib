import React, { useContext, useEffect } from "react";
import { useTranslation } from "next-i18next";
import AcceptTermsCheckbox from "../Helper/AcceptTermsCheckbox";
import preprocessDataForHelpDesk from "../Helper/processAndSerValues";
import { UseFormSetValue, UseFormReturn } from "react-hook-form";
import { AuthContext } from "../../../../../../../../../../context/UserContext";
import { FormField } from "../../../../../../../../Forms/types";
import FieldRenderer from "../../../../../../../../Forms/FieldRenderer";

interface BitcoinVNHelpDeskKYCFormProps {
  setValue: UseFormSetValue<any>;
  methods: UseFormReturn;
}

let formDataPreloaded = false;

export default function BitcoinVNHelpDeskKYCFormConsumer({ setValue, methods }: BitcoinVNHelpDeskKYCFormProps) {
  const { t } = useTranslation("common");
  const { user } = useContext(AuthContext);

  const { t: tCrossborder } = useTranslation("crossborder");

  useEffect(() => {
    formDataPreloaded = false;
  }, []);

  useEffect(() => {
    if (user !== "loading" && user && formDataPreloaded === false) {
      // copy user data to form
      preprocessDataForHelpDesk(user, setValue);
      formDataPreloaded = true;
    }
  }, [user, setValue]);

  const ovexB2BKYCInfo: FormField[] = [
    {
      type: "ui",
      content: <div className="font-bold">{tCrossborder("withdraw.helpDeskKYC.consumer.idDocument")}</div>,
    },
    {
      type: "array",
      name: "stasisRepresentativeProofOfIdentity",
      label: tCrossborder("withdraw.helpDeskKYC.consumer.idDocument"),
      newLabel: tCrossborder("withdraw.helpDeskKYC.consumer.idDocumentNewLabel"),
      removeLabel: tCrossborder("withdraw.helpDeskKYC.consumer.idDocumentRemoveLabel"),
      fields: [
        {
          name: "representativeProofOfIdentityPage",
          label: tCrossborder("withdraw.helpDeskKYC.consumer.idDocumentFileLabel"),
          type: "file",
          required: true,
        },
      ],
    },
    {
      type: "ui",
      content: <div className="h-4"></div>,
    },
    {
      name: "acceptTerms",
      label: tCrossborder("withdraw.helpDeskKYC.bitcoinvn.acceptTermsLabel"),
      type: "custom",
      content: (methods: UseFormReturn) => {
        return (
          <AcceptTermsCheckbox
            methods={methods}
            partnerName="BitcoinVN"
            partnerTerms="https://support.bitcoinvn.io/help/en-us/3-general/8-terms-of-service"
          />
        );
      },
    },
  ];

  return <FieldRenderer fields={ovexB2BKYCInfo} />;
}
