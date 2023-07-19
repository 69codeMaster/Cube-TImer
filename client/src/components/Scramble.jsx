import "./Scramble.css";

export default function Scramble({ running, scramble }) {
  return (
    <div className={`scramble-container ${running ? "hide" : "show"}`}>
      {scramble}
    </div>
  );
}
