import Link from "next/link";
import { MdOutlineError } from "react-icons/md";

import React from "react";

export default class ErrorBoundary extends React.Component {
  constructor({ clientReporter, serverReporter, ...props }) {
    super(props);
    this.state = { hasError: false };
    this.clientReporter = clientReporter;
    this.serverReporter = serverReporter;
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.log(error, errorInfo);
    if (typeof window !== "undefined") {
      this.clientReporter.exception(
        "An unhandeled Error occured",
        errorInfo,
        error
      );
    } else {
      this.serverReporter.exception(
        "An unhandeled Error occured",
        errorInfo,
        error
      );
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className='w-screen h-screen flex justify-center items-center'>
          <div className='my-auto mx-auto p-4 border border-gray-200 rounded-lg flex flex-col items-center'>
            <h2 className='text-red-500 text-md text-center mb-4 flex flex-row'>
              <MdOutlineError className='mr-2' />
              Ooops... Something went wrong!
            </h2>
            <Link
              href='/dashboard'
              className='bg-uhuBlue text-white rounded-md px-4 py-2'
              onClick={() => (this.state.hasError = false)}
            >
              Go back
            </Link>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
