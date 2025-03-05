import FieldRenderer from "@/tokenPayLib/components/Forms/FieldRenderer";
import React, { useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";
import AcceptTermsCheckbox from "./Helper/AcceptTermsCheckbox";
import { AuthContext } from "@/context/UserContext";
import preprocessDataForHelpDesk from "./Helper/processAndSerValues";

let formDataPreloaded = false;

export default function BitcoinVNHelpDeskKYCForm({setValue, methods}) {
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
      type: "ui",
      content: <div className="font-bold">Bitte fügen Sie an: Bild der Hauptseite des Reisepasses eines Geschäftsführers sowie ein Selfie des Geschäftsführers mit einem handgeschriebenen Blatt Papier, auf dem die Reisepass-Nummer und das heutige Datum stehen.</div>,
    },
    {
      type: "array",
      name: "bitcoinVNDocs",
      label: "Dokumente des Vertreters",
      newLabel: "Neues Dokument hinzufügen",
      removeLabel: "Dokument entfernen",
      fields: [
        {
          name: "bitcoinVNDoc",
          label: "Dokument des Vertreters",
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
      label: "Nutzungsbedingungen akzeptieren",
      type: "custom",
      content: (methods) => {
        return (
          <AcceptTermsCheckbox
            methods={methods}
            partnerName={"BitcoinVN"}
            partnerTerms={
              "https://support.bitcoinvn.io/help/en-us/3-general/8-terms-of-service"
            }
          />
        );
      },
    },
  ];

  return <FieldRenderer fields={ovexB2BKYCInfo} methods={methods} />;
}
