import React from "react";
import { useState, useEffect } from "react";
import "./Timer.css";

import { formatTimer } from "../utils/formatUtils";
import CustomConfetti from "./CustomConfetti";
import { insertSolve } from "../utils/apiUtils";
import { TIME_TO_START } from "../constants/scrambleData";

import { useScramble } from "../store/ScrambleContext";
import { useDB } from "../store/DbContext";

function Timer({ ready, setReady, running, setRunning }) {
  const [time, setTime] = useState(0);
  const [isConfetti, setIsConfetti] = useState(false);
  const { scramble, setScramble } = useScramble();
  const { setSolves } = useDB();

  let pressTimeStart = 0,
    pressTimeEnd = 0,
    interval;

  const handleTimeStopped = async () => {
    await insertSolve(scramble, time);
    // ! delete on prod
    if (time > TIME_TO_START) {
      setSolves((prevSolves) => [time, ...prevSolves]);
      setIsConfetti(time / 100 < 10);
    }
    setScramble();
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
      setReady(false);
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
      {formatTimer(time)}
      {isConfetti && <CustomConfetti />}
    </div>
  );
}

export default Timer;
