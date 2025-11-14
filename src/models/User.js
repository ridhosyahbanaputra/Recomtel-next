import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    nama: {
      type: String,
      required: [true, "Nama lengkap diperlukan."],
    },
    email: {
      type: String,
      required: [true, "Email diperlukan."],
      unique: true, 
      match: [/.+\@.+\..+/, "Email tidak valid."],
    },
    password: {
      type: String,
      required: [true, "Password diperlukan."],
    },
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);
