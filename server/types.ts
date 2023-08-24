import { Request } from "express";
export interface SolveProps {
  scramble: string;
  time: number;
}

export type ParamedRequest = Request<{ num: number }>;

export interface SolveRecord {
  scramble: string;
  time: number;
  date: Date;
  solve_id: number;
}
export interface HistoryRecord extends SolveRecord {
  averae: number;
}

