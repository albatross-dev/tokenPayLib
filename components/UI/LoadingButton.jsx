import { HiQuestionMarkCircle, HiLockClosed, HiCheck } from "react-icons/hi2";
import React from "react";

const LoadingButton = ({
  isLoading,
  onClick,
  children,
  openError,
  active = true,
}) => {
  let buttonStyles =
    "bw-full h-10 flex space-x-2 justify-between items-center px-4 py-3 border border-transparent w-full md:w-auto text-sm font-medium rounded shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2 ";
  let buttonContent = children;

  if (isLoading === "processing") {
    buttonStyles += "bg-uhuBlue opacity-50 cursor-not-allowed";
    buttonContent = (
      <>
        <div className="w-7"></div>
        {children}
        <svg
          className="animate-spin h-5 w-5 text-white ml-2"
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
      </>
    );
  } else if (isLoading === "error") {
    buttonStyles += "bg-red-500 hover:bg-red-600 focus:ring-red-500";
    buttonContent = (
      <>
        <div className="w-7"></div>
        {children}
        {typeof openError === "function" && (
          <HiQuestionMarkCircle
            onClick={(e) => {
              e.stopPropagation();
              openError();
            }}
            className="h-5 w-5 text-white ml-2"
          />
        )}
      </>
    );
  } else {
    buttonStyles += " bg-uhuBlue hover:bg-uhuBlue focus:ring-uhuBlue";
    buttonContent = (
      <>
        <div></div>
        {children}
      </>
    );
  }

  if (!active) {
    buttonStyles += " opacity-50 cursor-not-allowed";
    buttonContent = <>{children}</>;
  }

  return (
    <button
      onClick={active ? onClick : undefined}
      disabled={!active || isLoading === "processing"}
      className={buttonStyles}
    >
      {buttonContent}
      {isLoading === "success" ? (
        <HiCheck className="h-5 w-5 text-white ml-2" />
      ):(isLoading !== "processing" && isLoading !== "error" ? (
        active ? (
          <div></div>
        ) : (
          <HiLockClosed className="h-5 w-5 text-white ml-2" />
        )
      ) : (
        <></>
      ))}
      {}
    </button>
  );
};

export default LoadingButton;
