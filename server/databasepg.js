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
  const query = `SELECT time
                  FROM solves
                  ORDER BY solve_id DESC
                  LIMIT $1;`;

  const values = [numberOfSolves];
  let average = 0;

  let times = await pool.query(query, values);
  let min = Infinity,
    max = 0;

  for (let { time } of times.rows) {
    time = Number(time);
    if (Number(time) > max) max = time;
    if (Number(time) < min) min = time;
    average += time;
  }

  average -= min + max;
  return average / (numberOfSolves - 2);
}
