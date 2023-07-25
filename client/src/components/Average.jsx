import { useState, useEffect } from "react";
import { formatAverage } from "../utils/formatUtils";
import { fetchAverage } from "../utils/apiUtils";
import "./Average.css";

export default function Average({ averageOf, running }) {
  useEffect(() => {
    if (!running) {
      fetchAverage(averageOf).then((avergae) => setAverage(avergae));
    }
  }, [running]);
  const [average, setAverage] = useState(0);

  return (
    <div
      className={`average ${running && average !== undefined ? "hide" : ""}`}>
      average of {averageOf} : {formatAverage(average)}
    </div>
  );
}
