import dotenv from "dotenv";

dotenv.config();

export default {
  PORT: process.env.PORT,
  MONGO_URL: process.env.MONGO_URL,
  HARCODE_USRS_PASS:process.env.HARCODE_USRS_PASS,
  SECRET_CODE: process.env.SECRET_CODE,
  JWT_SECRET_CODE:process.env.JWT_SECRET_CODE
};
