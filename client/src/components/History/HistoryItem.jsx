import { formatTime } from "../../utils/formatUtils";
import "./HistoryItem.css";

export default function HistoryItem({ solve_id, time, ao5, header }) {
  return (
    <div className={`item ${header ? "header" : ""}`} key={solve_id}>
      <span className="column">{header ? solve_id : "#" + solve_id} </span>
      <span className="column">{header ? time : formatTime(time)}</span>
      <span className="column">{header ? ao5 : formatTime(ao5)}</span>
    </div>
  );
}
