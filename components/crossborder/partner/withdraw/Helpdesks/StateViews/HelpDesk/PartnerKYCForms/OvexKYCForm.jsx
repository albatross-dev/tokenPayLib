import FieldRenderer from "@/tokenPayLib/components/Forms/FieldRenderer";
import React, { useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";
import AcceptTermsCheckbox from "./Helper/AcceptTermsCheckbox";
import { AuthContext } from "@/context/UserContext";
import preprocessDataForHelpDesk from "./Helper/processAndSerValues";

let formDataPreloaded = false;

export default function OvexKYCForm({ setValue, methods }) {
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

  const ovexB2BKYCInfo = [
    {
      type: "ui",
      content: <div className="font-bold">{tCrossborder("withdraw.helpDeskKYC.ovex.generalInfo")}</div>,
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
          options: t("signup.legalTypes", { returnObjects: true }),
          required: false,
          disabled: true,
          width: "w-1/2",
        },
      ],
    },
    {
      type: "ui",
      content: <div className="font-bold">{tCrossborder("withdraw.helpDeskKYC.ovex.address")}</div>,
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
          label: t(
            "information.fields.businessInformation.vendorRegisterNumber"
          ),
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
          type: "number",
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
      content: <div className="font-bold">{tCrossborder("withdraw.helpDeskKYC.ovex.bank")}</div>,
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
      name: "bankAddress",
      label: t("information.fields.bankInfo.bankAddress"),
      type: "text",
      required: true,
    },
    {
      type: "row",
      fields: [
        {
          name: "bankZipCode",
          label: t("information.fields.bankInfo.bankZipCode"),
          type: "text",
          required: true,
          width: "md:w-1/3",
        },
        {
          name: "bankCity",
          label: t("information.fields.bankInfo.bankCity"),
          type: "text",
          required: true,
          width: "md:w-2/3",
        },
      ],
    },
    {
      name: "bankCountry",
      label: t("information.fields.bankInfo.bankCountry"),
      type: "country",
      required: true,
    },
    {
      type: "ui",
      content: <div className="font-bold">{tCrossborder("withdraw.helpDeskKYC.ovex.representative")}</div>,
    },
    {
      type: "row",
      fields: [
        {
          name: "vendorRepresentativeName",
          label: tCrossborder("withdraw.helpDeskKYC.ovex.name"),
          type: "text",
          required: true,
          width: "md:w-1/2",
        },
        {
          name: "vendorRepresentativeSurname",
          label:  tCrossborder("withdraw.helpDeskKYC.ovex.surname"),
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
          label:  tCrossborder("withdraw.helpDeskKYC.ovex.email"),
          type: "text",
          required: true,
          width: "md:w-1/2",
        },
        {
          name: "vendorRepresentativePhone",
          label: tCrossborder("withdraw.helpDeskKYC.ovex.phone"),
          type: "text",
          required: true,
          width: "md:w-1/2",
        },
      ],
    },
    {
      name: "vendorRepresentativePosition",
      label:  tCrossborder("withdraw.helpDeskKYC.ovex.position"),
      type: "text",
      required: true,
    },
    {
      type: "ui",
      content: <div className="font-bold">{tCrossborder("withdraw.helpDeskKYC.ovex.businessModel")}</div>,
    },
    {
      name: "vendorBusinessModel",
      label: tCrossborder("withdraw.helpDeskKYC.ovex.businessModel"),
      type: "textarea",
      required: true,
    },
    {
      name: "ovexPurpose",
      label: tCrossborder("withdraw.helpDeskKYC.ovex.goal"),
      type: "textarea",
      required: true,
    },
    {
      name: "vendorSourceOfFunds",
      label:  tCrossborder("withdraw.helpDeskKYC.ovex.source"),
      type: "textarea",
      required: true,
    },
    {
      type: "ui",
      content: <div className="font-bold">{tCrossborder("withdraw.helpDeskKYC.ovex.representativeRight")}</div>,
    },
    {
      type: "array",
      name: "representatives",
      label: t("privateSettings.representativeInformation.representatives"),
      newLabel: t(
        "privateSettings.representativeInformation.representatives_newLabel"
      ),
      removeLabel: t(
        "privateSettings.representativeInformation.representatives_removeLabel"
      ),
      fields: [
        {
          type: "row",
          fields: [
            {
              name: "vendorRepresentativeName",
              label: t(
                "privateSettings.representativeInformation.vendorRepresentativeName"
              ),
              type: "text",
              width: "w-full",
              disabled: true,
              required: true,
            },
            {
              name: "vendorRepresentativeSurname",
              label: t(
                "privateSettings.representativeInformation.vendorRepresentativeSurname"
              ),
              type: "text",
              width: "w-full",
              disabled: true,
              required: true,
            },
          ],
        },
        {
          name: "vendorRepresentativeBirthDate",
          label: t(
            "privateSettings.representativeInformation.vendorRepresentativeBirthDate"
          ),
          type: "date",
          disabled: true,
          required: true,
        },
        {
          name: "vendorRepresentativeNationality",
          label: tCrossborder("withdraw.helpDeskKYC.ovex.nationality"),
          onlyIso: true,
          type: "country",
          required: true,
        },
        {
          type: "row",
          fields: [
            {
              name: "vendorRepresentative",
              label: t(
                "privateSettings.representativeInformation.vendorRepresentative"
              ),
              type: "checkbox",
              width: "md:w-1/2",
              required: true,
            },
            {
              name: "vendorRepresentativePowerOfAttorney",
              label: t(
                "privateSettings.representativeInformation.vendorRepresentativePowerOfAttorney"
              ),
              type: "checkbox",
              width: "md:w-1/2",
              required: true,
            },
          ],
        },
        {
          type: "row",
          fields: [
            {
              name: "vendorRepresentativeShareholder",
              label: t(
                "privateSettings.representativeInformation.vendorRepresentativeShareholder"
              ),
              type: "checkbox",
              width: "md:w-1/2",
              required: true,
            },
          ],
        },
      ],
    },
    {
      type: "ui",
      content: <div className="font-bold">{tCrossborder("withdraw.helpDeskKYC.ovex.documents")}</div>,
    },
    {
      type: "array",
      name: "commercialRegistrations",
      label: t("information.fields.documents.commercialRegistrations"),
      newLabel: t(
        "information.fields.documents.commercialRegistrations_newLabel"
      ),
      removeLabel: t(
        "information.fields.documents.commercialRegistrations_removeLabel"
      ),
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
      name: "statutes",
      label: t("information.fields.documents.statutes"),
      newLabel: t("information.fields.documents.statutes_newLabel"),
      removeLabel: t("information.fields.documents.statutes_removeLabel"),
      fields: [
        {
          name: "statute",
          label: t("information.fields.documents.statutes"),
          type: "file",
          required: true
        },
      ],
    },
    {
      type: "array",
      name: "shareholderDocs",
      label: t("information.fields.documents.shareholderDocs"),
      newLabel: t("information.fields.documents.shareholderDocs_newLabel"),
      removeLabel: t(
        "information.fields.documents.shareholderDocs_removeLabel"
      ),
      fields: [
        {
          name: "shareholders",
          label: t("information.fields.documents.shareholderDocs"),
          type: "file",
          required: true
        },
      ],
    },
    {
      type: "ui",
      content: <div className="h-4">{tCrossborder("withdraw.helpDeskKYC.ovex.representativeFiles")}</div>,
    },
    {
      type: "array",
      name: "representativeDocs",
      label: tCrossborder("withdraw.helpDeskKYC.ovex.representativeFilesLabel"),
      newLabel: tCrossborder("withdraw.helpDeskKYC.ovex.representativeFilesNewLabel"),
      removeLabel: tCrossborder("withdraw.helpDeskKYC.ovex.representativeFilesRemoveLabel"),
      fields: [
        {
          name: "representativeDoc",
          label: tCrossborder("withdraw.helpDeskKYC.ovex.representativeFileLabel"),
          type: "file",
          required: true
        },
      ],
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
            partnerName={"Ovex"}
            partnerTerms={
              "https://storage.googleapis.com/ovex-static-assets/legal/OVEX_Terms_and_Conditions.pdf"
            }
          />
        );
      },
    },
  ];

  return <FieldRenderer fields={ovexB2BKYCInfo} methods={methods} />;
}
