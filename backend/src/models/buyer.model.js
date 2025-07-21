import mongoose from "mongoose";

const addressSchema = mongoose.Schema({
  street: {
    type: String,
    required: true,
    default: "",
  },
  city: {
    type: String,
    required: true,
    default: "",
  },
  pin : {
    type: Number,
    required: true,
    default: 0,
  },
  state : {
    type: String,
    required: true,
    default: "",
  },
});

const buyerSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default: "avatar.jpg",
    },
    refreshToken: {
      type : String,
      require: true
    }, 
    address: addressSchema,
  },
  { timestamps: true }
);

export const buyerModel = mongoose.model("buyer", buyerSchema);
