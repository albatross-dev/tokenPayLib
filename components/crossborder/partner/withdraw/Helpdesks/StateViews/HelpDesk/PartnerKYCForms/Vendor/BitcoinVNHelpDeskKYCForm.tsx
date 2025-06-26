import FieldRenderer from "../../../../../../../../Forms/FieldRenderer";
import React, { useContext, useEffect } from "react";
import { useTranslation } from "next-i18next";
import preprocessDataForHelpDesk from "../Helper/processAndSerValues";

import AcceptTermsCheckbox from "../Helper/AcceptTermsCheckbox";
import { FormField } from "../../../../../../../../Forms/types";
import { UseFormReturn } from "react-hook-form";
import { UseFormSetValue } from "react-hook-form";
import { AuthContext } from "../../../../../../../../../../context/UserContext";
let formDataPreloaded = false;

interface BitcoinVNHelpDeskKYCFormProps {
  setValue: UseFormSetValue<any>;
  methods: UseFormReturn;
}

export default function BitcoinVNHelpDeskKYCForm({ setValue, methods }: BitcoinVNHelpDeskKYCFormProps) {
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
  }, [user]);

  const ovexB2BKYCInfo: FormField[] = [
    {
      type: "ui",
      content: <div className="font-bold">{tCrossborder("withdraw.helpDeskKYC.bitcoinvn.documents")}</div>,
    },
    {
      type: "array",
      name: "commercialRegistrations",
      label: t("information.fields.documents.commercialRegistrations"),
      newLabel: t("information.fields.documents.commercialRegistrations_newLabel"),
      removeLabel: t("information.fields.documents.commercialRegistrations_removeLabel"),
      fields: [
        {
          name: "commercialRegister",
          label: t("information.fields.documents.commercialRegistrations"),
          type: "file",
          required: true,
        },
      ],
    },
    {
      type: "ui",
      content: <div className="font-bold">{tCrossborder("withdraw.helpDeskKYC.bitcoinvn.documentInstructions")}</div>,
    },
    {
      type: "array",
      name: "bitcoinVNDocs",
      label: tCrossborder("withdraw.helpDeskKYC.bitcoinvn.representativeDocs"),
      newLabel: tCrossborder("withdraw.helpDeskKYC.bitcoinvn.newDocument"),
      removeLabel: tCrossborder("withdraw.helpDeskKYC.bitcoinvn.removeDocument"),
      fields: [
        {
          name: "bitcoinVNDoc",
          label: tCrossborder("withdraw.helpDeskKYC.bitcoinvn.representativeDoc"),
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
      content: (methods) => {
        return (
          <AcceptTermsCheckbox
            methods={methods}
            partnerName={"BitcoinVN"}
            partnerTerms={"https://support.bitcoinvn.io/help/en-us/3-general/8-terms-of-service"}
          />
        );
      },
    },
  ];

  return <FieldRenderer fields={ovexB2BKYCInfo} />;
}
