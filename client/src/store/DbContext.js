import { useState, createContext, useContext, useEffect } from "react";
import { fetchHistory, fetchBest, fetchSolves } from "../utils/apiUtils";
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
    fetchSolves(15).then((res) => setSolves(res.map(({ time }) => time)));
    fetchHistory().then((res) => setHistory(res));
    fetchBest().then((res) => setBest(res));
  }, []);

  useEffect(() => {
    if (solves) {
      setAverages((prevAverage) => {
        return { ...prevAverage, 5: getAverage(5, solves) };
      });
      setAverages((prevAverage) => {
        return { ...prevAverage, 12: getAverage(12, solves) };
      });
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
