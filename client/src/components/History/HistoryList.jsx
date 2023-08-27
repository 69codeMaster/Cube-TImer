import { useDB } from "../../store/DbContext";
import HistoryItem from "./HistoryItem";
import "./HistoryList.css";
// TODO the header shit is just an item I have raped and it is not cool
export default function HistoryList() {
  const { history } = useDB();
  if (history)
    return (
      <div className="table-container">
        <HistoryItem solve_id="id" time="time " ao5="ao5" />
        {history.map((item, idx) => (
          <HistoryItem {...item} key={idx} />
        ))}
      </div>
    );
}
