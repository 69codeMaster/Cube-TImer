import { useDB } from "../../store/DbContext";
import HistoryItem from "./HistoryItem";
import { formatHistoryRow } from "../../utils/formatUtils";
import { deleteSolve } from "../../utils/apiUtils";

import "./HistoryList.css";
export default function HistoryList() {
  const { history, setSolves } = useDB();
  if (history)
    return (
      <div>
        <header className="table-header">
          <HistoryItem solve_id="id" time="time" ao5="ao5" rule="header" />
        </header>
        <div className="rows">
          {history.map((item, itemIndex) => {
            const formattedRowData = formatHistoryRow(item);
            return (
              <HistoryItem
                rule="item"
                onClick={() => {}}
                {...formattedRowData}
              />
            );
          })}
        </div>
      </div>
    );
}
