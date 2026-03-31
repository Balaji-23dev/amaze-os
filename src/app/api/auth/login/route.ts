import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// Demo credentials
const DEMO_PASSWORDS: Record<string, string> = {
  "basha@amazetech.net": "admin123",
};

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        department: { select: { id: true, name: true } },
      },
    });

    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    // Demo: check known passwords, or default "welcome123" for employees
    const expectedPassword = DEMO_PASSWORDS[email] || "welcome123";
    if (password !== expectedPassword) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    return NextResponse.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        department: user.department,
      },
    });
  } catch (error) {
    console.error("POST /api/auth/login error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
