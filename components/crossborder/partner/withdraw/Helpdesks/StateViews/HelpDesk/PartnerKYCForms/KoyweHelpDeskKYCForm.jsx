import FieldRenderer from "@/tokenPayLib/components/Forms/FieldRenderer";
import React, { useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";
import AcceptTermsCheckbox from "./Helper/AcceptTermsCheckbox";
import { AuthContext } from "@/context/UserContext";
import preprocessDataForHelpDesk from "./Helper/processAndSerValues";

let formDataPreloaded = false;

export default function KoyweHelpDeskKYCForm({setValue, methods}) {
  const { t } = useTranslation("common");
  const { user } = useContext(AuthContext);


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
      content: <div className="font-bold">Allgemeine Informationen</div>,
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
      name: "vendorEmail",
      label: "Allgemeine Email",
      type: "email",
      required: true,
    },
    {
      name: "vendorPrivacyPolicy",
      label: "Link Datenschutz",
      type: "text",
      required: false,
    },
    {
      type: "ui",
      content: <div className="font-bold">Addresse</div>,
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
      content: <div className="font-bold">Bank</div>,
    },
    {
      name: "bankName",
      label: "Name",
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
      content: <div className="font-bold">Vertreter</div>,
    },
    {
      type: "row",
      fields: [
        {
          name: "vendorRepresentativeName",
          label: "Vorname",
          type: "text",
          required: true,
          width: "md:w-1/2",
        },
        {
          name: "vendorRepresentativeSurname",
          label: "Nachname",
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
          label: "Email",
          type: "text",
          required: true,
          width: "md:w-1/2",
        },
        {
          name: "vendorRepresentativePhone",
          label: "Telefonnummer",
          type: "text",
          required: true,
          width: "md:w-1/2",
        },
      ],
    },
    {
      type: "checkbox",
      name: "is_pep",
      label: "Politisch exponierte Person",
    },
    {
      type: "ui",
      content: <div className="mt-2 text-normal">Nachweis über die Berechtigung als Ansprechpartner (Power of Attorney, Board Decision, Handelsregisterauszug bei Geschäftsführern / Prokura)</div>,
    },
    {
      type: "array",
      name: "representativeAuthorizationDocs",
      label: "Berechtigung",
      newLabel: "Neues Dokument hinzufügen",
      removeLabel: "Dokument entfernen",
      fields: [
        {
          name: "representativeAuthorizationDocs",
          label: "Nachweis über die Berechtigung als Ansprechpartner",
          type: "file",
          required: true
        },
      ],
    },
    {
      type: "ui",
      content: <div className="font-bold">Über die Firma</div>,
    },
    {
      type: "number",
      name: "koyweVolume",
      label: "Geschätztes monatliches Transaktionsvolumen",
      required: true,
    },
    {
      name: "vendorIndustry",
      label: t("information.fields.businessInformation.vendorIndustry"),
      type: "select",
      options: t("NACE", { returnObjects: true }),
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
      content: <div className="font-bold">Berechtigte Vertreter / UBO</div>,
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
          label: "Nationalität",
          onlyIso: true,
          type: "country",
          required: true,
        },
        {
          type: "row",
          fields: [
            {
              name: "vendorRepresentativeTaxId",
              label: "Steuernummer",
              type: "text",
              width: "md:w-1/2",
              required: true,
            },
            {
              name: "vendorRepresentativeId",
              label: "Ausweis-Nummer",
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
        {
          name: "vendorRepresentativeShares",
          label: "Anteil in %",
          type: "number",
          required: false
        },
      ],
    },
    {
      type: "ui",
      content: <div className="font-bold">Dokumente</div>,
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
      name: "taxIdDocs",
      label: "Zuweisung der Steuernummer",
      newLabel: "Neues Dokument hinzufügen",
      removeLabel: "Dokument entfernen",
      fields: [
        {
          name: "taxIdDoc",
          label: "Dokument",
          type: "file",
          required: true,
        },
      ],
    },
    {
      type: "array",
      name: "vendorProofOfResidence",
      label: "Addressnachweis",
      newLabel: "Neues Dokument hinzufügen",
      removeLabel: "Dokument entfernen",
      fields: [
        {
          name: "vendorProofOfResidencePage",
          label: "Dokument",
          type: "file",
          required: true,
        },
      ],
    },
    {
      name: "koyweComment",
      label: "Kommentar",
      type: "textarea",
      required: false,
    },
    {
      type: "ui",
      content: <div className="h-4"></div>,
    },
    {
      name: "acceptTerms",
      label: "Nutzungsbedingungen akzeptieren",
      type: "custom",
      content: (methods) => {
        return (
          <AcceptTermsCheckbox
            methods={methods}
            partnerName={"Koywe"}
            partnerTerms={
              "https://www.koywe.com/EN/terms"
            }
          />
        );
      },
    },
  ];

  return <FieldRenderer fields={ovexB2BKYCInfo} methods={methods} />;
}

