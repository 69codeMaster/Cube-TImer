import pg from "pg";
const { Pool } = pg;

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  database: "postgres",
  port: 5432,
  password: "yoav1234",
});

export async function addSolveToDB({ scramble, time }) {
  const query =
    'INSERT INTO solves(scramble, "time", date) VALUES ($1, $2,CURRENT_DATE) RETURNING *';
  const values = [scramble, time];
  return await pool.query(query, values);
}

export async function getPB() {}

export async function getAvergaeOf(numberOfSolves) {
  const query = `SELECT AVG(time) AS average_time
                  FROM (
                  SELECT time
                  FROM solves
                  ORDER BY solve_id DESC
                  LIMIT $1
                ) AS last_$1_solves;`;

  const query2 = `SELECT time
                  FROM solves
                  ORDER BY solve_id DESC
                  LIMIT $1;`;

  const values = [numberOfSolves];
  let average = 0;

  let times = await pool.query(query2, values);
  for (const { time } of times.rows) {
    average += Number(time);
  }
  return average / numberOfSolves;
}
