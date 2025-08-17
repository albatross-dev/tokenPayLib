import axios from "axios";
import { Transport, TransportConfig } from ".";
import { LogEntry, LogLevel } from "../reporter";
import { defaultFormatter, Formatter } from "../formatter";

export type AxiosTransportConfig = {
  endpoint: string;
} & TransportConfig;

export class AxiosTransport implements Transport {
  private readonly endpoint: string;

  private formatter: Formatter = defaultFormatter;

  private level: LogLevel = LogLevel.INFO;

  constructor({ endpoint, formatter }: AxiosTransportConfig) {
    this.endpoint = endpoint;

    if (formatter) {
      this.formatter = formatter;
    }
  }

  async sendLog(entrie: LogEntry) {
    // If the log level of this entrie is lower then the transports log level do nothing
    if (entrie.level < this.level) {
      return;
    }

    const formattedLog = this.formatter(entrie);

    try {
      await axios({
        method: "post",
        url: this.endpoint,
        data: formattedLog.log,
      });
    } catch (error) {
      // Just catch the error and do nothing
    }
  }
}

export function isAxiosTransportConfig(config: any): boolean {
  return typeof config.endpoint === "string";
}
