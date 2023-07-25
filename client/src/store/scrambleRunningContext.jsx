import { createContext, useContext, useState } from "react";
import { generateScramble } from "../utils/scrambleUtils";

const scrambleRunningContext = createContext({
  running: Number,
  setRunning: () => {},
  scramble: String,
  setScramble: () => {},
});

export function useScrambleRunningContext() {
  return useContext(scrambleRunningContext);
}

export default function ScrambleRunningProvider({ children }) {
  const [scramble, setScramble] = useState(generateScramble());
  const [running, setRunning] = useState(false);

  const initalValue = {
    running: running,
    setRunning: setRunning,
    scramble: scramble,
    setScramble: () => setScramble(generateScramble()),
  };

  return (
    <scrambleRunningContext.Provider value={initalValue}>
      {children}
    </scrambleRunningContext.Provider>
  );
}
