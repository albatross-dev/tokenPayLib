import { PaymentTypesArray } from "./payload-types";

export interface Currency {
  symbol: string;
  code: PaymentTypesArray[number]["currencies"][number]["currency"];
  name: string;
  icon?: string;
}
