import "./Scramble.css";

export default function Scramble({ running, scramble }) {
  console.log(`scramble rerendered ${scramble}`);
  return (
    <div className={`scramble-container ${running ? "hide" : ""}`}>
      {scramble}
    </div>
  );
}
