import { Request } from "express";
export interface SolveProps {
  scramble: string;
  time: number;
}

export type GetSolvesParam = Request<{ num: number }>;
export type DeleteSolveParam = Request<{ solve_id: number }>;

export interface SolveRecord {
  scramble: string;
  time: number;
  date: Date;
  solve_id: number;
}
export interface HistoryRecord extends SolveRecord {
  averae: number;
}
