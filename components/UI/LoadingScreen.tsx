import React from "react";
import Loader from "./Loader";

export default function LoadingScreen() {
  return (
    <div className="flex items-center justify-center h-full h-full">
      <Loader />
    </div>
  );
}