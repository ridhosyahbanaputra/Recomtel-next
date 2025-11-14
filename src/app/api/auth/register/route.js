import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect"; 
import User from "@/models/User";
import bcrypt from "bcrypt";

export async function POST(request) {
  try {
    await dbConnect(); 
    const { nama, email, password } = await request.json();

    if (!nama || !email || !password) {
      return NextResponse.json(
        { message: "Semua field harus diisi" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10); 

    const newUser = new User({
      nama,
      email,
      password: hashedPassword, 
    });

    await newUser.save();

    return NextResponse.json(
      { message: "User berhasil dibuat" },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    if (error.code === 11000) {
      return NextResponse.json(
        { message: "Email sudah terdaftar" },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { message: "Terjadi kesalahan server", error: error.message },
      { status: 500 }
    );
  }
}
