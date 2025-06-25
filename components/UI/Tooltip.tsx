import React, { useState } from "react";
import { BsFillQuestionCircleFill } from "react-icons/bs";

const Tooltip = ({ text }: { text: string }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="relative flex items-center">
      <span
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className="cursor-help ml-1"
      >
        <BsFillQuestionCircleFill className="h-4 w-4 text-gray-700"></BsFillQuestionCircleFill>
      </span>
      {showTooltip && (
        <div className="absolute bottom-full mb-1 left-1/2 transform -translate-x-1/2 px-2 py-1 text-sm text-white bg-black rounded-md shadow-lg">
          {text}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
