export const formatTimer = (timeValue) => {
  const milliseconds = String(timeValue % 100).padStart(2, "0");
  const seconds = String(Math.floor((timeValue / 100) % 60)).padStart(2, "0");
  const minutes = String(Math.floor(timeValue / 6000)).padStart(2, "0");

  return `${minutes}:${seconds}.${milliseconds}`;
};

export const formatAverage = (average) => {
  if (typeof average === "string") return average;
  return (average / 100).toFixed(2);
};
