import { NextResponse } from "next/server";
import prisma from "@/lib/supabase";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const { userId, newPassword } = await req.json();

    const hashed = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
      where: { id: userId },
      data: { password: hashed },
    });

    return NextResponse.json(
      { success: true, message: "Password berhasil direset" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
