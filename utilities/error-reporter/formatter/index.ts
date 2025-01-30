import { LogEntry, LogLevelStrings } from "../reporter";

export type FormattedLog = { log: any };

export type Formatter = (entrie: LogEntry) => FormattedLog;

export const defaultFormatter: Formatter = (entry: LogEntry) => {
  return { log: entry };
};

export const stringifyFormatter: Formatter = (entry: LogEntry) => {
  return { log: JSON.stringify(entry) };
};

export const telegramHTMLFormatter: Formatter = (entry: LogEntry) => {
  const formatHeader = (page: number) => {
    return `
<b>Page: </b> ${page}\n
<b>Log-Level: </b>${
      LogLevelStrings.get(entry.level) || entry.level.toString()
    }\n
<b>Logger: </b>${entry.loggerName}\n
<b>Timestamp: </b>${entry.timestamp}\n
        `;
  };

  const formatMessage = (message: string) => {
    return `<b>Message: </b>${message}\n`;
  };

  const formatData = (dataString: string) => {
    return `<b>Data: </b>\n<pre>${dataString}</pre>\n\n`;
  };

  const formatBrowserInformation = (infoString: string) => {
    return `<b>Browser Information: </b>\n<pre>${infoString}</pre>`;
  };

  let stringifiedData: string = entry.data
    ? prettifyJSONString(entry.data)
    : "";
  let stringifiedInfo: string = entry.userInformation
    ? prettifyJSONString(entry.userInformation)
    : "";
  let stringifiedMessage = entry.message;

  const messages: string[] = [];
  let currentMessage = "";
  let currentField: "message" | "data" | "info" = "message";
  let done = false;

  for (let page = 1; !done; page++) {
    currentMessage = formatHeader(page);

    let messageHasSpace = true;
    while (messageHasSpace) {
      switch (currentField) {
        case "message": {
          if (stringifiedMessage.length === 0) {
            currentField = "data";
          } else {
            const availableCharacters = 4096 - currentMessage.length - 17;
            currentMessage += formatMessage(
              stringifiedMessage.substring(0, availableCharacters)
            );
            stringifiedMessage =
              stringifiedMessage.substring(availableCharacters);
          }

          break;
        }
        case "data": {
          if (stringifiedData.length === 0) {
            currentField = "info";
          } else {
            const availableCharacters = 4096 - currentMessage.length - 27;
            currentMessage += formatData(
              stringifiedData.substring(0, availableCharacters)
            );
            stringifiedData = stringifiedData.substring(availableCharacters);
          }
          break;
        }
        case "info": {
          if (stringifiedInfo.length === 0) {
            done = true;
            break;
          } else {
            const availableCharacters = 4096 - currentMessage.length - 40;
            currentMessage += formatBrowserInformation(
              stringifiedInfo.substring(0, availableCharacters)
            );
            stringifiedInfo = stringifiedInfo.substring(availableCharacters);
          }
          break;
        }
      }

      if (currentMessage.length > 4096 - 200 || done) {
        messages.push(currentMessage);
        messageHasSpace = false;
      }
    }
  }

  return {
    log: messages,
  };
};

function prettifyJSONString(s: any): string {
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
    return JSON.stringify(s);
  }
}
