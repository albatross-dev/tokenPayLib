import axios from "axios"
import { LogEntry, LogLevel } from "../reporter"
import { defaultFormatter, Formatter } from "../formatter"
import { Transport, TransportConfig } from "."

export type TelegramParseMode = "MakrdownV2" | "HTML";

export type TelegramTransportConfig = {
    botToken: string
    chatId: string
    parseMode?: TelegramParseMode
} & TransportConfig;

export class TelegramTransport implements Transport {
    private botToken: string;
    private chatId: string;
    private parseMode?: TelegramParseMode;
    private formatter: Formatter = defaultFormatter;
    private level: LogLevel = LogLevel.INFO;

    constructor({ botToken, chatId, parseMode, formatter, level }: TelegramTransportConfig) {
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

        const formattedLog = this.formatter(entrie);

        console.log(formattedLog);

        try {
            const response = await axios({
                method: 'post',
                url: `https://api.telegram.org/bot${this.botToken}/sendMessage`,
                data: {
                    chat_id: this.chatId,
                    text: formattedLog.log,
                    parse_mode: this.parseMode,
                }
            })

            if (response.status !== 200) {
                console.error('Failed to send message with Http Status: ', response.status, " ", response.statusText)
                return
            }

            const data = response.data

            if (data.ok !== true) {
                console.error('Failed to send message with Telegram Error: ', data.description)
                return
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('Failed to send message with Axios Error: ', error.response?.data || error.message)
            } else {
                console.error('Failed to send message with Unexpected Error: ', error)
            }
        }
    }
}


export function isTelegramTransportConfig(config: any): boolean {
    return typeof config.botToken === 'string'
        && typeof config.chatId === 'string'
}