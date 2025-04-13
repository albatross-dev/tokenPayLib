import { FiCopy, FiCheck } from "react-icons/fi";
import React, { useState } from "react";

interface AddressDisplayProps {
  value: string;
  concat?: boolean;
  concatVal?: number;
  className?: string;
}

export default function AddressDisplay({
  value,
  concat = true,
  concatVal = 6,
  className = "flex items-center justify-center bg-gray-100 rounded",
}: AddressDisplayProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (value) {
      navigator.clipboard.writeText(value).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 5000);
      });
    }
  };

  // Function to format the address
  const formatValue = (value: string): string => {
    if(!concat) return value;
    if (value && value.length > 8) {
      return `${value.slice(0, concatVal)}...${value.slice(-concatVal)}`;
    }
    return value;
  };

  return (
    <p className={`${className} text-sm  text-gray-900 py-1 font-mono pl-3`}>
      {formatValue(value)}
      <button onClick={handleCopy} className=" rounded-full pr-2 pl-2">
        {copied ? <FiCheck size={16} /> : <FiCopy size={16} />}
      </button>
    </p>
  );
}
