import { useState, createContext, useContext, useEffect } from "react";
import {
  fetchAllHistoryRecords,
  fetchLastHistoryRecord,
  fetchBest,
  fetchSolves,
} from "../utils/apiUtils";
import { getAverage } from "../utils/averagesUtil";

const DbContext = createContext({
  solves: [],
  setSolves: () => {},
  averages: [],
  setAverages: () => {},
  best: Number,
  setBest: () => {},
  history: [],
});

export function useDB() {
  return useContext(DbContext);
}

export default function DbProvider({ children }) {
  const [solves, setSolves] = useState();
  const [history, setHistory] = useState();
  const [averages, setAverages] = useState({
    5: Number,
    12: Number,
  });
  const [best, setBest] = useState();
  
  useEffect(() => {
    console.log("fetching from db");
    fetchSolves(15).then((res) => setSolves(res.map(({ time }) => time)));
    fetchAllHistoryRecords().then((res) => setHistory(res));
    fetchBest().then((res) => setBest(res));
  }, []);

  useEffect(() => {
    console.log("solves rerndered");
    if (solves) {
      const ao5 = getAverage(5, solves);
      const ao12 = getAverage(12, solves);
      setAverages((prevAverage) => {
        return { ...prevAverage, 5: ao5 };
      });
      setAverages((prevAverage) => {
        return { ...prevAverage, 12: ao12 };
      });

      // console.log(history[0].solve_id, solves[0].solve_id);
      if (history && history[0].solve_id !== solves[0].solve_id)
        fetchLastHistoryRecord().then((res) =>
          setHistory((preHistory) => [
            { ...res, ao5: ao5, ao12: ao12 },
            ...preHistory,
          ])
        );
    }
  }, [solves]);

  const initlaValue = {
    solves: solves,
    setSolves: setSolves,
    averages: averages,
    setAverages: setAverages,
    best: best,
    setBest: setBest,
    history: history,
  };

  return (
    <DbContext.Provider value={initlaValue}>{children}</DbContext.Provider>
  );
}
