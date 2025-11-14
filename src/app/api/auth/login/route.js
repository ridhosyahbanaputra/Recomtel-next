import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function POST(request) {
  try {
    await dbConnect();
    const { email, password } = await request.json();

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { message: "Email atau password salah" },
        { status: 401 }
      );
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return NextResponse.json(
        { message: "Email atau password salah" },
        { status: 401 }
      );
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" } // Token berlaku selama 1 jam
    );

    return NextResponse.json(
      {
        message: "Login berhasil",
        token,
        user: { name: user.nama, email: user.email },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Terjadi kesalahan server", error: error.message },
      { status: 500 }
    );
  }
}
