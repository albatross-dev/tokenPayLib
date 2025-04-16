import FieldRenderer from "../../../../../../../../Forms/FieldRenderer";
import React, { useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";
import AcceptTermsCheckbox from "../Helper/AcceptTermsCheckbox";
import { AuthContext } from "../../../../../../../../../../context/UserContext";
import preprocessDataForHelpDesk from "../Helper/processAndSerValues";

import { UseFormSetValue, UseFormReturn } from "react-hook-form";
import { FormField } from "../../../../../../../../Forms/types";
import {
  requiredDocuments,
  visibleDocuments,
} from "../../../../../../../../../utilities/kyc/requiredDocumentsInfo";
let formDataPreloaded = false;

interface KotaniPayHelpDeskKYCFormProps {
  setValue: UseFormSetValue<any>;
  methods: UseFormReturn;
}

export default function KotaniPayHelpDeskKYCForm({
  setValue,
  methods,
}: KotaniPayHelpDeskKYCFormProps) {
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
      content: (
        <div className="font-bold">
          {tCrossborder("withdraw.helpDeskKYC.kotanipay.generalInfo")}
        </div>
      ),
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
      name: "vendorFoundingDate",
      label: t("information.fields.businessInformation.vendorFoundingDate"),
      type: "date",
      required: true,
    },
    {
      name: "Website",
      label: tCrossborder("withdraw.helpDeskKYC.kotanipay.website"),
      type: "text",
      required: false,
    },
    {
      type: "ui",
      content: (
        <div className="font-bold">
          {tCrossborder("withdraw.helpDeskKYC.kotanipay.address")}
        </div>
      ),
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
      content: (
        <div className="font-bold">
          {tCrossborder("withdraw.helpDeskKYC.kotanipay.bank")}
        </div>
      ),
    },
    {
      name: "bankName",
      label: tCrossborder("withdraw.helpDeskKYC.kotanipay.name"),
      type: "text",
      required: true,
    },
    {
      name: "bankAccountCurrency",
      label: tCrossborder("withdraw.helpDeskKYC.kotanipay.bankAccountCurrency"),
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
      type: "array",
      name: "vendorBankStatements",
      label: tCrossborder("withdraw.helpDeskKYC.kotanipay.bankStatements"),
      newLabel: tCrossborder("withdraw.helpDeskKYC.kotanipay.addDocument"),
      removeLabel: tCrossborder(
        "withdraw.helpDeskKYC.kotanipay.removeDocument"
      ),
      fields: [
        {
          name: "vendorBankStatement",
          label: tCrossborder("withdraw.helpDeskKYC.kotanipay.bankStatement"),
          type: "file",
          required: true,
        },
      ],
    },
    {
      type: "ui",
      content: (
        <div className="font-bold">
          {tCrossborder("withdraw.helpDeskKYC.kotanipay.managingDirector")}
        </div>
      ),
    },
    {
      type: "row",
      fields: [
        {
          name: "vendorRepresentativeName",
          label: tCrossborder(
            "withdraw.helpDeskKYC.kotanipay.representativeName"
          ),
          type: "text",
          required: true,
          width: "md:w-1/2",
        },
        {
          name: "vendorRepresentativeSurname",
          label: tCrossborder(
            "withdraw.helpDeskKYC.kotanipay.representativeSurname"
          ),
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
          label: tCrossborder(
            "withdraw.helpDeskKYC.kotanipay.representativeEmail"
          ),
          type: "text",
          required: true,
          width: "md:w-1/2",
        },
        {
          name: "vendorRepresentativePhone",
          label: tCrossborder(
            "withdraw.helpDeskKYC.kotanipay.representativePhone"
          ),
          type: "text",
          required: true,
          width: "md:w-1/2",
        },
      ],
    },
    {
      type: "ui",
      content: (
        <div className="font-bold">
          {tCrossborder(
            "withdraw.helpDeskKYC.kotanipay.authorizedRepresentatives"
          )}
        </div>
      ),
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
          name: "vendorRepresentativeAddress",
          label: tCrossborder(
            "withdraw.helpDeskKYC.kotanipay.representativeAddress"
          ),
          type: "text",
          required: true,
        },
        {
          type: "row",
          fields: [
            {
              name: "vendorRepresentativeZip",
              label: tCrossborder(
                "withdraw.helpDeskKYC.kotanipay.representativeZip"
              ),
              type: "text",
              width: "md:w-1/3",
              required: true,
            },
            {
              name: "vendorRepresentativeCity",
              label: tCrossborder(
                "withdraw.helpDeskKYC.kotanipay.representativeCity"
              ),
              type: "text",
              width: "md:w-2/3",
              required: true,
            },
          ],
        },
        {
          name: "vendorRepresentativeNationality",
          label: tCrossborder(
            "withdraw.helpDeskKYC.kotanipay.representativeNationality"
          ),
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
            },
            {
              name: "vendorRepresentativePowerOfAttorney",
              label: t(
                "privateSettings.representativeInformation.vendorRepresentativePowerOfAttorney"
              ),
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
              label: t(
                "privateSettings.representativeInformation.vendorRepresentativeShareholder"
              ),
              type: "checkbox",
              width: "md:w-1/2",
            },
          ],
        },
        {
          name: "vendorRepresentativeShares",
          label: tCrossborder(
            "withdraw.helpDeskKYC.kotanipay.representativeShare"
          ),
          type: "number",
          required: false,
        },
      ],
    },
    {
      type: "ui",
      content: (
        <div className="font-bold">
          {tCrossborder("withdraw.helpDeskKYC.kotanipay.documents")}
        </div>
      ),
    },
    {
      type: "ui",
      content: (
        <div className="h-4">
          {tCrossborder("withdraw.helpDeskKYC.kotanipay.documentInstructions")}
        </div>
      ),
    },
    {
      type: "array",
      name: "representativeDocs",
      label: tCrossborder("withdraw.helpDeskKYC.kotanipay.representativeDocs"),
      newLabel: tCrossborder("withdraw.helpDeskKYC.kotanipay.newDocument"),
      removeLabel: tCrossborder(
        "withdraw.helpDeskKYC.kotanipay.removeDocument"
      ),
      fields: [
        {
          name: "representativeDoc",
          label: tCrossborder(
            "withdraw.helpDeskKYC.kotanipay.representativeDoc"
          ),
          type: "file",
          required: true,
        },
      ],
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
      name: "registerDocuments",
      label: t("information.fields.documents.registerDocuments"),
      newLabel: t("information.fields.documents.registerDocuments_newLabel"),
      removeLabel: t(
        "information.fields.documents.registerDocuments_removeLabel"
      ),
      visible: (methods) => {
        return visibleDocuments["registerDocuments"].includes(
          methods.getValues("vendorLegalType")
        );
      },
      fields: [
        {
          name: "registerDocument",
          label: t("information.fields.documents.registerDocuments"),
          type: "file",
          required: (methods) => {
            return requiredDocuments["registerDocuments"].includes(
              methods.getValues("vendorLegalType")
            );
          },
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
      visible: (methods) => {
        return visibleDocuments["shareholderDocs"].includes(
          methods.getValues("vendorLegalType")
        );
      },
      fields: [
        {
          name: "shareholders",
          label: t("information.fields.documents.shareholderDocs"),
          type: "file",
          required: (methods) => {
            return requiredDocuments["shareholderDocs"].includes(
              methods.getValues("vendorLegalType")
            );
          },
        },
      ],
    },
    {
      type: "array",
      name: "statutes",
      label: t("information.fields.documents.statutes"),
      newLabel: t("information.fields.documents.statutes_newLabel"),
      removeLabel: t("information.fields.documents.statutes_removeLabel"),
      visible: (methods) => {
        return visibleDocuments["statutes"].includes(
          methods.getValues("vendorLegalType")
        );
      },
      fields: [
        {
          name: "statute",
          label: t("information.fields.documents.statutes"),
          type: "file",
          required: (methods) => {
            return requiredDocuments["statutes"].includes(
              methods.getValues("vendorLegalType")
            );
          },
        },
      ],
    },
    {
      type: "array",
      name: "miscellaneousDocs",
      label: t("information.fields.documents.miscellaneousDocs"),
      newLabel: t("information.fields.documents.miscellaneousDocs_newLabel"),
      removeLabel: t(
        "information.fields.documents.miscellaneousDocs_removeLabel"
      ),
      fields: [
        {
          name: "misc",
          label: t("information.fields.documents.miscellaneousDocs"),
          type: "file",
          required: false,
        },
        {
          name: "miscText",
          label: t("information.fields.documents.miscComment"),
          type: "textarea",
          required: false,
        },
      ],
    },
    {
      type: "ui",
      content: <div className="h-4"></div>,
    },
    {
      name: "acceptTerms",
      label: tCrossborder("withdraw.helpDeskKYC.kotanipay.acceptTermsLabel"),
      type: "custom",
      content: (methods) => {
        return (
          <AcceptTermsCheckbox
            methods={methods}
            partnerName={"KotaniPay"}
            partnerTerms={
              "https://docs.kotanipay.com/docs/terms-and-conditions"
            }
          />
        );
      },
    },
  ];

  return <FieldRenderer fields={ovexB2BKYCInfo} />;
}
