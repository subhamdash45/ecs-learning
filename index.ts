import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/cpu", (req, res) => {
  for (let i = 0; i < 1000000; i++) {
    Math.random();
  }
  res.send("/cpu is coming correctly");
});

app.listen(3000);
