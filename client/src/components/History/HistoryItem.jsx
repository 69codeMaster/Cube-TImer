import { formatTime } from "../../utils/formatUtils";
import "./HistoryItem.css";

export default function HistoryItem({ solve_id, time, ao5 }) {
  return (
    <div className="item" key={solve_id}>
      <span className="column">{solve_id}</span>
      <span className="column">{formatTime(time)}</span>
      <span className="column">{formatTime(ao5)}</span>
    </div>
  );
}
