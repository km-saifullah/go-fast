import mongoose from "mongoose";
import bcrypt from "bcrypt";

export interface IUser extends mongoose.Document {
  fullName: string;
  email: string;
  avatar?: string;
  password: string;
  role: "user" | "admin";
  otp?: string;
  otpExpire?: Date;
  refreshToken?: string;
  comparePassword(candidatePassword: string): Promise<boolean>;
  generateAccessToken(): string;
  generateRefreshToken(): string;
}

const userSchema = new mongoose.Schema<IUser>(
  {
    fullName: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: { type: String, default: "user" },
    otp: { type: String },
    otpExpire: { type: Date },
    refreshToken: { type: String },
  },
  { timestamps: true }
);

// password hash
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// compare password
userSchema.methods.comparePassword = async function (
  candidatePassword: string
) {
  return bcrypt.compare(candidatePassword, this.password);
};

export const User = mongoose.model<IUser>("User", userSchema);
