import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

export async function POST(request) {
  try {
    const supabase = getSupabase();

    if (!supabase) {
      return NextResponse.json(
        { message: "Konfigurasi Supabase tidak lengkap" },
        { status: 500 }
      );
    }

    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email dan password harus diisi" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }

    return NextResponse.json(
      {
        message: "Login berhasil",
        user: data.user,
        session: data.session,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("Login Error:", err);
    return NextResponse.json(
      { message: "Terjadi kesalahan server" },
      { status: 500 }
    );
  }
}
