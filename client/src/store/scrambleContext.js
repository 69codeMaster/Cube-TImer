import { createContext, useContext, useState } from "react";
import { generateScramble } from "../utils/scrambleUtils";

const scrambleContext = createContext("");

export function useScramble() {
  return useContext(scrambleContext);
}

export function ScramblelProvider({ children }) {
  const scramble = generateScramble();

  const initialValue = scramble;
  return (
    <scrambleContext.Provider value={initialValue}>
      {children}
    </scrambleContext.Provider>
  );
}
