import React from "react";
import ErrorView from "./ErrorView";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
  
    const { clientReporter, serverReporter, backLink } = props; 
  
    this.state = { hasError: false };
    this.clientReporter = clientReporter;
    this.serverReporter = serverReporter;
    this.backLink = backLink;
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
        <ErrorView hasError={this.state.hasError} backLink={this.backLink} />
      );
    }

    return this.props.children;
  }
}
