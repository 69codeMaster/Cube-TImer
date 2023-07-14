import express from "express";
import cors from "cors";
import { addSolveToDB } from "./databasepg.js";

const app = express();

//middleware
app.use(cors());
app.use(express.json());

//routes
app.post("/solves", async (req, res) => {
  try {
    const result = await addSolveToDB(req.body);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//add solve
// app.get("/solves", (_, res) => res.json("use the fucking post"));
app.get("/api", (req, res) => {
  res.json({ solves: ["12.3", "15.6", "10.2", "6.99"] });
});

app.listen(5000, () => console.log("server strated at port 5000"));
