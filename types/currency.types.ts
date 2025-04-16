import { FiatCodes } from "./derivedPayload.types";

export interface Currency {
  symbol: string;
  code: FiatCodes;
  name: string;
  icon?: string;
}
