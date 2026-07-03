import { type NextFunction, type Request, type Response } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";
import config from "../config";

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // Authorization header নেওয়া
    const authorization = req.headers.authorization as string;
    console.log("Authorization Header:", authorization);

    // Header না থাকলে
    // if (!authorization) {
    //   return res.status(401).json({
    //     success: false,
    //     message: "Unauthorized access",
    //   });
    // }

    // Bearer token থেকে token বের করা
    const token = authorization.split(" ")[1];
    console.log("token", token);

    // Token verify করা
    const decoded = jwt.verify(
      token as string,
      config.jwt_secret as string,
    ) as JwtPayload;
    console.log("decoded", decoded);

    //  Decoded payload req.user এ রাখা
    req.user = decoded;

    // পরবর্তী middleware/controller এ যাওয়া
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};
