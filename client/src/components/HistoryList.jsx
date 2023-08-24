import { useDB } from "../store/DbContext";
import HistoryItem from "./HistoryItem";
export default function HistoryList() {
  const { history } = useDB();

  if (history)
    return (
      <div>
        {history.map((item, idx) => (
          <HistoryItem {...item} key={idx} />
        ))}
      </div>
    );
}
