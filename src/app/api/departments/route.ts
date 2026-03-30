import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const includeMembers = searchParams.get("includeMembers") === "true";

    const departments = await prisma.department.findMany({
      include: {
        members: includeMembers
          ? {
              select: {
                id: true,
                name: true,
                avatar: true,
                title: true,
                role: true,
              },
            }
          : false,
        _count: { select: { members: true } },
      },
      orderBy: { name: "asc" },
    });

    return NextResponse.json({ departments });
  } catch (error) {
    console.error("GET /api/departments error:", error);
    return NextResponse.json(
      { error: "Failed to fetch departments" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, description, color } = body;

    if (!name) {
      return NextResponse.json(
        { error: "Department name is required" },
        { status: 400 }
      );
    }

    const department = await prisma.department.create({
      data: {
        name,
        description: description || null,
        color: color || null,
      },
      include: {
        _count: { select: { members: true } },
      },
    });

    return NextResponse.json({ department }, { status: 201 });
  } catch (error) {
    console.error("POST /api/departments error:", error);
    return NextResponse.json(
      { error: "Failed to create department" },
      { status: 500 }
    );
  }
}
