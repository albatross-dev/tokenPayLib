import Loader from "@/tokenPayLib/components/UI/Loader";
import React from "react";

export default function VerificationInProgress() {
  return (
    <div className="flex flex-col items-center gap-8 justify-center ">
      <div className="py-1 px-2 font-bold">Ihre Anfrage wird bearbeitet.</div>
      <div className="max-w-xl">
        Wir melden uns bei Ihnen bei Ihrer hinterlegten E-Mail-Adresse. Bitte
        beachten Sie, dass die Bearbeitung ein bis zwei Werktage in Anspruch
        nehmen kann.
      </div>
      <Loader />
    </div>
  );
}
