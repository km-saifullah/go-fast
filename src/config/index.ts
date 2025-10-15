import dotenv from "dotenv";

dotenv.config();

export const serverPort = process.env.PORT || 8000;
export const dbURI = process.env.DATABASE_URI || "";
