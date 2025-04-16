import { Account } from "thirdweb/wallets";
import { Consumer, Vendor } from "../../../../../../types/payload-types";
import { SimpleToken } from "../../../../../../types/token.types";
import { BankAccount, StasisErrors } from "../../../universal/stasis.types";
import { LoadingButtonStates } from "../../../../../UI/LoadingButton";

export interface StasisProps {
  amount: number;
  account: Account;
  user: Consumer | Vendor;
  preferredStableCoin: string;
}

export interface SlideProps extends StasisProps {
  setView: (view: string) => void;
  selectedToken: SimpleToken;
  selectedTokenBalance: number | null;
  errors: StasisErrors;
  setErrors: (errors: StasisErrors) => void;
  bankAccounts: BankAccount[];
  setBankAccounts: (accounts: BankAccount[]) => void;
  selectedBankAccount: BankAccount | null;
  setSelectedBankAccount: (account: BankAccount | null) => void;
  isLoading: LoadingButtonStates;
  setIsLoading: (loading: LoadingButtonStates) => void;
  handleSend: () => Promise<void>;
}
