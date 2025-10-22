import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/AppError";
import Category from "../models/category.model";

// create category
// POST /api/v1/categories
export const createCatedory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { categoryName, subCategory } = req.body;

    if (!categoryName) throw new AppError("Category Name is required!", 400);

    const categoryExist = await Category.find({ categoryName: categoryName });
    console.log(categoryExist);
    if (categoryExist.length > 0)
      throw new AppError("Category already exist", 400);

    const category = await Category.create({
      categoryName,
      subCategory,
    });

    return res.status(201).json({
      status: true,
      statusCode: 201,
      message: "Category created successfully",
      categoryr: category,
    });
  } catch (error) {
    return next(error);
  }
};
