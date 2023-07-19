import express from "express";
import cors from "cors";
import { addSolveToDB, getAvergaeOf } from "./databasepg.js";

const app = express();

//middleware
app.use(cors());
app.use(express.json());

//routes
app.post("/solves", async (req, res) => {
  try {
    const result = await addSolveToDB(req.body);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.error(err.message);
  }
});

app.get("/averageOf", async (req, res) => {
  try {
    const result = await getAvergaeOf(req.body);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.error(err.message);
  }
});

//add solve
// app.get("/solves", (_, res) => res.json("use the fucking post"));

app.listen(5000, () => console.log("server strated at port 5000"));
