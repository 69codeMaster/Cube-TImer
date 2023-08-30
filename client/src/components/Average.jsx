import { formatTime } from "../utils/formatUtils";
import { useDB } from "../store/DbContext";
import "./Average.css";
export default function Average({ averageOf, running }) {
  const { averages } = useDB();

  return (
    <div className={`average ${running && averages[averageOf] ? "hide" : ""}`}>
      average of <span className="averageOf"> {averageOf} </span> :{" "}
      {formatTime(averages[averageOf])}
    </div>
  );
}
