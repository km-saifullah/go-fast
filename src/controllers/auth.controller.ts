import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/AppError";
import { User } from "../models/user.model";
import { isValidEmail } from "../utils/email.validator";

// signup user
// POST /api/v1/auth/signup
export const signupUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password)
      throw new AppError("All fields are required", 400);

    if (!isValidEmail(email)) throw new AppError("Invalid email format", 400);

    if (password.length < 6)
      throw new AppError("Password must be at least 6 characters", 400);

    const existingUser = await User.findOne({ email });

    if (existingUser) throw new AppError("Email already registered", 400);

    const newUser = new User({
      fullName,
      email,
      password,
    });

    await newUser.save();

    return res.status(201).json({
      status: true,
      statusCode: 201,
      message: "User registered successfully",
      user: newUser,
    });
  } catch (error) {
    next(error);
  }
};

// login user
// POST /api/v1/login
export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);

    if (!email || !password) {
      throw new AppError("Please provide email and password", 400);
    }

    const user = await User.findOne({ email: email });
    if (!user) throw new AppError("User not found", 400);

    const isMatch = await user.comparePassword(password);
    if (!isMatch) throw new AppError("Invalid email and password", 400);

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save();

    return res.status(200).json({
      status: true,
      statusCode: 200,
      message: "Login successful",
      accessToken,
      refreshToken,
      user: {
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        avatar: user.avatar || null,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
};
