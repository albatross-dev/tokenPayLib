import React from 'react';
import { FaTools } from 'react-icons/fa';

const Maintenance = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full bg-gray-200/70 backdrop-blur-sm absolute top-0 left-0 z-[80]">
      <FaTools className="w-8 h-8 text-gray-800" />
    </div>
  );
};

export default Maintenance;
