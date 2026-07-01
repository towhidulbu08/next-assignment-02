import express, { type Request, type Response } from "express";
import { authroute } from "./modules/auth/auth.route";
import { issuesRoute } from "./modules/issues/issues.routes";

const app = express();

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.json({
    message: "done",
  });
});

app.use("/api/auth", authroute);
app.use("/api/issues", issuesRoute);

export default app;
