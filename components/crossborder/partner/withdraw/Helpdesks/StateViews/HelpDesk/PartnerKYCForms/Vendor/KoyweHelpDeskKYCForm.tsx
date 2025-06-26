import FieldRenderer from "../../../../../../../../Forms/FieldRenderer";
import React, { useContext, useEffect } from "react";
import { useTranslation } from "next-i18next";
import AcceptTermsCheckbox from "../Helper/AcceptTermsCheckbox";
import { AuthContext } from "../../../../../../../../../../context/UserContext";
import preprocessDataForHelpDesk from "../Helper/processAndSerValues";
import { UseFormReturn } from "react-hook-form";
import { UseFormSetValue } from "react-hook-form";
import { FormField } from "../../../../../../../../Forms/types";

let formDataPreloaded = false;

interface KoyweHelpDeskKYCFormProps {
  setValue: UseFormSetValue<any>;
  methods: UseFormReturn;
}

export default function KoyweHelpDeskKYCForm({ setValue, methods }: KoyweHelpDeskKYCFormProps) {
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
      content: <div className="font-bold">{tCrossborder("withdraw.helpDeskKYC.koywe.generalInfo")}</div>,
    },
    {
      type: "row",
      fields: [
        {
          name: "vendorName",
          label: t("information.fields.businessInformation.vendorName"),
          type: "text",
          required: false,
          disabled: true,
          width: "w-1/2",
        },
        {
          name: "vendorLegalType",
          label: t("information.fields.businessInformation.vendorLegalType"),
          type: "select",
          options: t("signup.legalTypes", { returnObjects: true }) as { label: string; value: any }[],
          required: false,
          disabled: true,
          width: "w-1/2",
        },
      ],
    },
    {
      name: "vendorEmail",
      label: tCrossborder("withdraw.helpDeskKYC.koywe.generalEmail"),
      type: "email",
      required: true,
    },
    {
      name: "vendorPrivacyPolicy",
      label: tCrossborder("withdraw.helpDeskKYC.koywe.gdprLink"),
      type: "text",
      required: false,
    },
    {
      type: "ui",
      content: <div className="font-bold">{tCrossborder("withdraw.helpDeskKYC.koywe.address")}</div>,
    },
    {
      type: "row",
      fields: [
        {
          name: "vendorRegister",
          label: t("information.fields.businessInformation.vendorRegister"),
          type: "text",
          required: true,
          width: "md:w-1/3",
        },
        {
          name: "vendorRegisterNumber",
          label: t("information.fields.businessInformation.vendorRegisterNumber"),
          type: "text",
          required: true,
          width: "md:w-2/3",
        },
      ],
    },
    {
      name: "vendorStreetAddress1",
      label: t("information.fields.companyAddress.vendorStreetAddress1"),
      type: "text",
      required: true,
    },
    {
      name: "vendorStreetAddress2",
      label: t("information.fields.companyAddress.vendorStreetAddress2"),
      type: "text",
      required: false,
    },
    {
      type: "row",
      fields: [
        {
          name: "vendorZipCode",
          label: t("information.fields.companyAddress.vendorZipCode"),
          type: "text",
          required: true,
          width: "md:w-1/4",
        },
        {
          name: "vendorCity",
          label: t("information.fields.companyAddress.vendorCity"),
          type: "text",
          required: true,
          width: "md:w-3/4",
        },
      ],
    },
    {
      name: "vendorCountry",
      label: t("information.fields.companyAddress.vendorCountry"),
      onlyIso: true,
      type: "country",
      required: true,
    },
    {
      type: "ui",
      content: <div className="font-bold">{tCrossborder("withdraw.helpDeskKYC.koywe.bank")}</div>,
    },
    {
      name: "bankName",
      label: tCrossborder("withdraw.helpDeskKYC.koywe.bankName"),
      type: "text",
      required: true,
    },
    {
      type: "row",
      fields: [
        {
          name: "iban",
          label: t("information.fields.bankInfo.iban"),
          type: "text",
          required: true,
          width: "md:w-2/3",
        },
        {
          name: "bic",
          label: t("information.fields.bankInfo.bic"),
          type: "text",
          required: true,
          width: "md:w-1/3",
        },
      ],
    },
    {
      type: "ui",
      content: <div className="font-bold">{tCrossborder("withdraw.helpDeskKYC.koywe.representative")}</div>,
    },
    {
      type: "row",
      fields: [
        {
          name: "vendorRepresentativeName",
          label: tCrossborder("withdraw.helpDeskKYC.koywe.name"),
          type: "text",
          required: true,
          width: "md:w-1/2",
        },
        {
          name: "vendorRepresentativeSurname",
          label: tCrossborder("withdraw.helpDeskKYC.koywe.surename"),
          type: "text",
          required: true,
          width: "md:w-1/2",
        },
      ],
    },
    {
      type: "row",
      fields: [
        {
          name: "vendorRepresentativeEmail",
          label: tCrossborder("withdraw.helpDeskKYC.koywe.email"),
          type: "text",
          required: true,
          width: "md:w-1/2",
        },
        {
          name: "vendorRepresentativePhone",
          label: tCrossborder("withdraw.helpDeskKYC.koywe.phone"),
          type: "text",
          required: true,
          width: "md:w-1/2",
        },
      ],
    },
    {
      type: "checkbox",
      name: "is_pep",
      label: tCrossborder("withdraw.helpDeskKYC.koywe.pepLabel"),
    },
    {
      type: "ui",
      content: (
        <div className="mt-2 text-normal">{tCrossborder("withdraw.helpDeskKYC.koywe.representativeAuthDocLabel")}</div>
      ),
    },
    {
      type: "array",
      name: "representativeAuthorizationDocs",
      label: tCrossborder("withdraw.helpDeskKYC.koywe.authDocLabel"),
      newLabel: tCrossborder("withdraw.helpDeskKYC.koywe.authDocNewLabel"),
      removeLabel: tCrossborder("withdraw.helpDeskKYC.koywe.authDocRemoveLabel"),
      fields: [
        {
          name: "representativeAuthorizationDocs",
          label: tCrossborder("withdraw.helpDeskKYC.koywe.authDocFileLabel"),
          type: "file",
          required: true,
        },
      ],
    },
    {
      type: "ui",
      content: <div className="font-bold">{tCrossborder("withdraw.helpDeskKYC.koywe.about")}</div>,
    },
    {
      type: "number",
      name: "koyweVolume",
      label: tCrossborder("withdraw.helpDeskKYC.koywe.about"),
      required: true,
    },
    {
      name: "vendorIndustry",
      label: t("information.fields.businessInformation.vendorIndustry"),
      type: "select",
      options: t("NACE", { returnObjects: true }) as { label: string; value: any }[],
      required: true,
    },
    {
      name: "vendorTaxId",
      label: t("information.fields.businessInformation.vendorTaxId"),
      type: "text",
      required: true,
    },
    {
      type: "ui",
      content: <div className="font-bold">{tCrossborder("withdraw.helpDeskKYC.koywe.about")}</div>,
    },
    {
      type: "array",
      name: "representatives",
      label: t("privateSettings.representativeInformation.representatives"),
      newLabel: t("privateSettings.representativeInformation.representatives_newLabel"),
      removeLabel: t("privateSettings.representativeInformation.representatives_removeLabel"),
      fields: [
        {
          type: "row",
          fields: [
            {
              name: "vendorRepresentativeName",
              label: t("privateSettings.representativeInformation.vendorRepresentativeName"),
              type: "text",
              width: "w-full",
              disabled: true,
              required: true,
            },
            {
              name: "vendorRepresentativeSurname",
              label: t("privateSettings.representativeInformation.vendorRepresentativeSurname"),
              type: "text",
              width: "w-full",
              disabled: true,
              required: true,
            },
          ],
        },
        {
          name: "vendorRepresentativeBirthDate",
          label: t("privateSettings.representativeInformation.vendorRepresentativeBirthDate"),
          type: "date",
          disabled: true,
          required: true,
        },
        {
          name: "vendorRepresentativeNationality",
          label: tCrossborder("withdraw.helpDeskKYC.koywe.nationality"),
          onlyIso: true,
          type: "country",
          required: true,
        },
        {
          type: "row",
          fields: [
            {
              name: "vendorRepresentativeTaxId",
              label: tCrossborder("withdraw.helpDeskKYC.koywe.taxNumber"),
              type: "text",
              width: "md:w-1/2",
              required: true,
            },
            {
              name: "vendorRepresentativeId",
              label: tCrossborder("withdraw.helpDeskKYC.koywe.IDNumber"),
              type: "text",
              width: "md:w-1/2",
              required: true,
            },
          ],
        },
        {
          type: "row",
          fields: [
            {
              name: "vendorRepresentative",
              label: t("privateSettings.representativeInformation.vendorRepresentative"),
              type: "checkbox",
              width: "md:w-1/2",
            },
            {
              name: "vendorRepresentativePowerOfAttorney",
              label: t("privateSettings.representativeInformation.vendorRepresentativePowerOfAttorney"),
              type: "checkbox",
              width: "md:w-1/2",
            },
          ],
        },
        {
          type: "row",
          fields: [
            {
              name: "vendorRepresentativeShareholder",
              label: t("privateSettings.representativeInformation.vendorRepresentativeShareholder"),
              type: "checkbox",
              width: "md:w-1/2",
            },
          ],
        },
        {
          name: "vendorRepresentativeShares",
          label: tCrossborder("withdraw.helpDeskKYC.koywe.share"),
          type: "number",
          required: false,
        },
      ],
    },
    {
      type: "ui",
      content: <div className="font-bold">{tCrossborder("withdraw.helpDeskKYC.koywe.documents")}</div>,
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
      type: "array",
      name: "taxIdDocs",
      label: tCrossborder("withdraw.helpDeskKYC.koywe.taxIdDocLabel"),
      newLabel: tCrossborder("withdraw.helpDeskKYC.koywe.taxIdDocNewLabel"),
      removeLabel: tCrossborder("withdraw.helpDeskKYC.koywe.taxIdDocRemoveLabel"),
      fields: [
        {
          name: "taxIdDoc",
          label: tCrossborder("withdraw.helpDeskKYC.koywe.taxIdDocFileLabel"),
          type: "file",
          required: true,
        },
      ],
    },
    {
      type: "array",
      name: "vendorProofOfResidence",
      label: tCrossborder("withdraw.helpDeskKYC.koywe.residenceDocLabel"),
      newLabel: tCrossborder("withdraw.helpDeskKYC.koywe.residenceDocNewLabel"),
      removeLabel: tCrossborder("withdraw.helpDeskKYC.koywe.residenceDocRemoveLabel"),
      fields: [
        {
          name: "vendorProofOfResidencePage",
          label: tCrossborder("withdraw.helpDeskKYC.koywe.residenceDocFileLabel"),
          type: "file",
          required: true,
        },
      ],
    },
    {
      name: "koyweComment",
      label: tCrossborder("withdraw.helpDeskKYC.koywe.comment"),
      type: "textarea",
      required: false,
    },
    {
      type: "ui",
      content: <div className="h-4"></div>,
    },
    {
      name: "acceptTerms",
      label: tCrossborder("withdraw.helpDeskKYC.acceptTermsLabel"),
      type: "custom",
      content: (methods) => {
        return (
          <AcceptTermsCheckbox
            methods={methods}
            partnerName={"Koywe"}
            partnerTerms={"https://www.koywe.com/EN/terms"}
          />
        );
      },
    },
  ];

  return <FieldRenderer fields={ovexB2BKYCInfo} />;
}
