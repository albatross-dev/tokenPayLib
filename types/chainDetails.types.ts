import { Chain } from "thirdweb";

export interface ChainDetails {
  chainId: number;
  name: string;
  chain: Chain;
  logo: string;
  main?: boolean;
}