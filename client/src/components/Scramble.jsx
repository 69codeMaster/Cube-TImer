import "./Scramble.css";
import { useScramble } from "../store/scrambleContext";

export default function Scramble({ running }) {
  const scramble = useScramble();

  return (
    <div className={`scramble-container ${running ? "hide" : "show"}`}>
      {scramble}
    </div>
  );
}
