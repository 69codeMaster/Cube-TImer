import "./Scramble.css";

export default function Scramble({ show, scramble }) {
  console.log("scramble rerendered");
  return (
    <div className={`scramble-container ${show ? "" : "hide"}`}>{scramble}</div>
  );
}
