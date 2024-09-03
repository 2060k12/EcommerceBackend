import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs/dist/bcrypt.js";

const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    password: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      index: true,
      lowercase: true,
      index: true,
      unique: true,
    },

    address: {
      type: String,
      required: String,
    },
    phoneNumber: {
      type: String,
      required: String,
    },

    userImage: {
      type: String,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methodsisPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

export const User = mongoose.model("User", userSchema);
