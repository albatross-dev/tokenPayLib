import React from "react";
import { Controller, UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";
import buildPopover from "../../../../../../../../UI/buildPopover";

interface AcceptTermsCheckboxProps {
  methods: UseFormReturn<any>;
  partnerTerms: string;
  partnerName: string;
}

export default function AcceptTermsCheckbox({ methods, partnerTerms, partnerName }: AcceptTermsCheckboxProps) {
  const { t: tCrossborder } = useTranslation("crossborder");

  const InformationPopover = buildPopover(
    () => (
      <div className="block bg-gray-100 rounded-full px-2 text-uhuBlue cursor-pointer">
        {tCrossborder("withdraw.helpDeskKYC.acceptTerms.infoPopoverTitle")}
      </div>
    ),
    () => (
      <div className="overflow-hidden flex items-center">
        <div className="flex flex-col justify-center items-center p-4">
          {tCrossborder("withdraw.helpDeskKYC.acceptTerms.infoPopoverContent")}
        </div>
      </div>
    )
  );

  return (
    <div className="">
      <label className="flex justify-end items-start border rounded p-2">
        <Controller
          name="acceptTerms"
          control={methods.control}
          defaultValue={false}
          rules={{ required: tCrossborder("withdraw.helpDeskKYC.acceptTerms.validationMessage") }}
          render={({ field }) => (
            <input
              type="checkbox"
              className="mr-2 mt-2"
              checked={field.value}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => field.onChange(e.target.checked)}
            />
          )}
        />
        <div className="text-gray-700">
          {tCrossborder("withdraw.helpDeskKYC.acceptTerms.termsIntro")}{" "}
          <a className="text-uhuBlue" target="_blank" href={partnerTerms}>
            {tCrossborder("withdraw.helpDeskKYC.acceptTerms.partnerTermsLabel", { partnerName })}{" "}
          </a>{" "}
          {tCrossborder("withdraw.helpDeskKYC.acceptTerms.termsAcceptance")}{" "}
          {tCrossborder("withdraw.helpDeskKYC.acceptTerms.dataShareIntro", { partnerName })}{" "}
          <a
            className="text-uhuBlue"
            target="_blank"
            href="https://usetokenpay.com/terms-and-conditions/"
          >
            {tCrossborder("withdraw.helpDeskKYC.acceptTerms.tokenPayTermsLabel")}
          </a>{" "}
          {tCrossborder("withdraw.helpDeskKYC.acceptTerms.paragraphReference")} <InformationPopover t={tCrossborder} />
        </div>
      </label>
      {methods.formState.errors.acceptTerms && (
        <div className="text-red-500 text-sm mt-1">
          {methods.formState.errors.acceptTerms.message as string}
        </div>
      )}
    </div>
  );
} 