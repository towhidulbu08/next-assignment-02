import type { Request, Response } from "express";
import { authService } from "./auth.service";

const signUpUser = async (req: Request, res: Response) => {
  try {
    const result = await authService.createUserIntoDB(req.body);
    // console.log("result", result);
    res.status(201).json({
      success: true,
      message: "User registered successfully",
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

export const authController = {
  signUpUser,
};
