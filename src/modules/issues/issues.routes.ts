import { Router } from "express";
import { verifyToken } from "../../middleware/verifyToken";
import { issuesController } from "./issues.controller";

const router = Router();

router.post("/", verifyToken, issuesController.createIssues);
router.get("/", issuesController.getAllIssue);

export const issuesRoute = router;
