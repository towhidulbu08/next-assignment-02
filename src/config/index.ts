import dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: path.resolve(process.cwd(), ".env"),
});

const config = {
  c_str: process.env.DB_STRING as string,
  port: process.env.PORT,
  jwt_secret: process.env.JWT_SECRET,
  refresh_secret: process.env.REF_SECRET,
};

export default config;
