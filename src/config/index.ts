import dotenv from "dotenv";

dotenv.config();

export const serverPort = process.env.PORT || 8000;
export const dbURI = process.env.DATABASE_URI || "";

export const accessSecret = process.env.ACCESS_SECRET || "";
export const refreshSecret = process.env.REFRESH_SECRET || "";
