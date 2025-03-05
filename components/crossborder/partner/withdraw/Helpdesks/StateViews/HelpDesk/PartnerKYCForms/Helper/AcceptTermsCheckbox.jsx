import buildPopover from "@/tokenPayLib/components/UI/buildPopover";
import React from "react";
import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";

export default function AcceptTermsCheckbox({ methods, partnerTerms, partnerName }) {
  const { t } = useTranslation("common");

  const InformationPopover = buildPopover(
    ()=>(<div className="block bg-gray-100 rounded-full px-2 text-uhuBlue cursor-pointer">Welche Informationen werden geteilt?</div>),
    ()=>(<div className="overflow-hidden flex items-center">
      <div className="flex flex-col justify-center items-center p-4">
        Die geteilten Informationen umfassen insbesondere, aber nicht
        ausschließlich, die schriftliche Kommunikation mit TokenPay
        einschließlich geteilter Dateien, sowie die E-Mail-Adresse,
        Sprachpräferenzen, Telefonnummern, eigene Webseiten, den Grund der
        Nutzung von TokenPay, Wallet-Adressen und Kontoverbindungen,
        Unternehmensnamen, Rechtsform, Branche, Steuernummern und
        Handelsregisternummern, Gründungsdatum, Umsatz- und Gewinnschätzungen,
        Hintergrundinformationen zur Mittelherkunft und dem Geschäftsmodell,
        Unternehmensadressen, Informationen zu Unternehmensrepräsentanten (unter
        diese Einordnung fallen Geschäftsführung, Zeichnungsberechtigte,
        Kontovertreter und ultimativ wirtschaftlich berechtigte; Name,
        E-Mail-Adresse, Telefonnummer, Geburtsdatum und -Ort, Rolle und
        Berechtigung im Unternehmen, Ablauf- und Ausstellungsdatum des
        bereitgestellten Ausweisdokuments sowie Nummern und Fotos dessen,
        Geschlecht, Nationalität, Wohnadresse, verwendete IP-Adressen sowie
        Ergebnisse von Sanktions- und PEP-Screenings), Handelsregisterauszüge,
        Satzungen, Gesellschafterlisten, Transparenzregisterauszüge, Stammdaten
        der wirtschaftlich Berechtigten, weitere freiwillig übermittelte oder
        angefragte Dokumente sowie sämtliche aus den vorausgehenden
        Informationen abgeleitete interne Bewertungen und Risikoeinordnungen.
      </div>
    </div>)
  );

  return (
    <div className="">
      <label className="flex justify-end items-start border rounded p-2">
        <Controller
          name="acceptTerms"
          control={methods.control}
          defaultValue={false}
          rules={{ required: "Bitte bestätigen Sie die Nutzungsbedingungen" }}
          render={({ field }) => (
            <input
              type="checkbox"
              className="mr-2 mt-2"
              checked={field.value}
              onChange={(e) => field.onChange(e.target.checked)}
            />
          )}
        />
        <div className="text-gray-700">
          Ich habe die <a className="text-uhuBlue" target="_blank" href={partnerTerms}>Allgemeinen Geschäftsbedingungen des TokenPay-Partners
          {partnerName} </a> gelesen und verstanden und akzeptiere diese. Ich stimme
          dem Teilen der bereitgestellten Informationen mit dem TokenPay-Partner
          {partnerName} gemäß der <a className="text-uhuBlue" target="_blank" href="https://usetokenpay.com/terms-and-conditions/">Allgemeinen Geschäftsbedingungen von TokenPay</a>
          - insbesondere Paragraf 3, Absatz 1 und 3, sowie Paragraf 11, Absatz
          10 - ausdrücklich zu. <InformationPopover />
        </div>
      </label>
      {methods.formState.errors.acceptTerms && (
        <div className="text-red-500 text-sm mt-1">
          {methods.formState.errors.acceptTerms.message}
        </div>
      )}
    </div>
  );
}
