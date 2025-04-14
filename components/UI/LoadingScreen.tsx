import Loader from "./Loader";
import React from "react";

export default function LoadingScreen() {
  return (
    <div className="flex items-center justify-center h-full h-full">
      <Loader />
    </div>
  );
}