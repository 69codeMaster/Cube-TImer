import express from "express";
import cors from "cors";
import {
  addSolveToDB,
  getAvergaeOf,
  getBestSolve,
  getSolves,
} from "./databasepg.js";

const app = express();

//middleware
app.use(cors());
app.use(express.json());

//routes
app.post("/insertSolve", async (req, res) => {
  try {
    const result = await addSolveToDB(req.body);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.error(err.message);
  }
});

app.get("/averageOf:num", async (req, res) => {
  try {
    const result = await getAvergaeOf(req.params.num.split(":")[1]);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.error(err.message);
  }
});

app.get("/bestSolve", async (req, res) => {
  try {
    const result = await getBestSolve();
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.error(err.message);
  }
});

app.get("/solves:num", async (req, res) => {
  try {
    const result = await getSolves(req.params.num.split(":")[1]);
    res.status(201).json(result.rows.map(({ time }) => time));
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.error(err.message);
  }
});
app.listen(5000, () => console.log("server strated at port 5000"));
