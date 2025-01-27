import { LogEntry, LogLevel } from "../reporter";
import { Formatter } from "../formatter";

export type TransportConfig = {
  level?: LogLevel;
  formatter?: Formatter;
};

export interface Transport {
  sendLog: (entrie: LogEntry) => Promise<void>;
}

import {
  TelegramTransport,
  TelegramTransportConfig,
} from "./telegramTransport";
import { AxiosTransport, AxiosTransportConfig } from "./axiosTransport";
import { ConsoleTransport, ConsoleTransportConfig } from "./consoleTransport";

export {
  TelegramTransport,
  TelegramTransportConfig,
  AxiosTransport,
  AxiosTransportConfig,
  ConsoleTransport,
  ConsoleTransportConfig,
};

export type ClientTransports = AxiosTransport | ConsoleTransport;

export type ServerTransports = ClientTransports | TelegramTransport;
