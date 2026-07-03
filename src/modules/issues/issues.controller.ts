import type { Request, Response } from "express";
import { issuesService } from "./issues.services";

const createIssues = async (req: Request, res: Response) => {
  try {
    const reporter_id = req.user!.id;
    const result = await issuesService.createIssuesIntoDB(
      req.body,
      reporter_id,
    );

    console.log("result", result);
    res.status(201).json({
      success: true,
      message: "Issue created successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.json({
      success: false,
      message: error.message,
      error,
    });
  }
};

const getAllIssue = async (req: Request, res: Response) => {
  try {
    const result = await issuesService.getAllIssuesFromDB();

    res.status(200).json({
      success: true,
      message: "Issues retrived successfully",
      data: result,
    });
  } catch (error: any) {
    res.json({
      success: false,
      message: error.message,
      error,
    });
  }
};

export const issuesController = {
  createIssues,
  getAllIssue,
};
