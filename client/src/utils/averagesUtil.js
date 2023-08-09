export const getAverage = (averageOf, solves) => {
  if (averageOf > solves.length) return "Nan";
  const lastNSolves = solves
    .slice(-averageOf)
    .sort((a, b) => (a > b ? 1 : -1))
    .slice(1, -1);
  console.log(lastNSolves);
  const sum = lastNSolves.reduce((avg, curr) => avg + Number(curr), 0);
  return sum / lastNSolves.length;
};
