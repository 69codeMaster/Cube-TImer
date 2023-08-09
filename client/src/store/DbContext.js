import { useState, createContext, useContext, useEffect } from "react";
import { fetchAverage, fetchBest, fetchSolves } from "../utils/apiUtils";
import { getAverage } from "../utils/averagesUtil";

const DbContext = createContext({
  solves: [],
  setSolves: () => {},
  averages: [],
  setAverages: () => {},
  best: Number,
  setBest: () => {},
});

export function useDB() {
  return useContext(DbContext);
}

export default function DbProvider({ children }) {
  const [solves, setSolves] = useState();
  const [averages, setAverages] = useState({
    5: Number,
    12: Number,
  });
  const [best, setBest] = useState();

  useEffect(() => {
    fetchSolves(100).then((res) =>
      setSolves(res.map((solve) => Number(solve)))
    );
    fetchBest().then((res) => setBest(Number(res)));
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
  };

  return (
    <DbContext.Provider value={initlaValue}>{children}</DbContext.Provider>
  );
}
