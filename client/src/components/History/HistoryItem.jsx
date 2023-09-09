import { BsTrash } from "react-icons/bs";
import "./HistoryItem.css";
import { DelteSolveAlert } from "../../utils/messagesUtil";

export default function HistoryItem({ rule, onClick, ...rest }) {
  const renderColumn = () =>
    Object.entries(rest).map(([key, value]) => (
      <span key={key} className="column">
        {value}
      </span>
    ));

  const onIconClick = async () => {
    if (DelteSolveAlert()) onClick();
  };
  return (
    <div key={Math.random()} className="wrapper">
      <div className={`item ${rule}`}>{renderColumn()}</div>
      {rule !== "header" && (
        <BsTrash onClick={onIconClick} className="icon" color="#05386b" />
      )}
    </div>
  );
}
