import mongoose, { Schema, Types } from "mongoose";

export interface ICategory extends mongoose.Document {
  categoryName: string;
  subCategories: Types.ObjectId[];
}

const categorySchema = new Schema(
  {
    categoryName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    subCategory: {
      type: Schema.Types.ObjectId,
      ref: "SubCategory",
    },
  },
  { timestamps: true }
);

const Category = mongoose.model<ICategory>("Category", categorySchema);

export default Category;
