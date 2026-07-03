import type { Request, Response } from "express";
import { pool } from "../../db";
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
const loginUser = async (req: Request, res: Response) => {
  try {
    const result = await authService.loginUserIntoDB(req.body);
    const { accessToken, refreshToken } = result;
    const email = req.body.email;

    const userDate = await pool.query(
      `
      
       SELECT * FROM users WHERE email =$1
      
      `,
      [email],
    );

    delete userDate.rows[0].password;
    res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        token: accessToken,
        user: userDate.rows[0],
      },
    });
  } catch (error: any) {
    res.json({
      success: false,
      message: error.message,
      error,
    });
    // console.log(error);
  }
};

export const authController = {
  signUpUser,
  loginUser,
};
