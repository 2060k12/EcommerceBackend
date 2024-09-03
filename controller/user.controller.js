import mongoose from "mongoose";
import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";

const registerUser = asyncHandler(async (req, res) => {
  const { fullName, password, email, address, phoneNumber, userImage } =
    req.body;

  // check if the Fields are empty
  if ([fullName, address, phoneNumber].some((field) => field?.trim() === "")) {
    throw new ApiError(
      400,
      "fullname , password, email, address and phoneNumber field cannot be empty"
    );
  }

  // check if the email is valid
  if (email) {
    const validateEmail = (email) => {
      return String(email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };

    if (!validateEmail(email)) {
      throw new ApiError(400, "Email is not valid");
    }
  }

  if (password) {
    if (password.length < 8) {
      throw new ApiError(400, "Password must be of minimum 8 characters");
    }
  }

  try {
    const user = await User.create({
      fullName,
      password,
      email,
      address,
      phoneNumber,
      userImage,
    });

    const registeredUser = await User.findById(user._id);

    if (!registeredUser) {
      throw new ApiError(500, "Something went wrong when registering the user");
    }

    return res
      .status(201)
      .json(
        new ApiResponse(201, registeredUser, "User registered successfully")
      );
  } catch (error) {
    throw new ApiError(500, "Internal Server Error");
  }
});

export { registerUser };
