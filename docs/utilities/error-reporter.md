## error-reporter

Building blocks to capture, format, and ship logs/exceptions.

Core
- Reporter (class)
  - Config: { name, level?, transports?, captureGlobalErrors?, captureUserInformation? }
  - Methods: debug/info/warn/error/exception/log, forward/asyncForward
  - Singleton; can optionally attach window.onerror/onunhandledrejection and capture basic browser info.
- LogLevel enum: DEBUG, INFO, WARN, ERROR
- LogLevelStrings: Map<LogLevel, string>

Usage
- ClientReporter(config): Reporter | undefined (no-op on server)
- ServerReporter(config): Reporter | undefined (no-op on client)

Transports (transport/)
- ConsoleTransport({ formatter?, level? })
- AxiosTransport({ endpoint, formatter?, level? })
- TelegramTransport({ botToken, chatId, parseMode?, formatter?, level? })
- Helpers: isAxiosTransportConfig, isTelegramTransportConfig

Formatters (formatter/)
- defaultFormatter(entry) → { log: entry }
- stringifyFormatter(entry) → { log: JSON.stringify(entry) }
- telegramHTMLFormatter(entry) → { log: string[] } (splits into pages; escapes HTML)

Reporter internals
- buildExceptionObject(e): captures stack/message/name/data/inner
- stringifyData(fnOrData): converts values to strings; invokes functions; JSON stringifies objects.
- knownErrors filter: omit known (name+message) errors (e.g., Axios Network Error).
