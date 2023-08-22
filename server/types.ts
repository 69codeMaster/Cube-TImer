import { Request } from "express";
export interface SolveProps {
  scramble: string;
  time: number;
}

export type ParamedRequest = Request<{ num: number }>;
