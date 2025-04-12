import React from 'react';
import Loader from "../../../../UI/Loader";
import { LoadingProps } from './types';

export function Loading({}: LoadingProps) {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <Loader />
    </div>
  );
} 