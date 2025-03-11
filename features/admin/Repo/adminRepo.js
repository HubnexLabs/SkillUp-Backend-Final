import { adminModel } from "../Schema/adminSchema.js";
import bcrypt from "bcryptjs";
export const rgisterAdmin = async (admin) => {
  try {
    const newadmin = new adminModel({
      email: admin.email,
      password: admin.hashedPassword,
    });
    const adminsave = await newadmin.save();
    return adminsave._id;
  } catch (error) {
    if (error.code === 11000) {
      // Duplicate key error code
      return { error: "Email already exists" };
    }
    console.error("Error adding document: ", error.message);
    return { error: error.message };
  }
};

export const loginAdmin = async (admin) => {
  const { id, password } = admin;
  try {
    const user = await adminModel.findOne({ _id: id });
    if (!user) {
      return { error: "User not found" };
    } else {
      const validatePassword = await bcrypt.compare(password, user.password);
      if (!validatePassword) {
        return { error: "Incorrect password" };
      } else {
        return {
          success: "login successful",
          id: user._id,
          password: user.password,
        };
      }
    }
  } catch (error) {
    console.error("Error retriving document: ", error.message);
  }
};
