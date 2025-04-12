import React from 'react';
import { LoadingProps } from './types';
import Loader from '../../../../../UI/Loader';

export function Loading({}: LoadingProps) {
  return (
    <div className="w-full h-full flex items-center justify-center mt-16">
      <Loader />
    </div>
  );
} 