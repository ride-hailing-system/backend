import bcrypt from "bcrypt";

import userModel, { IUser } from "../../models/userModel";
import mongoose from "mongoose";

export const getAllRidersResolver = async () => {
    try {
      const results = await userModel.find({ role: "rider" }).sort({
        createdAt: -1,
      });
      return results;
    } catch (error) {
      console.error("Error fetching all raiders:", error);
      throw new Error("Failed to fetch all raiders");
    }
  };

  export const getAllDriversResolver = async () => {
    try {
      const results = await userModel.find({ role: "driver" }).sort({
        createdAt: -1,
      });
      return results;
    } catch (error) {
      console.error("Error fetching all driver:", error);
      throw new Error("Failed to fetch all driver");
    }
  };

  export const getAllUserResolver = async () => {
    try {
      const results = await userModel.find({ role: "user" }).sort({
        createdAt: -1,
      });
      return results;
    } catch (error) {
      console.error("Error fetching all users:", error);
      throw new Error("Failed to fetch all users");
    }
  };

  export const createUserResolver = async (_: any, args: any) => {
    try {
      const { firstName, lastName, phoneNumber, role, password, email } = args;
  
      // Check if a user with the provided phone and email already exists
      let existing = await userModel.findOne({
        phoneNumber,
      });
  
      if (existing) {
        return Error("phoneNumber already exists");
      } else {
        existing = await userModel.findOne({
          email,
        });
  
        if (existing) {
          return Error("email already exists");
        } else {
          // Create a new user with all fields
          const newUser = new userModel({
            firstName,
            lastName,
            role,
            phoneNumber,
            email,
            password: await bcrypt.hash(password, 10),
          });
  
          const savedUser = await newUser.save();
  
          if (!savedUser) {
            throw new Error(
              "Failed to create user. Please try again later."
            );
          }
  
          return savedUser;
        }
      }
    } catch (error) {
      console.error("Error creating user:", error);
      throw new Error(error as any);
    }
  };

  export const updateUserResolver = async (_: any, args: any) => {
    try {
      const {
        _id,
        firstName,
        lastName,
        phoneNumber,
        role,
        photoUrl,
        email,
      } = args;
  
      let existing: any = null;
  
      existing = await userModel.findOne({
        phoneNumber: phoneNumber,
        _id: { $ne: new mongoose.Types.ObjectId(_id) },
      });
  
      if (existing) {
        return Error("phoneNumber already exists");
      } else {
        existing = await userModel.findOne({
          email: email,
          _id: { $ne: new mongoose.Types.ObjectId(_id) },
        });
  
        if (existing) {
          return Error("email already exists");
        }
      }
  
      if (!existing) {
        const updateData: Partial<IUser> = {};
        if (firstName) updateData.firstName = firstName;
        if (lastName) updateData.lastName = lastName;
        if (phoneNumber) updateData.phoneNumber = phoneNumber;
        if (email) updateData.email = email;
        if (role) updateData.role = role;
        if (photoUrl) updateData.photoUrl = photoUrl;

        const updatedUser = await userModel.findByIdAndUpdate(_id, updateData, {
          new: true,
        });
  
        if (!updatedUser) {
          throw new Error(
            "Failed to create user. Please try again later."
          );
        }
  
        return updatedUser;
      }
    } catch (error) {
      console.error("Error updating user:", error);
      throw new Error("Failed to update user");
    }
  };

  export const deleteUserResolver = async (_: any, args: any) => {
    try {
      const result = await userModel.findByIdAndDelete(args.userId);
      return result;
    } catch (error) {
      console.error("Error deleting user:", error);
      throw new Error("Failed to delete user");
    }
  };