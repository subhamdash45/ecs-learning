import express from "express";
import os from "os";

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

app.get("/host", (req, res) => {
  res.send(os.hostname());
});

app.listen(3000);
