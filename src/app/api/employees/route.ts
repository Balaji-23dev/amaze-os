import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search") || "";
    const departmentId = searchParams.get("departmentId") || "";
    const role = searchParams.get("role") || "";
    const status = searchParams.get("status") || "";

    const where: Record<string, unknown> = {};

    if (search) {
      where.OR = [
        { name: { contains: search } },
        { email: { contains: search } },
      ];
    }
    if (departmentId) where.departmentId = departmentId;
    if (role) where.role = role;
    if (status) where.status = status;

    const employees = await prisma.user.findMany({
      where,
      include: {
        department: { select: { id: true, name: true } },
      },
      orderBy: { name: "asc" },
    });

    return NextResponse.json({ employees });
  } catch (error) {
    console.error("GET /api/employees error:", error);
    return NextResponse.json(
      { error: "Failed to fetch employees" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, departmentId, role, title, startDate, managerId, password } = body;

    if (!name || !email || !departmentId) {
      return NextResponse.json(
        { error: "Name, email, and department are required" },
        { status: 400 }
      );
    }

    // Check if email already exists
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json(
        { error: "An employee with this email already exists" },
        { status: 409 }
      );
    }

    const hashedPassword = await hash(password || "welcome123", 12);

    const employee = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        phone: phone || null,
        departmentId,
        role: role || "EMPLOYEE",
        title: title || null,
        startDate: startDate ? new Date(startDate) : null,
        managerId: managerId || null,
      },
      include: {
        department: { select: { id: true, name: true } },
      },
    });

    return NextResponse.json({ employee }, { status: 201 });
  } catch (error) {
    console.error("POST /api/employees error:", error);
    return NextResponse.json(
      { error: "Failed to create employee" },
      { status: 500 }
    );
  }
}
