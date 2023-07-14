const express = require("express");
const app = express();

app.get("/api", (req, res) => {
  res.json({ solves: ["12.3", "15.6", "10.2", "6.99"] });
});

app.listen(5000, () => console.log("server strated at port 5000"));
