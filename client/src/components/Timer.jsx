import React from "react";
import { useState, useEffect, useRef } from "react";
import Confetti from "react-confetti";
import { useWindowSize } from "@uidotdev/usehooks";

import "./Timer.css";
import { formatTime } from "../utils/formatTime";

const TIME_TO_START = 500;

function Timer({ running, setRunning }) {
  console.log("shit got rerendered");
  const [time, setTime] = useState(0);
  const [ready, setReady] = useState(false);
  const { width, height } = useWindowSize();

  let isConfettie = useRef(false);
  let pressTimeStart, pressTimeEnd; //check how long the space bar was pressed
  let interval;
  let lastStoppedTime = 0;

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === "Space") {
        pressTimeEnd = Date.now();
        if (pressTimeEnd - pressTimeStart > TIME_TO_START) {
          setTime(0);
          setReady(true);
        }
        if (e.repeat) return;
        pressTimeStart = Date.now();
      }
    };

    const handleSpaceUp = (e) => {
      if (e.code === "Space") {
        if (running || Date.now() - pressTimeStart > TIME_TO_START + 10)
          setRunning((ran) => !ran);
        else {
          pressTimeStart = Date.now();
          console.log("keep the space bar pressed for longer");
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleSpaceUp);

    if (running) {
      isConfettie.current = false;
      setTime(0);

      interval = setInterval(() => {
        setTime(function (prevTime) {
          return prevTime + 1;
        });
      }, 10);
    } else {
      setReady(false);
      lastStoppedTime = time;
      isConfettie.current = lastStoppedTime && lastStoppedTime / 100 < 10;
    }

    return () => {
      console.log("returning from the use effect");
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleSpaceUp);
      clearInterval(interval);
    };
  }, [running]);

  return (
    <div
      className={`timer ${ready ? "ready" : ""} ${running ? "running" : ""}`}>
      {formatTime(time || lastStoppedTime)}
      {Boolean(isConfettie.current) && (
        <Confetti numberOfPieces={30} width={width} height={height} />
      )}
    </div>
  );
}

export default Timer;
