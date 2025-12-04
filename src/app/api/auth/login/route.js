import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return NextResponse.json(
        { message: "Email atau password salah" },
        { status: 401 }
      );
    }
    return NextResponse.json(
      {
        message: "Login berhasil",
        user: {
          id: data.user.id,
          email: data.user.email,
          nama: data.user.user_metadata?.nama || null,
        },
        session: data.session,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("Login Error:", err);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
