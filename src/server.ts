import express from "express";
import app from "./app";
import config from "./config";
import initDB from "./db";

app.use(express.json());

const port = config.port;
const main = () => {
  initDB();

  app.listen(port, () => {
    console.log("Server Listen on Port 3000");
  });
};

main();
