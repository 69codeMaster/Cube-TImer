import "./Scramble.css";
import { useScrambleRunningContext } from "../store/scrambleRunningContext";

export default function Scramble() {
  const { running, scramble } = useScrambleRunningContext();
  return (
    <div className={`scramble-container ${running ? "hide" : ""}`}>
      {scramble}
    </div>
  );
}
