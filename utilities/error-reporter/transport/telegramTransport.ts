import axios from "axios";
import { LogEntry, LogLevel } from "../reporter";
import { defaultFormatter, Formatter } from "../formatter";
import { Transport, TransportConfig } from ".";

export type TelegramParseMode = "MakrdownV2" | "HTML";

export type TelegramTransportConfig = {
  botToken: string;
  chatId: string;
  parseMode?: TelegramParseMode;
} & TransportConfig;

const MAX_MESSAGE_LENGTH: number = 4096;

export class TelegramTransport implements Transport {
  private botToken: string;
  private chatId: string;
  private parseMode?: TelegramParseMode;
  private formatter: Formatter = defaultFormatter;
  private level: LogLevel = LogLevel.INFO;

  constructor({
    botToken,
    chatId,
    parseMode,
    formatter,
    level,
  }: TelegramTransportConfig) {
    this.botToken = botToken;
    this.chatId = chatId;

    if (formatter) {
      this.formatter = formatter;
    }

    if (level) {
      this.level = level;
    }

    if (parseMode) {
      this.parseMode = parseMode;
    }
  }

  async sendLog(entrie: LogEntry) {
    // If the log level of this entrie is lower then the transports log level do nothing
    if (entrie.level < this.level) {
      return;
    }

    const formattedLogs = this.formatter(entrie).log;

    for (const log of formattedLogs) {
      try {
        const response = await axios({
          method: "post",
          url: `https://api.telegram.org/bot${this.botToken}/sendMessage`,
          data: {
            chat_id: this.chatId,
            text: log,
            parse_mode: this.parseMode,
          },
        });

        console.log("response", response);

        if (response.status !== 200) {
          console.error(
            "Failed to send message with Http Status: ",
            response.status,
            " ",
            response.statusText
          );
          continue;
        }

        const data = response.data;

        if (data.ok !== true) {
          console.error(
            "Failed to send message with Telegram Error: ",
            data.description
          );
          continue;
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error(
            "Failed to send message with Axios Error: ",
            error.response?.data || error.message
          );

          console.log("Error response: ", error.response);
        } else {
          console.error(
            "Failed to send message with Unexpected Error: ",
            error
          );
        }
      }
    }
  }
}

export function isTelegramTransportConfig(config: any): boolean {
  return (
    typeof config.botToken === "string" && typeof config.chatId === "string"
  );
}
