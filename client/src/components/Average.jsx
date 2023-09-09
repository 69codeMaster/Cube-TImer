import { formatTime } from "../utils/formatUtils";
import { useDB } from "../store/DbContext";
import "./Average.css";
export default function Average({ averageOf }) {
  const { averages } = useDB();
  console.log(averages);
  return (
    <div className="average">
      average of <span className="averageOf"> {averageOf} </span> :{" "}
      {formatTime(averages[`ao${averageOf}`])}
    </div>
  );
}
