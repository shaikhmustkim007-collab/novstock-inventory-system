import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["admin", "user"], //// Sirf ye do roles rahenge
      default: "user", // Default sab 'user' honge
    },
  },
  { timestamps: true }, // ye record karta hai kab data create huaa or kab change(update) huaa
);

const User = mongoose.model("User", userSchema);
export default User;
