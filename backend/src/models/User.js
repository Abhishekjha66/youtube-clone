import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },

    password: {
      type: String,
      required: true,
      minlength: 6
    },

    avatar: {
      type: String,
      default: ""
    },

    // ⭐ NEW FIELD — required for Subscriptions Page
    subscriptions: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Channel" }
    ]
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
