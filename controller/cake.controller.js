import mongoose from "mongoose";
import { Cake } from "../models/cake.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";

// add a new cake to the database
const uploadCake = asyncHandler(async (req, res) => {
  const { displayName, price, imageUrl, description } = req.body;

  if (!price) {
    throw new ApiError(400, "Price cannot be null");
  }

  if (typeof price != "number") {
    throw new ApiError(400, "Price should be number");
  }
  if (displayName.trim() === "" || imageUrl.trim() === "") {
    throw new ApiError(400, "Cake's Display Name and Image are mandatory");
  }

  const cake = await Cake.create({
    displayName,
    imageUrl,
    price,
    description,
  });

  return res
    .status(201)
    .json(new ApiResponse(200, cake, "Successfully added Cake"));
});

// get all cakes from the database
const getAllCakes = asyncHandler(async (req, res) => {
  try {
    const cakes = await Cake.find({});
    return res.status(200).json(new ApiResponse(200, cakes));
  } catch (err) {
    throw new ApiError(400, "Error getting ALl Cakes from the database.", err);
  }
});

// search cake from id
const getCakeById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Invalid Cake Id");
  }

  const cake = await Cake.findById(id);

  if (!cake) {
    new ApiError(404, "Cake not found!");
  }

  return res.status(200).json(new ApiResponse(200, cake));
});

export { uploadCake, getAllCakes, getCakeById };
