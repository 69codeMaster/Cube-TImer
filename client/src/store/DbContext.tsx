import React, {
  useState,
  createContext,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import {
  fetchAllHistoryRecords,
  fetchLastHistoryRecord,
  fetchSolves,
} from "../utils/apiUtils";
import { solve, average, DbContextType, history } from "./dbTypes";

const DbContext = createContext<DbContextType>({
  solves: [],
  setSolves: () => {},
  averages: {},
  history: [],
  setAverages: () => {},
});

export function useDB() {
  return useContext(DbContext);
}

export default function DbProvider({ children }: { children: ReactNode }) {
  const [solves, setSolves] = useState<solve[]>([]);
  const [history, setHistory] = useState<history[]>([]);
  const [averages, setAverages] = useState<average>({});
  // const [best, setBest] = useState();

  useEffect(() => {
    console.log("fetching from db");
    fetchSolves(15).then((res: solve[]) => setSolves(res));
    fetchAllHistoryRecords().then((res: history[]) => {
      setHistory(res);
      setAverages(() => {
        return {
          ao12: res[0].ao12,
          ao5: res[0].ao5,
        };
      });
    });
    // fetchBest().then((res) => setBest(res));
  }, []);

  useEffect(() => {
    fetchAllHistoryRecords().then((res: history[]) => {
      setHistory(res);
      setAverages(() => {
        return {
          ao12: res[0].ao12,
          ao5: res[0].ao5,
        };
      });
    });
  }, [solves]);

  const initlaValue = {
    solves: solves,
    setSolves: setSolves,
    averages: averages,
    setAverages: setAverages,
    history: history,
  };

  return (
    <DbContext.Provider value={initlaValue}> {children} </DbContext.Provider>
  );
}
