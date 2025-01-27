import { LogEntry, LogLevelStrings } from "../reporter";

export type FormattedLog = { log: any };

export type Formatter = (entrie: LogEntry) => FormattedLog;

export const defaultFormatter: Formatter = (entry: LogEntry) => {
    return { log: entry };
}

export const stringifyFormatter: Formatter = (entry: LogEntry) => {
    return { log: JSON.stringify(entry) };
}

export const telegramHTMLFormatter: Formatter = (entry: LogEntry) => {

    return { log: `
<b>Log-Level: </b>${LogLevelStrings.get(entry.level) || entry.level.toString()}\n
<b>Logger: </b>${entry.loggerName}\n
<b>Message: </b>${entry.message}\n
<b>Timestamp: </b>${entry.timestamp}\n
<b>Data: </b>
<pre>${prettifyJSONString(entry.data)}</pre>\n\n` + (
        entry.userInformation 
            ? `<b>Browser Information: </b>\n<pre>${prettifyJSONString(entry.userInformation)}</pre>` 
            : ""
        )
    }
}


function prettifyJSONString(s: any) {
    try {
        return JSON.stringify(JSON.parse(s), null, 2)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#39;")
            .replace(/\n/g, "\\n")
            .replace(/\\/g, "\\\\");
    } catch (error) {
        return s;
    }
}