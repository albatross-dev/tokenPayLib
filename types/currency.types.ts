import { PaymentTypesArray } from "./payload-types";
import { FiatCodes } from "./request.types";

export interface Currency {
  symbol: string;
  code: FiatCodes;
  name: string;
  icon?: string;
}
