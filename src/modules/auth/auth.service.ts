import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../../config";
import { pool } from "../../db";
import type { IUser } from "./auth.interface";

const createUserIntoDB = async (payload: IUser) => {
  const { name, email, password, role } = payload;

  const hashPassword = await bcrypt.hash(password, 10);

  const result = await pool.query(
    `
     INSERT INTO users(name,email,password,role) VALUES($1,$2,$3,COALESCE($4,'contributor')) RETURNING *
    `,
    [name, email, hashPassword, role],
  );

  // delete result.rows[0].password;

  return result;
};

const loginUserIntoDB = async (payload: {
  email: string;
  password: string;
}) => {
  const { email, password } = payload;

  //01.check user exist

  const userDate = await pool.query(
    `
      
       SELECT * FROM users WHERE email =$1
      
      `,
    [email],
  );

  if (userDate.rows.length === 0) {
    throw new Error("User Not Found");
  }

  //02. Compare Password

  const user = userDate.rows[0];

  const matchPassword = await bcrypt.compare(password, user.password);
  if (!matchPassword) {
    throw new Error("Invalid Credentials");
  }

  //03.Generate Token

  const jwtPayload = {
    id: user.id,
    name: user.name,
    role: user.role,
    email: user.email,
  };

  const accessToken = jwt.sign(jwtPayload, config.jwt_secret as string, {
    expiresIn: "1d",
  });
  const refreshToken = jwt.sign(jwtPayload, config.refresh_secret as string, {
    expiresIn: "7d",
  });

  return { accessToken, refreshToken };
};

export const authService = {
  createUserIntoDB,
  loginUserIntoDB,
};
