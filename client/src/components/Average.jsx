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
  // const { averages } = useDB();
  const [average, setAverage] = useState();

  useEffect(() => {
    if (dbUpdated) {
      setDbUpdated(false);

      fetchAverage(averageOf).then((res) => {
        console.log(res);
        setAverage(res);
      });

      // setAverage(Math.random() * 1000);
    }
  }, [dbUpdated]);

  return (
    <div className={`average ${running && average ? "hide-average" : ""}`}>
      average of {averageOf} : {formatAverage(average)}
    </div>
  );
}
