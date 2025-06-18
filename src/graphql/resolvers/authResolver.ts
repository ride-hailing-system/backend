import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dayjs from "dayjs";
import { Types } from "mongoose";
import userModel from "../../models/userModel";

export const getCurrentDateResolver = async (_: any, args: any) => {
  try {
    const currentDate: string = dayjs().format("YYYY-MM-DD");

    return { text: currentDate, value: currentDate };
  } catch (error: any) {
    throw new Error(error);
  }
};

export const currentTimeStamp = () => {
  return dayjs().format("YYYY-MM-DDTHH:mm:ssZ");
};

export const getToken = async (value: string) => {
  if (!process.env.SESSION_SECRET) {
    throw new Error("SESSION_SECRET is not defined in environment variables");
  }
  const token = await jwt.sign({ userId: value }, process.env.SESSION_SECRET, {
    expiresIn: "1h",
  });

  return token;
};

export const loginResolver = async (
  _: any,
  args: any,
) => {
  try {
    const { phoneNumber, password } = args;

    const user: any = await userModel.findOne({ phoneNumber }).lean();

    if (!user) {
      throw new Error("user not found");
    }

    // Verify password using bcrypt
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Incorrect password");
    }

    // get token
    const token = getToken(user?._id);

    return { ...user, token };
  } catch (error: any) {
    throw new Error(error);
  }
};

export const resetPasswordResolver = async (_: any, args: any) => {
  try {
    const { _id, password } = args;

    const hashedPassword = await bcrypt.hash(password, 10);

    const updatedUser = await userModel.findByIdAndUpdate(
      new Types.ObjectId(_id),
      {
        password: hashedPassword,
      },
      {
        new: true,
      }
    ).lean();

    if (!updatedUser) {
      throw new Error(
        "Error occurred while updating the password. Please try again later."
      );
    }

    return updatedUser;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const changePasswordResolver = async (_: any, args: any) => {
  try {
    const { _id, oldPassword, password } = args;

    const user = await userModel.findById({ _id }).lean();

    if (!user) {
      throw new Error("User not found");
    }

    // Verify password using bcrypt
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      throw new Error("Incorrect old password");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const updatedUser = await userModel.findByIdAndUpdate(
      new Types.ObjectId(_id),
      {
        password: hashedPassword,
      },
      {
        new: true,
      }
    ).lean();

    if (!updatedUser) {
      throw new Error(
        "Error occurred while updating the password. Please try again later."
      );
    }

    return updatedUser;
  } catch (error: any) {
    throw new Error(error);
  }
};




