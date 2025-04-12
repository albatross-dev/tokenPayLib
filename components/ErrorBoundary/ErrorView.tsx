import Link from 'next/link'
import React from 'react'
import { MdOutlineError } from 'react-icons/md'

interface ErrorViewProps {
  hasError: boolean;
  backLink: string;
}

export default function ErrorView({ hasError, backLink }: ErrorViewProps) {
  return (
    <div className='w-screen h-screen flex justify-center items-center'>
      <div className='my-auto mx-auto p-4 border border-gray-200 rounded-lg flex flex-col items-center'>
        <h5 className='text-md text-center mb-4 flex flex-row items-center'>
          <MdOutlineError className='mr-2' />
          Ooops... Something went wrong
        </h5>
        <Link
          href={backLink}
          className='bg-uhuBlue text-white rounded-md px-4 py-2'
          onClick={() => (hasError = false)}
        >
          Go back
        </Link>
      </div>
    </div>
  )
}
