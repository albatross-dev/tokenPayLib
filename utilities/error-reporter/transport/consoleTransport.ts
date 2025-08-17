import { defaultFormatter, Formatter } from "../formatter";
import { Transport, TransportConfig } from ".";
import { LogEntry, LogLevel } from "../reporter";



export type ConsoleTransportConfig = {

} & TransportConfig;

export class ConsoleTransport implements Transport {

    private formatter: Formatter = defaultFormatter;

    private level: LogLevel = LogLevel.INFO;

    constructor({ formatter, level }: ConsoleTransportConfig) {

        if (formatter) {
            this.formatter = formatter;
        }

        if (level) {
            this.level = level;
        }

    }

    async sendLog(entrie: LogEntry) {

        // If the log level of this entrie is lower then the transports log level do nothing
        if (entrie.level < this.level) {
            return;
        }

        const formattedLog = this.formatter(entrie);

        switch (entrie.level) {
            case LogLevel.DEBUG: {
                console.debug(formattedLog.log);
                break;
            }
            case LogLevel.INFO: {
                console.info(formattedLog.log);
                break;
            }
            case LogLevel.WARN: {
                console.warn(formattedLog.log);
                break;
            }
            case LogLevel.ERROR: {
                console.error(formattedLog.log);
                break;
            }
        }
    }
}