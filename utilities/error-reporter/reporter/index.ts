import { Transport } from "../transport";
import { ConsoleTransport } from "../transport/consoleTransport";
import knownErrors from "./knownErrors";

export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
}

export const LogLevelStrings: Map<LogLevel, string> = new Map([
  [LogLevel.DEBUG, "Debug"],
  [LogLevel.INFO, "Info"],
  [LogLevel.WARN, "Warn"],
  [LogLevel.ERROR, "Error"],
]);

export type LogEntry = {
  timestamp: string;
  loggerName: string;
  level: LogLevel;
  message: string;
  data?: unknown;
  email?: string;
  userInformation?: any;
};

export type ReporterConfig<TTransport extends Transport = Transport> = {
  /**
   * If set to true the "onerror" and "onunhandledrejection" events of the browser
   *  will be handled with exception logs by this logger
   */
  captureGlobalErrors?: boolean;

  /**
   * If set to true static information about the users browser will stored and send with every log.
   */
  captureUserInformation?: boolean;

  /**
   * The log level of the reporter. Only logs with a log level higher or equal to
   *  reporters log level will get logged.
   */
  level?: LogLevel;

  /**
   * A list of Transports that will be used by the reporter to log messages.
   */
  transports?: TTransport[];

  /**
   * The name of the reporter.
   */
  name: string;
};

export class Reporter {
  // The singleton instance of the Reporter, used to avoid multiple initialisations
  /** A singleton instance of the reporter */
  private static instance: Reporter;

  /** A list of transports that this reporter uses to log messages */
  private readonly transports: Transport[] = [];

  /** The minimum log level of this reporter */
  private readonly level: LogLevel = LogLevel.INFO;

  // name will definitely be defined since if a instance exists this instance has to have a name
  /** The name of the reporter */
  private readonly name!: string;

  /** A json string holding static browser data (only available in the browser) */
  private userInformation?: string;

  /**
   * Can take a Client- or a ServerConfig.
   *
   * @param config A ReporterConfig object
   */
  constructor({
    name,
    transports,
    level,
    captureGlobalErrors = false,
    captureUserInformation = false,
  }: ReporterConfig) {
    // Singleton to ensure the Reporter is only created once
    if (Reporter.instance) {
      return Reporter.instance;
    }

    // Asign name
    this.name = name;

    // If transports are given use the given transports, else use the default transport
    if (transports) {
      this.transports = transports;
    } else {
      this.transports.push(new ConsoleTransport({}));
    }

    // Set the log level of this reporter
    if (level) {
      this.level = level;
    }

    // Attach event handlers for global errors
    if (captureGlobalErrors) {
      this.setupGlobalErrorHandler();
    }

    if (captureUserInformation) {
      this.captureUserInformation();
    }

    // Safe singleton instance
    Reporter.instance = this;
  }

  /**
   * Retrieves information about the users browsers and stores them in this class as an serialized string.
   * Can only be run in the browser.
   */
  private captureUserInformation() {
    if (typeof window !== "undefined" && typeof navigator !== "undefined") {
      this.userInformation = this.stringifyData({
        online: navigator.onLine,
        userAgent: navigator.userAgent,
        languages: navigator.languages,
        touchscreen: navigator.maxTouchPoints === 0,
        storage: navigator.storage.estimate(),
      });
    }
  }

  /**
   * Registers a handler for "onerror" and "onunhandledrejection" events to log them with this logger.
   * Can only be run in the browser.
   */
  private setupGlobalErrorHandler() {
    // Create onerror handler to log uncaught exceptions, but only if no such handler exists.
    if (typeof window !== "undefined" && !window.onerror) {
      window.onerror = (errorMsg, url, lineNumber, column, errorObj) => {
        this.exception(
          "An unhandeld error occured",
          { url, lineNumber, column },
          errorObj
        );

        return false;
      };
    }

    // Deal with unhandled exceptions thrown in promises
    if (typeof window !== "undefined" && !(<any>window).onunhandledrejection) {
      (<any>window).onunhandledrejection = (event: PromiseRejectionEvent) => {
        console.log("window.onunhandledrejection catched");

        this.exception(
          `An unhandeld rejection occured`,
          undefined,
          event.reason
        );

        return false;
      };
    }
  }

  /**
   * Logs a message with the given log level.
   * If an exception is provided it will be converted into a sendable and serializable object and
   *  will be send together with the provided data.
   * Serializes the given data and exception into a merged json string.
   *
   * @param level The log level of the log.
   * @param message Log message as a string.
   * @param data An optional object that can hold additional information for the log.
   * @param exception An optional error or exception.
   */
  public log(level: LogLevel, message: string, data?: any, exception?: any, email?: string) {
    // If the given log level is lower then the set level do nothing
    if (level < this.level) {
      return;
    }

    // Serialize Exceptions and the data
    let excObject;
    if (exception) {
      excObject = this.buildExceptionObject(exception);
      excObject.logData = this.stringifyDataFunction(data);
    } else {
      excObject = data;
    }

    let compositeMessage = this.stringifyData(excObject);

    // Create the log entry to be send
    const logEntry = {
      timestamp: new Date().toISOString(), // Create timestamp of the log
      loggerName: this.name,
      level,
      message,
      data: compositeMessage,
      email: email,
      userInformation: this.userInformation ? this.userInformation : undefined,
    };

    // Put the log entry in all transports of this reporter
    for (const transport of this.transports) {
      transport.sendLog(logEntry);
    }
  }

  /**
   * Logs a message with log level error.
   * Converts the exception into an sendable and serializable object and sends
   *  it together with provided data.
   *
   * @param message Log message as a string
   * @param data An optional object that can hold additional information for the log
   * @param exception An optional error or exception
   */
  public exception(message: string, data: any, exception: any, email?: string) {

    // check if error is known and if so do not log it
    for(const knownError of knownErrors) {
      if(exception?.name === knownError?.name && exception?.message === knownError?.message) {
        console.log("ommited known error",exception.name ,exception.message);
        return;
      }
    }

    this.log(LogLevel.ERROR, message, data, exception, email);
  }

  /**
   * Logs a message with log level error
   *
   * @param message Log message as a string
   * @param data An optional object that can hold additional information for the log
   */
  public error(message: string, data: any, email?: string) {
    this.log(LogLevel.ERROR, message, data, undefined, email);
  }

  /**
   * Logs a message with log level warn
   *
   * @param message Log message as a string
   * @param data An optional object that can hold additional information for the log
   */
  public warn(message: string, data: any, email?: string) {
    this.log(LogLevel.WARN, message, data, undefined, email);
  }

  /**
   * Logs a message with log level info
   *
   * @param message Log message as a string
   * @param data An optional object that can hold additional information for the log
   */
  public info(message: string, data: any, email?: string) {
    this.log(LogLevel.INFO, message, data, undefined, email);
  }

  /**
   * Logs a message with log level debug
   *
   * @param message Log message as a string
   * @param data An optional object that can hold additional information for the log
   */
  public debug(message: string, data: any, email?: string) {
    this.log(LogLevel.DEBUG, message, data, undefined, email);
  }

  /**
   * Forwards the given entry to all transports of this reporter.
   * Can be used to forward client messages that where received on the server.
   *
   * @param entry The log entry to be forwarded
   * @returns void
   */
  public forward(entry: LogEntry) {
    // If the log level of the entry is lower then this reporters log level do nothing
    if (entry.level < this.level) {
      return;
    }

    // Write the entry to all transports
    for (const transport of this.transports) {
      transport.sendLog(entry);
    }
  }

    /**
   * Forwards the given entry to all transports of this reporter async.
   * Can be used to forward client messages that where received on the server.
   *
   * @param entry The log entry to be forwarded
   * @returns void
   */
    public async asyncForward(entry: LogEntry) {
      // If the log level of the entry is lower then this reporters log level do nothing
      if (entry.level < this.level) {
        return;
      }
  
      // Write the entry to all transports
      for (const transport of this.transports) {
        await transport.sendLog(entry);
      }
    }

  /**
   * Extracts the stack, message, name, data, and inner errors of the given error into an
   *  serializable object.
   *
   * @param e An error or exception.
   * @returns An object that can be serialized and holds all information contained in the error.
   */
  private buildExceptionObject(e: any): any {
    const exceptionObject: any = {};

    if (e.stack) {
      exceptionObject.stack = e.stack;
    } else {
      exceptionObject.e = e;
    }
    if (e.message) {
      exceptionObject.message = e.message;
    }
    if (e.name) {
      exceptionObject.name = e.name;
    }
    if (e.data) {
      exceptionObject.data = e.data;
    }
    if (e.inner) {
      exceptionObject.inner = this.buildExceptionObject(e.inner);
    }

    return exceptionObject;
  }

  /**
   * Ensures that the returned value is not of type "function".
   *
   * @param data The data should be checked.
   * @returns If data was a function the return value of data. If data is not a "function" and not a regex data itself or a string of data.
   */
  private stringifyDataFunction(data: any) {
    if (typeof data === "function") {
      if (data instanceof RegExp) {
        return data.toString();
      } else {
        return data();
      }
    }

    return data;
  }

  /**
   * Converts all fields of the given data into strings and avoids [object Object] elements.
   *
   * @param data The data to be stringified.
   * @return The stringified data.
   */
  private stringifyData(data: any): string {
    let actualData = this.stringifyDataFunction(data);

    switch (typeof actualData) {
      case "string":
        return actualData;
      case "number":
      case "bigint":
      case "boolean":
        return actualData.toString();
      case "undefined":
        return "undefined";
      case "object":
        if (
          actualData instanceof RegExp ||
          actualData instanceof String ||
          actualData instanceof Number ||
          actualData instanceof Boolean
        ) {
          return actualData.toString();
        } else {
          return JSON.stringify(actualData);
        }
      default:
        return "unknown";
    }
  }
}
