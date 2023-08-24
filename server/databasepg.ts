import pg, { Query, QueryResult, QueryResultRow } from "pg";
import { HistoryRecord, SolveProps, SolveRecord } from "./types";
const { Pool } = pg;

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  database: "postgres",
  port: 5432,
  password: "yoav1234",
});

export async function addSolveToDB({ scramble, time }: SolveProps) {
  const query =
    'INSERT INTO main_schema.solves(scramble, "time", date) VALUES ($1, $2,CURRENT_DATE) RETURNING *';
  const values = [scramble, time];
  return await pool.query(query, values);
}

export async function getSolves(numberOfSolves: number = 15) {
  const query = ` SELECT time
                  FROM main_schema.solves
                  ORDER BY solve_id
                  LIMIT $1`;

  const values = [numberOfSolves];

  const result: QueryResult<{ time: number }> = await pool.query(query, values);

  return result.rows;
}

export async function getBestSolve(): Promise<SolveRecord | null> {
  const query = `SELECT *
                 FROM main_schema.solves
                 ORDER BY time ASC
                 LIMIT 1;`;

  const result: QueryResult<SolveRecord> = await pool.query(query);
  return result?.rows[0] ?? null;
}

export async function getAvergaeOf(
  numberOfSolves: number
): Promise<number | "Nan"> {
  const query = `SELECT count(*) AS num_of_rows, (SUM(time) - MIN(time) - MAX(time)) AS average
                  FROM (SELECT time, solve_id
                        FROM main_schema.solves
                        order by solve_id desc
                        LIMIT $1
                        ) as avg_table;`;

  const values = [numberOfSolves];

  const result = await pool.query(query, values);

  console.log(+result.rows[0].num_of_rows, numberOfSolves);

  if (+result.rows[0].num_of_rows < numberOfSolves) return "Nan";

  return +result.rows[0].average / (numberOfSolves - 2);
}

export async function getHistory(): Promise<HistoryRecord[]> {
  const query = `SELECT *
                  FROM history_schema.history
                  ORDER BY solve_id;`;

  const result: QueryResult<HistoryRecord> = await pool.query(query);

  return result.rows;
}
