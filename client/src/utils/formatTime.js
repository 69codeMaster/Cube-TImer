export const formatTime = (timeValue) => {
  const milliseconds = String(timeValue % 100).padStart(2, "0");
  const seconds = String(Math.floor((timeValue / 100) % 60)).padStart(2, "0");
  const minutes = String(Math.floor(timeValue / 6000)).padStart(2, "0");

  return `${minutes}:${seconds}.${milliseconds}`;
};

export const formatAverage = (average) => {
  average = String(average).split(".")[0];

  return (
    average.substring(0, average.length / 2) +
    "." +
    average.substring(average.length / 2, average.length / 2 + 2)
  );
};
