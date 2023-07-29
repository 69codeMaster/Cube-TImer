import { useState, useEffect, useRef } from "react";
import { formatAverage } from "../utils/formatUtils";
import { fetchAverage } from "../utils/apiUtils";
import "./Average.css";

export default function Average({
  averageOf,
  dbUpdated,
  setDbUpdated,
  running,
}) {
  console.log("average got rendered");
  const [average, setAverage] = useState(0);
  
  useEffect(() => {
    if (dbUpdated) {
      setDbUpdated(false);
      setAverage(0);
      fetchAverage(averageOf).then((res) => {
        console.log(res);
        setAverage(res);
      });
    }
  }, [dbUpdated]);

  return (
    <div className={`average ${running && average ? "hide" : ""}`}>
      average of {averageOf} : {formatAverage(average)}
    </div>
  );
}
