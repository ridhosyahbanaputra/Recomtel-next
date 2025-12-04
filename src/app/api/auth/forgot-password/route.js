import { NextResponse } from "next/server";
import prisma from "@/lib/supabase";

export async function POST(req) {
  try {
    const { email } = await req.json();

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "Email tidak ditemukan" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Email ditemukan", userId: user.id },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
