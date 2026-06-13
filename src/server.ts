import express, { type Request, type Response } from "express";
const app = express();
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.json({
    message: "done",
  });
});

app.listen(3000, () => {
  console.log("Server Listen on Port 3000");
});
