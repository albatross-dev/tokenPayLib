import React, { useState, useEffect } from "react";
import { IoCheckmarkSharp } from "react-icons/io5";

export interface Step {
  value: string;
  label: string;
}

interface StepSidebarProps {
  steps: Step[];
  currentStep: string;
  completedSteps: string[];
  currentUserStep: string;
}

const StepSidebar: React.FC<StepSidebarProps> = ({
  steps,
  currentStep,
  completedSteps,
  currentUserStep,
}) => {
  // Use state to track if we're on the client side
  const [isClient, setIsClient] = useState(false);

  // Set isClient to true once component mounts on client
  useEffect(() => {
    setIsClient(true);
  }, []);

  // If not on client yet, render a placeholder with the same structure
  // but without the dynamic content to avoid hydration mismatch
  if (!isClient) {
    return (
      <div className="lg:min-w-xl lg:shadow rounded-lg lg:p-4 mb-4 lg:mb-0 lg:bg-white">
        <h2 className="text-xl font-bold mb-4 hidden lg:block">Schritte</h2>
        <ul className="flex lg:block justify-center space-x-2 lg:space-x-0 lg:space-y-2">
          {steps.map((_, index) => (
            <li
              key={index}
              className="p-1 rounded-full bg-gray-100 transition transition-all duration-200 flex items-center justify-center md:justify-start"
            >
              <span className="lg:inline-flex flex w-8 h-8 items-center justify-center bg-white text-uhuBlue rounded-full">
                {index + 1}.
              </span>
              <span className="hidden lg:inline pl-2 w-52">Loading...</span>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  // Client-side rendering with full content
  return (
    <div className="lg:min-w-xl lg:shadow rounded-lg lg:p-4 mb-4 lg:mb-0 lg:bg-white">
      <h2 className="text-xl font-bold mb-4 hidden lg:block">Schritte</h2>
      <ul className="flex lg:block justify-center space-x-2 lg:space-x-0 lg:space-y-2">
        {steps.map((step, index) => {
          const isCompleted = completedSteps.includes(step.value);
          const isCurrent = currentStep === step.value;
          const isUserStep = currentUserStep === step.value;

          return (
            <li
              key={index}
              className={`
                p-1 rounded-full bg-gray-100 transition transition-all duration-200 
                flex items-center justify-center md:justify-start
                ${isCurrent ? "bg-uhuBlue text-white font-bold shadow-xl" : ""}
                ${!isCompleted && !isCurrent ? "text-gray-700" : ""}
                ${isUserStep ? "border-uhuBlue border" : ""}
              `}
            >
              {isCompleted ? (
                <div className="lg:inline-flex flex w-8 h-8 items-center justify-center bg-uhuBlue rounded-full">
                  <IoCheckmarkSharp className="w-6 h-6 text-white" />
                </div>
              ) : (
                <span className="lg:inline-flex flex w-8 h-8 items-center justify-center bg-white text-uhuBlue rounded-full">
                  {index + 1}.
                </span>
              )}
              <span className="hidden lg:inline pl-2 w-52">{step.label}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default StepSidebar;
