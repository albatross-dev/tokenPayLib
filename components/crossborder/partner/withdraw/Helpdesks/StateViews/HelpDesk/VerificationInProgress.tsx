import { useTranslation } from "next-i18next";
import React from "react";

import Loader from "../../../../../../UI/Loader";

export default function VerificationInProgress() {
  const { t: tCrossborder } = useTranslation("crossborder");

  return (
    <div className="flex flex-col items-center gap-8 justify-center ">
      <div className="py-1 px-2 font-bold">
        {tCrossborder("withdraw.otcStates.requestFeedbackHeader")}
      </div>
      <div className="max-w-xl">
        {tCrossborder("withdraw.otcStates.requestFeedbackText")}
      </div>
      <Loader />
    </div>
  );
}
