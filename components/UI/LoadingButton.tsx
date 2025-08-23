import { HiQuestionMarkCircle, HiLockClosed, HiCheck } from "react-icons/hi2";
import React from "react";
import clsx from "clsx";
import showErrorPopup, { ErrorDetails } from "../Modals/ErrorPrompt";

export type LoadingButtonStates = "processing" | "error" | "success" | "normal";

export type LoadingButtonError = {
  message: string;
  title: string;
  error: ErrorDetails;
};

interface LoadingButtonProps {
  isLoading: LoadingButtonStates;
  onClick?: () => void;
  children: React.ReactNode;
  openError?: () => void;
  active?: boolean;
  error?: LoadingButtonError | null;
  fullWidth?: boolean;
  showSuccessColor?: boolean;
}

const LoadingButton: React.FC<LoadingButtonProps> = ({
  isLoading,
  onClick,
  children,
  openError,
  active = true,
  error,
  fullWidth = false,
  showSuccessColor = false,
}) => {
  const buttonStyles = clsx(
    "h-10 flex space-x-2 justify-between items-center px-4 py-3 border border-transparent text-sm font-medium rounded shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2 relative",
    {
      "w-full": fullWidth,
      "w-full md:w-auto": !fullWidth,
      "bg-uhuBlue opacity-50 cursor-not-allowed": isLoading === "processing",
      "bg-red-500 hover:bg-red-600 focus:ring-red-500": isLoading === "error",
      "bg-green-500 hover:bg-green-600 focus:ring-green-500":
        isLoading === "success" && showSuccessColor,
      "bg-uhuBlue hover:bg-uhuBlue focus:ring-uhuBlue":
        isLoading !== "processing" &&
        isLoading !== "error" &&
        !(isLoading === "success" && showSuccessColor),
      "opacity-50 cursor-not-allowed": !active,
    }
  );

  const contentStyles = clsx("flex items-center", {
    "w-full justify-center": fullWidth,
    "justify-between": !fullWidth,
  });

  let buttonContent: React.ReactNode = children;

  if (isLoading === "processing") {
    buttonContent = (
      <div className={contentStyles}>
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
           />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
           />
        </svg>
      </div>
    );
  } else if (isLoading === "error") {
    buttonContent = (
      <div className={contentStyles}>
        {children}
        {error && (
          <HiQuestionMarkCircle
            onClick={(e: React.MouseEvent) => {
              e.stopPropagation();
              showErrorPopup({
                titleKey: error.title,
                messageKeyOrText: error.message,
                details: {
                  error: {
                    ...error.error,
                    message: error.error.message ?? undefined,
                  },
                },
              });
            }}
            className="h-5 w-5 text-white ml-2"
          />
        )}
        {typeof openError === "function" && (
          <HiQuestionMarkCircle
            onClick={(e: React.MouseEvent) => {
              e.stopPropagation();
              openError();
            }}
            className="h-5 w-5 text-white ml-2"
          />
        )}
      </div>
    );
  } else {
    buttonContent = <div className={contentStyles}>{children}</div>;
  }

  if (!active) {
    buttonContent = <div className={contentStyles}>{children}</div>;
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
      ) : isLoading !== "processing" && isLoading !== "error" ? (
        active ? (
          <div />
        ) : (
          <HiLockClosed className="h-5 w-5 text-white ml-2" />
        )
      ) : (
        <></>
      )}
    </button>
  );
};

export default LoadingButton;
