export type solve = {
  solve_id: number;
  time: number;
};

export type average = {
  ao5?: number;
  ao12?: number;
};

export type history = solve & average;

export type DbContextType = {
  solves: solve[];
  setSolves: React.Dispatch<React.SetStateAction<any>>;
  averages: average;
  setAverages: React.Dispatch<React.SetStateAction<any>>;
  history: solve[];
};
