import axios from 'axios';
import { createContext, useContext, useState, useEffect } from 'react';
import qs from "qs";

export const UhuConfigContext = createContext(null);

export const UhuConfigProvider = ({ children }) => {
  const [uhuConfig, setUhuConfig] = useState("loading");
  const [currentRouter, setCurrentRouter] = useState("loading");
  const [maintenance, setMaintenance] = useState("loading")
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);

  async function getUhuConfig() {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/globals/uhuConfig`, {
        withCredentials: true,
      });

      const resMaintenance = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/globals/maintenance`);
      setMaintenance(resMaintenance.data);
      setUhuConfig(res.data);
    } catch (error) {
      console.error("Error fetching Uhu config:", error);
      setUhuConfig(null);
    }
  }

  async function getCurrentRouter() {
    // Construct the query object
    const query = {
      where: {
        useAfter: {
          less_than_equal: new Date().toISOString(), // Convert the date to ISO string
        },
      },
      sort: "-useAfter",
      limit: 1,
    };

    const stringifiedQuery = qs.stringify(query, { addQueryPrefix: true });

    try {
      const response = await axios.get(`/api/router${stringifiedQuery}`);
      const router = response.data;
      console.log(router);

      setCurrentRouter(router.docs[0]);
      return router;
    } catch (error) {
      console.error("Error fetching router:", error);
      throw error;
    }
  }

  useEffect(() => {
    getUhuConfig();
    getCurrentRouter();
  }, []);

  return (
    <UhuConfigContext.Provider value={{
      uhuConfig,
      currentRouter,
      setUhuConfig,
      maintenance,
      isHelpModalOpen,
      setIsHelpModalOpen
    }}>
      {children}
    </UhuConfigContext.Provider>
  );
};

export const useUhuConfig = () => useContext(UhuConfigContext);
