import express, { Request, Response, NextFunction } from "express";
import { errorMessage } from "../helpers/errorMessage";
import userModel from "../models/user";
import { successMessage } from "../helpers/successMessage";

//add user
export const addUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | NextFunction> => {
  try {
    const newUserData = new userModel(req.body);
    await newUserData.save();
    res.status(201).json(successMessage(201, "user data saved successfully"));
  } catch (error) {
    if (error instanceof Error) {
      next(
        errorMessage(
          400,
          error.message,
          error.stack!,
          "/api/v0/users/add",
          error.name
        )
      );
    } else {
      next(
        errorMessage(
          400,
          "Something went wrong",
          "an unexpected error occurred while adding user",
          "/api/v0/users/add",
          "unspecifiedError"
        )
      );
    }
  }
};

//get users
export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | NextFunction> => {
  try {
    const { sort } = req.query;
    const usersData = await userModel.find().sort(`${sort || "-createdAt"}`);
    res.json({ ...successMessage(200, "user data fetched"), usersData });
  } catch (error) {
    if (error instanceof Error) {
      next(
        errorMessage(
          400,
          error.message,
          error.stack!,
          "/api/v0/users",
          error.name
        )
      );
    } else {
      next(
        errorMessage(
          400,
          "Something went wrong",
          "an unexpected error occurred while getting users",
          "/api/v0/users",
          "unspecifiedError"
        )
      );
    }
  }
};

//update user
export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | NextFunction> => {
  try {
    const { userId } = req.params;
    if (!userId)
      return next(
        errorMessage(
          404,
          "user id not provided",
          "an unexpected error occurred while updating user",
          "/api/v0/users/update/:userId",
          "RequsetError"
        )
      );

    const updatedUserData = await userModel.findByIdAndUpdate(
      userId,
      req.body,
      {
        new: true,
      }
    );
    res.json({
      ...successMessage(200, "user data updated successfully"),
      userData: updatedUserData,
    });
  } catch (error) {
    if (error instanceof Error) {
      next(
        errorMessage(
          400,
          error.message,
          error.stack!,
          "/api/v0/users/update",
          error.name
        )
      );
    } else {
      next(
        errorMessage(
          400,
          "Something went wrong",
          "an unexpected error occurred while updating user",
          "/api/v0/users/update/:userId",
          "unspecifiedError"
        )
      );
    }
  }
};

//delete user
export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | NextFunction> => {
  try {
    const { userId } = req.params;
    if (!userId)
      return next(
        errorMessage(
          404,
          "user id not provided",
          "an unexpected error occurred while deleting user",
          "/api/v0/users/delete/:userId",
          "RequsetError"
        )
      );
    await userModel.findByIdAndDelete(userId);
    res.json({
      ...successMessage(200, "user data deleted permanently"),
    });
  } catch (error) {
    if (error instanceof Error) {
      next(
        errorMessage(
          400,
          error.message,
          error.stack!,
          "/api/v0/users/delete/:userId",
          error.name
        )
      );
    } else {
      next(
        errorMessage(
          400,
          "Something went wrong",
          "an unexpected error occurred while deleting user",
          "/api/v0/users/delete/:userId",
          "unspecifiedError"
        )
      );
    }
  }
};
