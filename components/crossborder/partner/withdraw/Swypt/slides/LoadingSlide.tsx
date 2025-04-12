import React from "react";
import Loader from "../../../../../UI/Loader";

export const LoadingSlide: React.FC = () => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <Loader />
    </div>
  );
}; 