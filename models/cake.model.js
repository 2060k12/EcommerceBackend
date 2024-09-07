import mongoose, { Schema } from "mongoose";

const cakeSchema = new Schema(
  {
    displayName: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },

    imageUrl: {
      type: String,
      required: false,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

export const Cake = mongoose.model("Cake", cakeSchema);
