import axios from "axios";
import moment from "moment-timezone";
import qs from "qs";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
  useMemo,
} from "react";
import { sendErrorReport } from "../../../context/UserContext";
import { Maintenance, Router, UhuConfig } from "../../types/payload-types";

moment.locale("de");

const timeZone = "Europe/Berlin";
const zonedDate = moment().tz(timeZone);

export interface UhuConfigContextType {
  uhuConfig: UhuConfig | "loading" | null;
  currentRouter: Router | "loading" | null;
  setUhuConfig: (config: UhuConfig | null) => void;
  maintenance: Maintenance | "loading" | null;
  isHelpModalOpen: boolean;
  setIsHelpModalOpen: (isOpen: boolean) => void;
}

export const UhuConfigContext = createContext<UhuConfigContextType | null>(
  null
);

interface UhuConfigProviderProps {
  children: ReactNode;
}

export function UhuConfigProvider({ children }: UhuConfigProviderProps) {
  const [uhuConfig, setUhuConfig] = useState<UhuConfig | "loading" | null>(
    "loading"
  );
  const [currentRouter, setCurrentRouter] = useState<Router | "loading" | null>(
    "loading"
  );
  const [maintenance, setMaintenance] = useState<
    Maintenance | "loading" | null
  >("loading");
  const [isHelpModalOpen, setIsHelpModalOpen] = useState<boolean>(false);

  async function getUhuConfig(): Promise<void> {
    try {
      const res = await axios.get<UhuConfig>(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/globals/uhuConfig`,
        {
          withCredentials: true,
        }
      );

      const resMaintenance = await axios.get<Maintenance>(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/globals/maintenance`
      );
      setMaintenance(resMaintenance.data);
      setUhuConfig(res.data);
    } catch (error) {
      sendErrorReport("UhuConfigProvider - Fetching Uhu config failed", error);
      console.error("Error fetching Uhu config:", error);
      setUhuConfig(null);
    }
  }

  async function getCurrentRouter() {
    const routerType = zonedDate.month() % 2 === 0 ? "a" : "b";

    // Construct the query object
    const query = {
      where: {
        and: [
          {
            useAfter: {
              less_than_equal: new Date().toISOString(), // Convert the date to ISO string
            },
          },
          {
            routerType: {
              equals: routerType,
            },
          },
        ],
      },
      sort: "-useAfter",
      limit: 1,
    };

    const stringifiedQuery = qs.stringify(query, { addQueryPrefix: true });

    try {
      const response = await axios.get<{ docs: Router[] }>(
        `/api/router${stringifiedQuery}`
      );
      const router = response.data;

      setCurrentRouter(router.docs[0]);
      return router;
    } catch (error) {
      sendErrorReport("UhuConfigProvider - Fetching router failed", error);
      console.error("Error fetching router:", error);
      throw error;
    }
  }

  useEffect(() => {
    getUhuConfig();
    getCurrentRouter();
  }, []);

  const contextValue = useMemo(
    () => ({
      uhuConfig,
      currentRouter,
      setUhuConfig,
      maintenance,
      isHelpModalOpen,
      setIsHelpModalOpen,
    }),
    [uhuConfig, currentRouter, maintenance, isHelpModalOpen]
  );

  return (
    <UhuConfigContext.Provider value={contextValue}>
      {children}
    </UhuConfigContext.Provider>
  );
};

export const useUhuConfig = (): UhuConfigContextType => {
  const context = useContext(UhuConfigContext);
  if (!context) {
    throw new Error("useUhuConfig must be used within a UhuConfigProvider");
  }
  return context;
};
