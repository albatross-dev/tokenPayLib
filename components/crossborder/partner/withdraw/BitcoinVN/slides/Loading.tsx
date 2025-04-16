import React from "react";
import Loader from "../../../../../UI/Loader";

export default function Loading() {
  return (
    <div className="w-full h-full flex items-center justify-center my-16">
      <Loader />
    </div>
  );
}
