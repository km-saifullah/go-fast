import express from "express";
import cors from "cors";
import authRouter from "./routes/auth.routes";
import userRouter from "./routes/user.routes";
import categoryRouter from "./routes/category.routes";

import { errorHandler } from "./middlewares/error.handler";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("uploads"));
app.use(cors({ origin: "*" }));

// main route
app.get("/", (_, res) => {
  return res.send("<h3>Server is running</h3>");
});

// auth routes
app.use("/api/v1/auth", authRouter);

// user routes
app.use("/api/v1/users", userRouter);

// category routes
app.use("/api/v1/categories", categoryRouter);

// global error handler
app.use(errorHandler);

export default app;
