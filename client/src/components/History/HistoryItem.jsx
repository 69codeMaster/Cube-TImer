import { formatTime } from "../../utils/formatUtils";
import "./HistoryItem.css";

export default function HistoryItem({ solve_id, time, average }) {
  return (
    <div className="item" key={solve_id}>
      <span className="column">{solve_id}</span>
      <span className="column">{formatTime(time)}</span>
      <span className="column">{formatTime(average)}</span>
    </div>
  );
}
