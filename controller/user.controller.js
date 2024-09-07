import mongoose from "mongoose";
import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    console.log("......");
    const accessToken = user.generateAccessToken();
    console.log(accessToken);

    const refreshToken = user.generateRefreshToken();
    console.log(refreshToken);

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, "Unable to generate Refresn and Access token");
  }
};

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

    const searchedUser = await User.findOne({
      email,
    });

    if (searchedUser) {
      throw new ApiError(400, "Email is already used!!!");
    }
  }

  if (password) {
    if (password.length < 8) {
      throw new ApiError(400, "Password must be of minimum 8 characters");
    }
  }

  try {
    const { fullName, password, email, address, phoneNumber, userImage } =
      req.body;

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
      return next(
        new ApiError(500, "Something went wrong when registering the user")
      );
    }

    return res
      .status(201)
      .json(
        new ApiResponse(201, registeredUser, "User registered successfully")
      );
  } catch (error) {
    return new ApiError(500, error.message || "Internal Server Error");
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, "Email and Password is required to login");
  }
  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(404, "User Doesn't exists");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid User credentials");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user._id
  );

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        user: loggedInUser,
        accessToken,
        refreshToken,
      },
      "User logged in successfully"
    )
  );
});

export { registerUser, loginUser };
