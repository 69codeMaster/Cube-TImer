export const insertSolveAPI = async (scramble, time, setDbUpdated) => {
  const data = JSON.stringify({
    scramble: scramble,
    time: time,
  });

  try {
    await fetch("/solves", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: data,
    });

    console.log("solve inserted to db");
    setDbUpdated(true);
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
