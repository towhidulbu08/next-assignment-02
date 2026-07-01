import type { Request, Response } from "express";

const createIssues = async (req: Request, res: Response) => {
  console.log("req.body", req.body);
};

export const issuesController = {
  createIssues,
};
