import { NotInsertedToDb } from "./messagesUtil";
export const insertSolve = async (scramble, time) => {
  const data = JSON.stringify({
    scramble: scramble,
    time: time,
  });

  // ! this should be remove in production only here for convinient testing
  if (time < 500) NotInsertedToDb("solve wasn't inserted to DB");
  else {
    try {
      await fetch("/insertSolve", {
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

export const fetchAverage = async (averageOf) => {
  const data = await fetch(`./averageOf${averageOf}`);
  const average = await data.json();
  console.log("fecthed average");
  return average;
};

export const fetchBest = async () => {
  const data = await fetch(`./bestSolve`);
  const pb = await data.json();
  return pb;
};

export const fetchSolves = async (numberOfSolves) => {
  const data = await fetch(`./solves${numberOfSolves}`);
  const solves = await data.json();
  return solves;
};

export const fetchHistory = async () => {
  const data = await fetch(`./history`);
  const history = await data.json();
  return history;
};
