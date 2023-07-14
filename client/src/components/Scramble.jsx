import { generateScramble } from "../utils/scrambleUtils";
import "./Scramble.css";
import { useRef } from "react";

export default function Scramble({ running }) {
  const scramble = useRef(generateScramble());
  if (!running) {
    scramble.current = generateScramble();
  }
  return (
    <div className={`scramble-container ${running ? "hide" : "show"}`}>
      {scramble.current}
    </div>
  );
}
