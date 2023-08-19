import { formatAverage } from "../utils/formatUtils";
import { useDB } from "../store/DbContext";
import "./Average.css";
export default function Average({
  averageOf,

  running,
}) {
  console.log("average got rendered");
  const { averages } = useDB();

  return (
    <div
      className={`average ${
        running && averages[averageOf] ? "hide-average" : ""
      }`}>
      average of <span className="averageOf"> {averageOf} </span>:{" "}
      {formatAverage(averages[averageOf])}
    </div>
  );
}
