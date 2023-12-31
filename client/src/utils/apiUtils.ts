import { NotInsertedToDb } from "./messagesUtil";
export const insertSolve = async (scramble: string, time: number) => {
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
    } catch (error: any) {
      console.log(error.message);
    }
  }
};

export const fetchAverage = async (averageOf: number) => {
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

export const fetchSolves = async (numberOfSolves: number) => {
  const data = await fetch(`./solves${numberOfSolves}`);
  const solves = await data.json();
  return solves;
};

export const fetchAllHistoryRecords = async () => {
  const data = await fetch(`./allHistory`);
  const history = await data.json();
  return history;
};

export const fetchLastHistoryRecord = async () => {
  const data = await fetch(`./lastHistory`);
  const lastHistory = await data.json();
  return lastHistory;
};

export const deleteSolve = async (solveToDelete: number) => {
  try {
    fetch(`/deleteSolve${solveToDelete}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error: any) {
    console.log(error.message);
  }
};
