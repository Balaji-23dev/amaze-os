import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const employee = await prisma.user.findUnique({
      where: { id },
      include: {
        department: { select: { id: true, name: true } },
        manager: { select: { id: true, name: true } },
        reports: {
          select: { id: true, name: true, avatar: true, title: true, role: true },
        },
      },
    });

    if (!employee) {
      return NextResponse.json(
        { error: "Employee not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ employee });
  } catch (error) {
    console.error("GET /api/employees/[id] error:", error);
    return NextResponse.json(
      { error: "Failed to fetch employee" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const employee = await prisma.user.update({
      where: { id },
      data: {
        ...(body.name !== undefined && { name: body.name }),
        ...(body.email !== undefined && { email: body.email }),
        ...(body.phone !== undefined && { phone: body.phone }),
        ...(body.departmentId !== undefined && { departmentId: body.departmentId }),
        ...(body.role !== undefined && { role: body.role }),
        ...(body.title !== undefined && { title: body.title }),
        ...(body.status !== undefined && { status: body.status }),
        ...(body.startDate !== undefined && { startDate: body.startDate ? new Date(body.startDate) : null }),
        ...(body.managerId !== undefined && { managerId: body.managerId || null }),
      },
      include: {
        department: { select: { id: true, name: true } },
      },
    });

    return NextResponse.json({ employee });
  } catch (error) {
    console.error("PATCH /api/employees/[id] error:", error);
    return NextResponse.json(
      { error: "Failed to update employee" },
      { status: 500 }
    );
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
    return NextResponse.json(
      { error: "Failed to delete employee" },
      { status: 500 }
    );
  }
}
