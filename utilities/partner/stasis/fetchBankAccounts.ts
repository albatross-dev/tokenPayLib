import { api, sendErrorReport } from "../../../../context/UserContext";
import { BankAccount } from "../../../components/crossborder/partner/universal/stasis.types";
import { Consumer, Vendor } from "../../../types/payload-types";

interface FetchBankAccountsProps {
  setBankAccounts: (bankAccounts: BankAccount[]) => void;
  user: Vendor | Consumer;
}

/**
 * Fetches the users bank accounts from the backend via stasis and sets them in the state.
 */
const fetchBankAccounts = async ({
  setBankAccounts,
  user,
}: FetchBankAccountsProps) => {
  if (!user.stasisClientUUID) {
    console.log("Stasis client UUID is missing");
    return;
  }
  try {
    const response = await api.get(
      "/api/fiatTransaction/stasis/getBankAccounts"
    );
    setBankAccounts(response.data);
  } catch (error) {
    sendErrorReport("Stasis - Utils - Fetching bank accounts failed", error);
    // if setErrors is a function then set the error
    throw error;
  }
};

export default fetchBankAccounts;
