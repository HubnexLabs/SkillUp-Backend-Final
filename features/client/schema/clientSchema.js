import mongoose from "mongoose";

const clientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is required"],
    minLength: [3, "The name should be at least 3 characters long"],
  },
  email: {
    type: String,
    unique: true,
    required: [true, "email is required"],
    match: [/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/],
  },
  phone: {
    type: String,
    unique: true,
    required: [true, "mobile number is reuired"],
  },
  qualification: {
    type: String,
    required: [true, "qualification is required"],
  },
  message: {
    type: String,
    maxLength: [200, "The message should be at most 200 characters long"],
  },
});

export const ClientModel = mongoose.model("client", clientSchema);
