import { customPaginate } from "../../utils/customPaginate.js";
import { failure, success } from "../../utils/responseHandler.js";
import User from "./user.model.js";

export const getUserProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId).select("-password -otp");
    if (!user) {
      return res.status(404).json(
        failure({
          message: "User not found",
          code: "NOT_FOUND",
          details: "User not found with this token",
        })
      );
    }
    return res.status(200).json(
      success({
        data: user,
        message: "User fetched successfully",
        code: "USER_FETCH_SUCCESS",
      })
    );
  } catch (err) {
    return res.status(500).json(
      failure({
        message: err.message,
        code: "SERVER_ERROR",
        details: err,
      })
    );
  }
};

export const getSingleUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password -otp");
    if (!user) return res.status(404).json({ message: "User not found" });

    return res.status(200).json(
      success({
        data: user,
        message: "User fetched successfully",
        code: "USER_FETCH_SUCCESS",
      })
    );
  } catch (err) {
    return res.status(500).json(
      failure({
        message: err.message,
        code: "SERVER_ERROR",
        details: err,
      })
    );
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const data = await customPaginate(User, {}, { page: 1, limit: 10 }, []);
    // const users = await User.find().select("-password -otp");

    return res.status(200).json(
      success({
        data: data,
        message: "Users fetched successfully",
        code: "USERS_FETCH_SUCCESS",
      })
    );
  } catch (err) {
    return res.status(500).json(
      failure({
        message: err.message,
        code: "SERVER_ERROR",
        details: err,
      })
    );
  }
};
