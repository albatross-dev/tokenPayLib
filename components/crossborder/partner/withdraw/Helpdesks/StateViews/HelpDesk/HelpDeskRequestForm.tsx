import FieldRenderer from "@/tokenPayLib/components/Forms/FieldRenderer";
import { FormField } from "@/tokenPayLib/components/Forms/types";
import { TFunction, useTranslation } from "next-i18next";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";

export interface HelpDeskWithdrawRequestFormData {
  receiverName: string;
  receiverIban: string;
  receiverBank: string;
  textareaContent: string;
}

interface HelpDeskRequestFormProps {
  error: string | null;
  handleStartTransaction: (value: HelpDeskWithdrawRequestFormData) => void;
}

function getRequestFormFields(tCrossborder: TFunction) {
  return [
    {
      type: "ui",
      content: <div className="text-2xl font-bold">{tCrossborder("withdraw.helpdeskRequest.transactionDetails")}</div>,
    },
    {
      type: "text",
      name: "receiverName",
      label: tCrossborder("withdraw.helpdeskRequest.receiver"),
      required: true,
    },
    {
      type: "text",
      name: "receiverIban",
      label: tCrossborder("withdraw.helpdeskRequest.iban"),
      required: true,
    },
    {
      type: "text",
      name: "receiverBank",
      label: tCrossborder("withdraw.helpdeskRequest.bank"),
      required: true,
    },
    {
      type: "textarea",
      name: "textareaContent",
      label: tCrossborder("withdraw.helpdeskRequest.transactionDetails"),
      placeholder: tCrossborder("withdraw.helpdeskRequest.placeholderDetails"),
    },
  ];
}

export default function HelpDeskRequestForm({ error, handleStartTransaction }: HelpDeskRequestFormProps) {
  const { t: tCrossborder } = useTranslation("crossborder");

  const methods = useForm<HelpDeskWithdrawRequestFormData>();
  const { handleSubmit } = methods;

  const onSubmit = (data: HelpDeskWithdrawRequestFormData) => {
    handleStartTransaction(data);
  };

  return (
    <div className="flex flex-col gap-4">
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FieldRenderer fields={getRequestFormFields(tCrossborder)} />

          {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
          <button
            type="submit"
            className="bg-uhuBlue text-white py-2 px-4 rounded font-bold hover:bg-uhuBlue-dark mt-4"
          >
            {tCrossborder("withdraw.helpdeskRequest.sendRequest")}
          </button>
        </form>
      </FormProvider>
    </div>
  );
}
