import jwt from "jsonwebtoken";
import { promisify } from "util";
import AppError from "../utils/appError.js";
import User from "../models/userModel.js";

export const protect = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies.jwt) {
      token = req.cookies.jwt;
    }

    if (!token) {
      return next(new AppError("Login to get access", 401));
    }

    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      return next(
        new AppError("The suer with this token, no longer exists", 401)
      );
    }
    req.user = currentUser;
    res.locals.user = currentUser;
    next();
  } catch (error) {
    return next(error);
  }
};
