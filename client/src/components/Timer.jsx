import React from "react";
import { useState, useEffect } from "react";
import "./Timer.css";

import { formatTime } from "../utils/formatUtils";
import CustomConfetti from "./CustomConfetti";
import { insertSolve } from "../utils/apiUtils";
import { TIME_TO_START } from "../constants/scrambleData";

import { useScramble } from "../store/ScrambleContext";
import { useDB } from "../store/DbContext";

function Timer({ setDbUpdated, running, setRunning }) {
  const [time, setTime] = useState(0);
  const [ready, setReady] = useState(false);
  const [isConfetti, setIsConfetti] = useState(false);
  const { scramble, setScramble } = useScramble();
  const { setSolves } = useDB();

  let pressTimeStart = 0,
    pressTimeEnd = 0,
    interval;

  const handleTimeStopped = async () => {
    await insertSolve(scramble, time);
    setSolves((prevSolves) => [...prevSolves, time]);
    setScramble();
    setIsConfetti(time / 100 < 10);
  };

  useEffect(() => {
    const handleKeyDown = ({ code, repeat }) => {
      if (code !== "Space") return;
      pressTimeEnd = Date.now();

      if (pressTimeStart && pressTimeEnd - pressTimeStart > TIME_TO_START) {
        setReady(true);
        setTime(0);
      } else setReady(false); //ready to start running
      if (repeat) return;
      //first press
      pressTimeStart = Date.now();
    };

    const handleSpaceUp = ({ code }) => {
      if (code !== "Space") return;
      if (running || Date.now() - pressTimeStart > TIME_TO_START)
        setRunning((ran) => !ran);
      else pressTimeStart = Date.now();
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleSpaceUp);

    if (running) {
      setIsConfetti(false);
      setTime(0);

      interval = setInterval(() => {
        setTime((prevTime) => {
          return prevTime + 1;
        });
      }, 10);
    } else if (time) handleTimeStopped();

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleSpaceUp);
      clearInterval(interval);
    };
  }, [running]);

  return (
    <div
      className={`timer ${ready ? "ready" : ""} ${running ? "running" : ""}`}>
      {formatTime(time)}
      {isConfetti === true && <CustomConfetti />}
    </div>
  );
}

export default Timer;
