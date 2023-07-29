import { createContext, useContext, useState } from "react";
import { generateScramble } from "../utils/scrambleUtils";

const scrambleContext = createContext({
  scrambel: String,
  setScramble: () => {},
});

export function useScramble() {
  return useContext(scrambleContext);
}

export default function ScrambleProvider({ children }) {
  const [scramble, setScramble] = useState(generateScramble());

  const initalValue = {
    scramble: scramble,
    setScramble: () => setScramble(generateScramble()),
  };

  return (
    <scrambleContext.Provider value={initalValue}>
      {children}
    </scrambleContext.Provider>
  );
}
