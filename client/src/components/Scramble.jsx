import "./Scramble.css";
import { useScramble } from "../store/ScrambleContext";

export default function Scramble({ running }) {
  const { scramble } = useScramble();
  return (
    <div className={`scramble-container ${running ? "hide" : ""}`}>
      {scramble}
    </div>
  );
}
