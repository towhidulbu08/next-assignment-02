import express, { type Request, type Response } from "express";
import config from "./config";
import initDB from "./db";
const app = express();
app.use(express.json());

const port = config.port;
const main = () => {
  initDB();

  app.get("/", (req: Request, res: Response) => {
    res.json({
      message: "done",
    });
  });

  app.listen(port, () => {
    console.log("Server Listen on Port 3000");
  });
};

main();
