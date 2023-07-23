import "./Scramble.css";

export default function Scramble({ running, scramble }) {
  console.log("scramble rerendered");
  return (
    <div className={`scramble-container ${running ? "" : "hide"}`}>
      {scramble}
    </div>
  );
}
