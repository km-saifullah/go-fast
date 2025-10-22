import { NextFunction, Request, Response } from "express";
import { User } from "../models/user.model";
import { AppError } from "../utils/AppError";

// get all users
// GET /api/v1/users/
export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await User.find().select(
      "-__v -password -createdAt -updatedAt -refreshToken"
    );

    return res.status(200).json({
      status: true,
      statusCode: 200,
      message: "Fetch all users successfully!",
      users: users,
    });
  } catch (error) {
    next(error);
  }
};

// get a single user
// GET /api/v1/user/:id
export const getSingleUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params;
    const user = await User.findById({ id });

    if (!user) {
      throw new AppError("User not found", 400);
    }

    return res.status(200).json({
      status: true,
      statusCode: 200,
      message: "Fetch single user data successfully",
      user: user,
    });
  } catch (error) {
    next(error);
  }
};
