import React from "react";
import { useState, useEffect } from "react";
import Confetti from "react-confetti";
import { useWindowSize } from "@uidotdev/usehooks";

import "./Timer.css";
import { formatTime } from "../utils/formatTime";

const TIME_TO_START = 500;

function Timer({
  running,
  setRunning,
  scramble,
  handleTimeStopped: updateScramble,
}) {
  
  const [time, setTime] = useState(0);
  const [ready, setReady] = useState(false);
  const { width, height } = useWindowSize();
  const [isConfettie, setIsConfettie] = useState(false);
  let pressTimeStart, pressTimeEnd; //check how long the space bar was pressed
  let interval;
  let lastStoppedTime = 0;

  const handleTimeStopped = async (time) => {
    setReady(false);
    if (time) {
      lastStoppedTime = time;
      setIsConfettie(lastStoppedTime && lastStoppedTime / 100 < 10);
      updateScramble();

      const url = "http://localhost:5000/solves";
      const data = JSON.stringify({
        scramble: scramble,
        time: time,
      });

      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: data,
        });
      } catch (error) {
        console.log(error.message);
      }
    }
  };

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
        else pressTimeStart = Date.now();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleSpaceUp);

    if (running) {
      setIsConfettie(false);
      setTime(0);

      interval = setInterval(() => {
        setTime(function (prevTime) {
          return prevTime + 1;
        });
      }, 10);
    } else {
      handleTimeStopped(time);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleSpaceUp);
      clearInterval(interval);
    };
  }, [running]);

  return (
    <div
      className={`timer ${ready ? "ready" : ""} ${running ? "running" : ""}`}>
      {formatTime(time || lastStoppedTime)}
      {Boolean(isConfettie) && (
        <Confetti numberOfPieces={30} width={width} height={height} />
      )}
    </div>
  );
}

export default Timer;
