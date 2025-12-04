import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request) {
  try {
    const { nama, email, password } = await request.json();

    if (!nama || !email || !password) {
      return NextResponse.json(
        { message: "Semua field harus diisi" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { nama }, // masuk ke user_metadata
      },
    });

    if (error) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }

    return NextResponse.json(
      {
        message: "Register berhasil",
        user: data.user,
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("Register Error:", err);
    return NextResponse.json(
      { message: "Terjadi kesalahan server" },
      { status: 500 }
    );
  }
}
