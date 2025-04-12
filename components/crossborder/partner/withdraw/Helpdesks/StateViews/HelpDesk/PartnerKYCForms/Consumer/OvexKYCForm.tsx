import FieldRenderer from "@/tokenPayLib/components/Forms/FieldRenderer";
import React, { useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";
import AcceptTermsCheckbox from "../Helper/AcceptTermsCheckbox";
import { AuthContext } from "@/context/UserContext";
import preprocessDataForHelpDesk from "../Helper/processAndSerValues";
import { UseFormSetValue, UseFormReturn } from "react-hook-form";

interface FormFieldBase {
  name?: string;
  label?: string;
  type?: string;
  required?: boolean;
  disabled?: boolean;
  width?: string;
}

interface FormFieldUI {
  type: "ui";
  content: React.ReactNode;
}

interface FormFieldArray {
  type: "array";
  name: string;
  label: string;
  newLabel: string;
  removeLabel: string;
  fields: FormFieldBase[];
}

interface FormFieldRow {
  type: "row";
  fields: FormFieldBase[];
}

interface FormFieldCustom {
  type: "custom";
  name: string;
  label: string;
  content: (methods: UseFormReturn) => React.ReactNode;
}

interface FormFieldCheckbox {
  type: "checkbox";
  name: string;
  label: string;
}

interface FormFieldCountry extends FormFieldBase {
  type: "country";
  onlyIso: boolean;
}

type FormField = FormFieldBase | FormFieldUI | FormFieldArray | FormFieldRow | FormFieldCustom | FormFieldCheckbox | FormFieldCountry;

interface OvexKYCFormProps {
  setValue: UseFormSetValue<any>;
  methods: UseFormReturn;
}

let formDataPreloaded = false;

export default function OvexKYCFormConsumer({ setValue, methods }: OvexKYCFormProps) {
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
      content: <div className="font-bold text-xl">{tCrossborder("withdraw.helpDeskKYC.ovex.generalInfo")}</div>,
    },
    {
      type: "row",
      fields: [
        {
          name: "name",
          label: tCrossborder("withdraw.helpDeskKYC.kotanipay.representativeName"),
          type: "text",
          required: false,
          disabled: true,
          width: "w-1/2",
        },
        {
          name: "surname",
          label: tCrossborder("withdraw.helpDeskKYC.kotanipay.representativeSurname"),
          required: false,
          disabled: true,
          width: "w-1/2",
        },
      ],
    },
    {
      name: "birthday",
      label: t("privateSettings.representativeInformation.vendorRepresentativeBirthDate"),
      type: "date",
      disabled: true,
      required: true,
    },
    {
      name: "nationality",
      label: t("information.fields.companyAddress.vendorCountry"),
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
      content: <div className="font-bold text-xl">{tCrossborder("withdraw.helpDeskKYC.consumer.ovex.ovexInfo")}</div>,
    },
    {
      name: "ovexVolume",
      label: tCrossborder("withdraw.helpDeskKYC.consumer.ovex.ovexVolume"),
      type: "text",
      required: true,
    },
    {
      name: "ovexTransactionCount",
      label: tCrossborder("withdraw.helpDeskKYC.consumer.ovex.ovexTransactions"),
      type: "text",
      required: true,
    },
    {
      type: "ui",
      content: <div className="font-bold text-xl">{tCrossborder("withdraw.helpDeskKYC.consumer.documents")}</div>,
    },
    {
      type: "ui",
      content: <div className="font-bold">{tCrossborder("withdraw.helpDeskKYC.consumer.idDocument")}</div>,
    },
    {
      name: "taxId",
      label: tCrossborder("withdraw.helpDeskKYC.consumer.idDocumentNumber"),
      type: "text",
      required: true,
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
          required: true
        },
      ],
    },
    {
      type: "ui",
      content: <div className="font-bold">{tCrossborder("withdraw.helpDeskKYC.consumer.proofOfAddress")}</div>,
    },
    {
      type: "array",
      name: "stasisProofOfResidence",
      label: tCrossborder("withdraw.helpDeskKYC.consumer.proofOfAddress"),
      newLabel: tCrossborder("withdraw.helpDeskKYC.consumer.proofOfAddressNewLabel"),
      removeLabel: tCrossborder("withdraw.helpDeskKYC.consumer.proofOfAddressRemoveLabel"),
      fields: [
        {
          name: "stasisProofOfResidencePage",
          label: tCrossborder("withdraw.helpDeskKYC.consumer.proofOfAddressFileLabel"),
          type: "file",
          required: true
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

  return <FieldRenderer fields={ovexB2BKYCInfo} methods={methods} />;
} 