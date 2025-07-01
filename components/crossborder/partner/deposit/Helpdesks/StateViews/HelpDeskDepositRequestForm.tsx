import FieldRenderer from "@/tokenPayLib/components/Forms/FieldRenderer";
import { FormField } from "@/tokenPayLib/components/Forms/types";
import { TFunction, useTranslation } from "next-i18next";
import React, { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useActiveAccount } from "thirdweb/react";

interface HelpDeskRequestFormProps {
  error: string | null;
  handleStartTransaction: (value: HelpDeskDepositRequestFormData) => void;
}

export interface HelpDeskDepositRequestFormData {
  receivingWallet: string;
  textareaContent: string;
}

function getRequestFormFields(tCrossborder: TFunction) {
  return [
    {
      type: "ui",
      content: <div className="text-2xl font-bold">{tCrossborder("withdraw.helpdeskRequest.transactionDetails")}</div>,
    },
    {
      type: "text",
      name: "receivingWallet",
      label: tCrossborder("deposit.helpdeskRequest.receivingWallet"),
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

export default function HelpDeskDepositRequestForm({ error, handleStartTransaction }: HelpDeskRequestFormProps) {
  const { t: tCrossborder } = useTranslation("crossborder");

  const methods = useForm();
  const { handleSubmit } = methods;

  const account = useActiveAccount();

  const onSubmit = (data: HelpDeskDepositRequestFormData) => {
    handleStartTransaction(data);
  };

  useEffect(() => {
    if (account && account.address) {
      methods.setValue("receivingWallet", account.address);
    }
  }, [account]);

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
