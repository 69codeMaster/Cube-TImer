import { useState, useEffect } from "react";
import { formatAverage } from "../utils/formatTime";
import "./Average.css";
export default function Average({ averageOf, scramble, running }) {
  console.log("the average got rerendered");
  useEffect(() => {
    fetchAverage();
  }, [scramble]);

  const fetchAverage = async () => {
    const data = await fetch(`./averageOf:${averageOf}`);
    const average = await data.json();
    setAverage(average);
  };
  const [average, setAverage] = useState(0);

  return (
    <div
      className={`average ${running && average !== undefined ? "hide" : ""}`}>
      average of {averageOf} : {formatAverage(average)}
    </div>
  );
}
