import mongoose, { Schema } from "mongoose";

const orderSchema = new Schema(
  {
    orderItems: {
      type: Schema.Types.ObjectId,
      ref: "Cake",
    },

    orderedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export const Order = mongoose.model("Order", orderSchema);
