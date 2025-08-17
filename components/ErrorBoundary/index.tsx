import React from "react";
import ErrorView from "./ErrorView";

interface ErrorReporter {
  exception: (
    message: string,
    errorInfo: React.ErrorInfo,
    error: Error
  ) => void;
}

interface ErrorBoundaryProps {
  clientReporter: ErrorReporter;
  serverReporter: ErrorReporter;
  backLink: string;
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export default class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  private clientReporter: ErrorReporter;

  private serverReporter: ErrorReporter;

  private backLink: string;

  constructor(props: ErrorBoundaryProps) {
    super(props);

    const { clientReporter, serverReporter, backLink } = props;

    this.state = { hasError: false };
    this.clientReporter = clientReporter;
    this.serverReporter = serverReporter;
    this.backLink = backLink;
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
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

  render(): React.ReactNode {
    if (this.state.hasError) {
      return (
        <ErrorView hasError={this.state.hasError} backLink={this.backLink} />
      );
    }

    return this.props.children;
  }
}
