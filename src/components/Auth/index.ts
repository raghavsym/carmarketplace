import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import app from "../../config/server/server";
import AuthService from "./service";
import HttpError from "../../config/error";
import { IUserModel } from "../User/model";

/**
 * Register new user
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise < void >}
 */
export async function signup(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const user: IUserModel = await AuthService.createUser(req.body);
    const token: string = jwt.sign({ email: user.email }, app.get("secret"), {
      expiresIn: "60m",
    });

    res.json({
      status: 200,
      logged: true,
      token,
      message: "Sign in successfull",
    });
  } catch (error) {
    if (error.code === 500) {
      return next(new HttpError(error.message.status, error.message));
    }
    res.json({
      status: 400,
      message: error.message,
    });
  }
}

/**
 * Login route that generates JWT
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise < void >}
 */
export async function login(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const user: IUserModel = await AuthService.getUser(req.body);
    const token: string = jwt.sign(
      { email: user.email, userId: user._id.toString() },
      app.get("secret"),
      {
        expiresIn: "60m",
      }
    );
    const refreshToken = jwt.sign(
      { email: user.email, userId: user._id.toString() },
      app.get("secret"),
      { expiresIn: "7d" }
    );

    // Set the JWT as an HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true, // Prevents JavaScript access to the cookie
      secure: false, // Ensures the cookie is sent over HTTPS only
      sameSite: "lax", // Prevents CSRF attacks by restricting cross-site cookie sending.
      expires: new Date(Date.now() + 225892000000)
    });

    // Optional: Set a refresh token as a separate cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      expires: new Date(Date.now() + 225892000000)
    });

    res.status(200).json({
      logged: true,
      message: "Sign in successful",
      userInfo: { name: user.name, email: user.email, location: user.location },
    });
  } catch (error) {
    if (error.code === 500) {
      return next(new HttpError(error.message.status, error.message));
    }

    res.status(400).json({
      message: error.message,
    });
  }
}

/**
 * Logout route to clear cookies
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise < void >}
 */
export async function logout(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  res.clearCookie("token");
  res.clearCookie("refreshToken");
  res.status(200).json({ message: "Logged out" });
}
