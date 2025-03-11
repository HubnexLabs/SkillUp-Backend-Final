import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: [true, "email is required"],
    match: [/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/],
  },
  password: { type: String, required: [true, "password is required"] },
});

export const adminModel = mongoose.model("Admin", adminSchema);
