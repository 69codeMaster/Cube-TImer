import express from "express";
import cors from "cors";
import {
  addSolveToDB,
  getAvergaeOf,
  getBestSolve,
  getSolves,
  getAllHistory,
  getLastHistoryRecord,
} from "./databasepg.js";
import { ParamedRequest } from "./types.js";
const app = express();

//middleware
app.use(cors());
app.use(express.json());

//routes
app.post("/insertSolve", async (req, res) => {
  try {
    const result = await addSolveToDB(req.body);
    res.status(201).json(result.rows[0]);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
    console.error(err.message);
  }
});

// no longer in use
app.get("/averageOf:num", async (req: ParamedRequest, res) => {
  try {
    const result = await getAvergaeOf(req.params.num);
    res.status(201).json(result);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
    console.error(err.message);
  }
});

app.get("/bestSolve", async (req, res) => {
  try {
    const result = await getBestSolve();

    res.status(201).json(result);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
    console.error(err.message);
  }
});

app.get("/solves:num", async (req: ParamedRequest, res) => {
  try {
    const result = await getSolves(req.params.num);
    res.status(201).json(result);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
    console.error(err.message);
  }
});

app.get("/allHistory", async (req, res) => {
  try {
    const result = await getAllHistory();
    res.status(201).json(result);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
    console.error(err.message);
  }
});

app.get("/lastHistory", async (req, res) => {
  try {
    const result = await getLastHistoryRecord();
    res.status(201).json(result);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
    console.error(err.message);
  }
});

app.listen(5000, () => console.log("server strated at port 5000"));
