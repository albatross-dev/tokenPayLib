const { sendErrorReport } = require("../../../../context/UserContext");

  /**
   * Fetches the users bank accounts from the backend via stasis and sets them in the state.
   */
  const fetchBankAccounts = async (setBankAccounts, setErrors) => {
    if (!user.stasisClientUUID) {
      console.log('Stasis client UUID is missing');
      return;
    }
    try {
      const response = await axios.get("/api/fiatTransaction/stasis/getBankAccounts");
      setBankAccounts(response.data);
    } catch (error) {
      sendErrorReport("Stasis - Utils - Fetching bank accounts failed", error);
      // if setErrors is a function then set the error
      console.error("Error fetching bank accounts", error);
    }
  };

export default fetchBankAccounts;