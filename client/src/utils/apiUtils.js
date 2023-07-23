export const insertSolveAPI = async (scramble, time) => {
  const data = JSON.stringify({
    scramble: scramble,
    time: time,
  });

  try {
    const response = await fetch("/solves", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: data,
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const fetchAverage = async (averageOf, setAverage) => {
  const data = await fetch(`./averageOf:${averageOf}`);
  const average = await data.json();
  setAverage(average);
};
