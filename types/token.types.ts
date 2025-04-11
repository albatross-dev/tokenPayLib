export interface Token {
  contractAddress: string;
  abi: any[];
  id: string;
  symbol: string;
  decimals: number;
  name: string;
  contract?: {
    contractAddress: string;
    abi: any[];
  };
}

export interface SimpleToken {
  name: string;
  id: string;
  decimals: number;
  contractAddress: string;
  abi: any[];
  icon: string | React.FunctionComponent<React.SVGAttributes<SVGElement>>;
}