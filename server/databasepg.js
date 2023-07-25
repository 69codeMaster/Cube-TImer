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

export async function getBestSolve() {
  const query = `SELECT *
                 FROM solves
                 ORDER BY time ASC
                 LIMIT 1;`;

  const query_returned_value = await pool.query(query);

  return query_returned_value.rows[0];
}

export async function getAvergaeOf(numberOfSolves) {
  const query = `SELECT count(solve_id) AS num_of_rows, (SUM(time) - MIN(time) - MAX(time)) AS average
                  FROM (SELECT time, solve_id
                        FROM solves
                        order by solve_id desc
                        limit $1
                        ) as avg_table;`;

  const values = [numberOfSolves];

  const query_returned_value = await pool.query(query, values);

  if (+query_returned_value.rows[0].num_of_rows < numberOfSolves) return "Nan";

  return +query_returned_value.rows[0].average / (numberOfSolves - 2);
}
