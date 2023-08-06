export const insertSolve = async (scramble, time, update) => {
  const data = JSON.stringify({
    scramble: scramble,
    time: time,
  });

  try {
    await fetch("/insertSolve", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: data,
    });

    console.log("solve inserted to db");
    update();
  } catch (error) {
    console.log(error.message);
  }
};

export const fetchAverage = async (averageOf) => {
  const data = await fetch(`./averageOf:${averageOf}`);
  const average = await data.json();
  console.log("fecthed average");
  return average;
};

export const fetchBest = async () => {
  const data = await fetch(`./bestSolve`);
  const pb = await data.json();
  console.log("fecthed best");
  return pb;
};

export const fetchSolves = async (numberOfSolves) => {
  const data = await fetch(`./solves:${numberOfSolves}`);
  const solves = await data.json();
  console.log("fecthed solves");
  return solves;
};
