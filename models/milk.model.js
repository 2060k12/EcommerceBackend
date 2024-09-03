import mongoose, { Schema } from "mongoose";

const milkSubsSchema = new Schema({}, { timestamps: true });

export const MilkSubs = mongoose.model("MilkSubs", milkSubsSchema);
