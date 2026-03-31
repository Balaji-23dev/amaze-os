import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search");
    const departmentId = searchParams.get("departmentId");
    const status = searchParams.get("status");
    const role = searchParams.get("role");

    const where: Record<string, unknown> = {};

    if (search) {
      where.OR = [
        { name: { contains: search } },
        { email: { contains: search } },
        { title: { contains: search } },
      ];
    }
    if (departmentId) where.departmentId = departmentId;
    if (status) where.status = status;
    if (role) where.role = role;

    const employees = await prisma.user.findMany({
      where,
      include: {
        department: {
          select: { id: true, name: true, color: true },
        },
      },
      orderBy: { name: "asc" },
    });

    return NextResponse.json({ employees });
  } catch (error) {
    console.error("GET /api/employees error:", error);
    return NextResponse.json({ error: "Failed to fetch employees" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, departmentId, title, role, startDate, managerId } = body;

    if (!name || !email || !title) {
      return NextResponse.json({ error: "Name, email, and title are required" }, { status: 400 });
    }

    // Check for existing email
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json({ error: "Email already exists" }, { status: 409 });
    }

    // Generate employee ID
    const count = await prisma.user.count();
    const employeeId = `AMZ-${String(count + 1).padStart(4, "0")}`;

    const employee = await prisma.user.create({
      data: {
        name,
        email,
        password: "welcome123",
        phone,
        departmentId,
        title,
        role: role || "EMPLOYEE",
        startDate: startDate ? new Date(startDate) : new Date(),
        managerId,
        employeeId,
      },
      include: {
        department: {
          select: { id: true, name: true, color: true },
        },
      },
    });

    return NextResponse.json(employee, { status: 201 });
  } catch (error) {
    console.error("POST /api/employees error:", error);
    return NextResponse.json({ error: "Failed to create employee" }, { status: 500 });
  }
}
