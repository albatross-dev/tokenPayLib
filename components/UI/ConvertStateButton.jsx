import React from "react";
import { BiRightArrowAlt } from "react-icons/bi";
import { FiAlertCircle } from "react-icons/fi";
import EUROE_Logo from "@/tokenPayLib/assets/payment-icons/polygon/euroe.png";
import Image from "next/image";

export default function ConvertStateButton({ onClick, state, children }) {
  return (
    <button
      className="text-xs text-gray-700 flex flex-row items-center gap-2 bg-gray-100 rounded-full p-1"
      onClick={(e)=>{
        if (state !== "processing") {
          onClick(e);
        }
      }}
    >
      <BiRightArrowAlt className="w-6 h-6"></BiRightArrowAlt>
      {state === "processing" ? (
        <svg
          className="animate-spin h-6 w-6 text-black"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          ></path>
        </svg>
      ) : state === "error" ? (
        <FiAlertCircle className="w-6 h-6 text-red-600"></FiAlertCircle>
      ) : (
        children
      )}
    </button>
  );
}


export function ConvertStateButtonWide({ enabled, onClick, state, children }) {
  return (
    <button
      className={`text-xs text-white ${enabled?"bg-blue-700":"bg-blue-300"} flex flex-row font-bold items-center pr-2 py-2 gap-2  rounded-full pl-4`}
      disabled={state === "processing" || !enabled}
      onClick={()=>{
        if (state !== "processing" && enabled) {
          onClick();
        }
      }}
    >
      {children}
    
      {state === "processing" ? (
        <svg
          className="animate-spin h-6 w-6"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          ></path>
        </svg>
      ) : state === "error" ? (
        <FiAlertCircle className="w-6 h-6 text-red-600"></FiAlertCircle>
      ) : (
        <BiRightArrowAlt className="w-6 h-6"></BiRightArrowAlt>
      )}
    </button>
  );
}
