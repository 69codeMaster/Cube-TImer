import { useDB } from "../../store/DbContext";
import HistoryItem from "./HistoryItem";
import "./HistoryList.css";
export default function HistoryList() {
  const { history } = useDB();
  if (history)
    return (
      <div className="table-container">
        <HistoryItem solve_id="id" time="time " ao5="ao5" header={true} />
        {history.map((item, idx) => (
          <HistoryItem {...item} rule="item" key={idx} />
        ))}
      </div>
    );
}
