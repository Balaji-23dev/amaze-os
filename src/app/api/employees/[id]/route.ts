import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const employee = await prisma.user.findUnique({
      where: { id },
      include: {
        department: {
          select: { id: true, name: true, color: true },
        },
        manager: {
          select: { id: true, name: true },
        },
        reports: {
          select: { id: true, name: true, title: true },
        },
      },
    });

    if (!employee) {
      return NextResponse.json({ error: "Employee not found" }, { status: 404 });
    }

    return NextResponse.json(employee);
  } catch (error) {
    console.error("GET /api/employees/[id] error:", error);
    return NextResponse.json({ error: "Failed to fetch employee" }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const employee = await prisma.user.update({
      where: { id },
      data: {
        name: body.name,
        email: body.email,
        phone: body.phone,
        title: body.title,
        role: body.role,
        status: body.status,
        departmentId: body.departmentId,
        managerId: body.managerId,
        dateOfBirth: body.dateOfBirth ? new Date(body.dateOfBirth) : undefined,
        address: body.address,
        employmentType: body.employmentType,
        emergencyContactName: body.emergencyContactName,
        emergencyContactPhone: body.emergencyContactPhone,
        emergencyContactRelation: body.emergencyContactRelation,
      },
      include: {
        department: {
          select: { id: true, name: true, color: true },
        },
      },
    });

    return NextResponse.json(employee);
  } catch (error) {
    console.error("PUT /api/employees/[id] error:", error);
    return NextResponse.json({ error: "Failed to update employee" }, { status: 500 });
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.user.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/employees/[id] error:", error);
    return NextResponse.json({ error: "Failed to delete employee" }, { status: 500 });
  }
}
