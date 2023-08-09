import { useState, useEffect, useRef } from "react";
import { formatAverage } from "../utils/formatUtils";
import { fetchAverage } from "../utils/apiUtils";
import { useDB } from "../store/DbContext";
import "./Average.css";
export default function Average({
  averageOf,
  dbUpdated,
  setDbUpdated,
  running,
}) {
  console.log("average got rendered");
  const { averages } = useDB();
  console.log(averages);
  const [average, setAverage] = useState();

  useEffect(() => {
    if (dbUpdated) {
      fetchAverage(averageOf).then((res) => {
        console.log(res);
        setAverage(res);
      });

      setDbUpdated(false);
    }
  }, [dbUpdated]);

  return (
    <div className={`average ${running && average ? "hide-average" : ""}`}>
      db average of {averageOf} : {formatAverage(average)}
      <br></br>
      local average of {averageOf} : {formatAverage(averages[averageOf])}
    </div>
  );
}
