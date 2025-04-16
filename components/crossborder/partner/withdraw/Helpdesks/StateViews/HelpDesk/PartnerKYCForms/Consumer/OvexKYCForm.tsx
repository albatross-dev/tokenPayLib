import React, { useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";
import AcceptTermsCheckbox from "../Helper/AcceptTermsCheckbox";
import preprocessDataForHelpDesk from "../Helper/processAndSerValues";
import { UseFormSetValue, UseFormReturn, FieldValues } from "react-hook-form";
import { AuthContext } from "../../../../../../../../../../context/UserContext";
import FieldRenderer from "../../../../../../../../Forms/FieldRenderer";
import { FormField } from "../../../../../../../../Forms/types";

interface OvexKYCFormProps {
  setValue: UseFormSetValue<any>;
  methods: UseFormReturn<FieldValues, any, undefined>;
}

let formDataPreloaded = false;

export default function OvexKYCFormConsumer({
  setValue,
  methods,
}: OvexKYCFormProps) {
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
      content: (
        <div className="font-bold text-xl">
          {tCrossborder("withdraw.helpDeskKYC.ovex.generalInfo")}
        </div>
      ),
    },
    {
      type: "row",
      fields: [
        {
          name: "name",
          label: tCrossborder(
            "withdraw.helpDeskKYC.kotanipay.representativeName"
          ),
          type: "text",
          required: false,
          disabled: true,
          width: "w-1/2",
        },
        {
          type: "text",
          name: "surname",
          label: tCrossborder(
            "withdraw.helpDeskKYC.kotanipay.representativeSurname"
          ),
          required: false,
          disabled: true,
          width: "w-1/2",
        },
      ],
    },
    {
      name: "birthday",
      label: tCrossborder("withdraw.helpDeskKYC.birthday"),
      type: "date",
      disabled: true,
      required: true,
    },
    {
      name: "nationality",
      label: tCrossborder("withdraw.helpDeskKYC.nationality"),
      onlyIso: true,
      type: "country",
      required: true,
    },
    {
      name: "phone",
      label: tCrossborder("withdraw.helpDeskKYC.ovex.phone"),
      type: "text",
      required: true,
    },
    {
      name: "taxId",
      label: tCrossborder("withdraw.helpDeskKYC.koywe.taxNumber"),
      type: "text",
      required: true,
    },
    {
      name: "sourceOfFunds",
      label: tCrossborder("withdraw.helpDeskKYC.ovex.source"),
      type: "textarea",
      required: true,
    },
    {
      type: "checkbox",
      name: "is_pep",
      label: tCrossborder("withdraw.helpDeskKYC.koywe.pepLabel"),
    },
    {
      type: "ui",
      content: (
        <div className="font-bold text-xl">
          {tCrossborder("withdraw.helpDeskKYC.consumer.ovex.ovexInfo")}
        </div>
      ),
    },
    {
      name: "ovexVolume",
      label: tCrossborder("withdraw.helpDeskKYC.consumer.ovex.ovexVolume"),
      type: "text",
      required: true,
    },
    {
      name: "ovexTransactionCount",
      label: tCrossborder(
        "withdraw.helpDeskKYC.consumer.ovex.ovexTransactions"
      ),
      type: "text",
      required: true,
    },
    {
      type: "ui",
      content: (
        <div className="font-bold text-xl">
          {tCrossborder("withdraw.helpDeskKYC.consumer.documents")}
        </div>
      ),
    },
    {
      type: "ui",
      content: (
        <div className="font-bold">
          {tCrossborder("withdraw.helpDeskKYC.consumer.idDocument")}
        </div>
      ),
    },
    {
      name: "documentId",
      label: tCrossborder("withdraw.helpDeskKYC.consumer.idDocumentNumber"),
      type: "text",
      required: true,
    },
    {
      type: "array",
      name: "stasisRepresentativeProofOfIdentity",
      label: tCrossborder("withdraw.helpDeskKYC.consumer.idDocument"),
      newLabel: tCrossborder(
        "withdraw.helpDeskKYC.consumer.idDocumentNewLabel"
      ),
      removeLabel: tCrossborder(
        "withdraw.helpDeskKYC.consumer.idDocumentRemoveLabel"
      ),
      fields: [
        {
          name: "representativeProofOfIdentityPage",
          label: tCrossborder(
            "withdraw.helpDeskKYC.consumer.idDocumentFileLabel"
          ),
          type: "file",
          required: true,
        },
      ],
    },
    {
      type: "ui",
      content: (
        <div className="font-bold">
          {tCrossborder("withdraw.helpDeskKYC.consumer.proofOfAddress")}
        </div>
      ),
    },
    {
      type: "array",
      name: "stasisProofOfResidence",
      label: tCrossborder("withdraw.helpDeskKYC.consumer.proofOfAddress"),
      newLabel: tCrossborder(
        "withdraw.helpDeskKYC.consumer.proofOfAddressNewLabel"
      ),
      removeLabel: tCrossborder(
        "withdraw.helpDeskKYC.consumer.proofOfAddressRemoveLabel"
      ),
      fields: [
        {
          name: "stasisProofOfResidencePage",
          label: tCrossborder(
            "withdraw.helpDeskKYC.consumer.proofOfAddressFileLabel"
          ),
          type: "file",
          required: true,
        },
      ],
    },
    {
      type: "ui",
      content: <div className="font-bold"></div>,
    },
    {
      name: "acceptTerms",
      label: tCrossborder("withdraw.helpDeskKYC.acceptTermsLabel"),
      type: "custom",
      content: (methods: UseFormReturn) => {
        return (
          <AcceptTermsCheckbox
            methods={methods}
            partnerName="Ovex"
            partnerTerms="https://storage.googleapis.com/ovex-static-assets/legal/OVEX_Terms_and_Conditions.pdf"
          />
        );
      },
    },
  ];

  return <FieldRenderer fields={ovexB2BKYCInfo} />;
}
