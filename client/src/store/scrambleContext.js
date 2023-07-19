// import { createContext, useContext, useState } from "react";
// import { generateScramble } from "../utils/scrambleUtils";

// const scrambleContext = createContext("");

// export function useScramble() {
//   console.log(`%c ${useContext(scrambleContext)}`, "color: red");
//   return useContext(scrambleContext);
// }

// export function ScramblelProvider({ children }) {
//   const [scramble, setScramble] = useState(generateScramble());
//   const setNewScramble = () => setScramble(generateScramble());
//   return (
//     <scrambleContext.Provider value={[scramble, setNewScramble]}>
//       {children}
//     </scrambleContext.Provider>
//   );
// }
