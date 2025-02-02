import { Reporter, ReporterConfig } from "./reporter";
import { ClientTransports, ServerTransports } from "./transport";

/**
 * Server configuration type for config files.
 * Is a subset of ReporterConfig, where all client specific properties are excluded.
 */
export type ServerConfig = Omit<
  ReporterConfig<ServerTransports>,
  "captureGlobalErrors" | "captureUserInformation"
>;

/**
 * Client configuration type for config files.
 * Is a subset of ReporterConfig, where all transporters for server only use are excluded.
 */
export type ClientConfig = ReporterConfig<ClientTransports>;

const isServer = typeof window === "undefined";

/**
 * Retrieves the global Reporter object for client-side code in the browser and returns it.
 * If the Reporter does not exsist it will be initialised with the given ClientConfig.
 *
 * @param config The configuration for the client side reporter
 * @returns The global client report or undefined
 */
export function ClientReporter(config: ClientConfig): Reporter | undefined {
  if (!isServer) {
    return new Reporter(config);
  }
}

/**
 * Retrieves the global Reporter object for server-side code in nodejs and returns it.
 * If the Reporter does not exsist it will be initialised with the given ServerConfig.
 *
 * @param config The configuration for the server side reporter.
 * @returns The global server report or undefined.
 */
export function ServerReporter(config: ServerConfig): Reporter | undefined {
  if (isServer) {
    return new Reporter(config);
  }

  console.warn("ServerReporter cant be used in the browser!!!");
}
