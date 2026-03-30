import { PrismaClient } from "@prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";
import { hash } from "bcryptjs";
import path from "path";

const dbPath = path.resolve(process.cwd(), "dev.db");
const adapter = new PrismaLibSql({ url: `file:${dbPath}` });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Seeding database...");

  // Clear existing data
  await prisma.user.deleteMany();
  await prisma.department.deleteMany();

  // Create departments
  const departments = await Promise.all([
    prisma.department.create({
      data: {
        name: "TMS Operations",
        description: "Transport Management System operations and support",
        color: "#3B82F6",
      },
    }),
    prisma.department.create({
      data: {
        name: "Medical Billing",
        description: "Healthcare billing and claims processing",
        color: "#F43F5E",
      },
    }),
    prisma.department.create({
      data: {
        name: "Administration",
        description: "General administration and office management",
        color: "#8B5CF6",
      },
    }),
    prisma.department.create({
      data: {
        name: "HR",
        description: "Human resources and people operations",
        color: "#14B8A6",
      },
    }),
    prisma.department.create({
      data: {
        name: "IT",
        description: "Information technology and infrastructure",
        color: "#06B6D4",
      },
    }),
    prisma.department.create({
      data: {
        name: "Finance",
        description: "Financial planning, accounting, and budgeting",
        color: "#F59E0B",
      },
    }),
  ]);

  const [tmsOps, medBilling, admin, hr, it, finance] = departments;

  console.log(`✅ Created ${departments.length} departments`);

  // Create admin user
  const adminPassword = await hash("admin123", 12);
  const basha = await prisma.user.create({
    data: {
      name: "Basha Ahmed",
      email: "basha@amazetech.net",
      password: adminPassword,
      role: "ADMIN",
      title: "CEO & Founder",
      departmentId: admin.id,
      status: "ACTIVE",
      startDate: new Date("2022-01-15"),
      phone: "+1 (555) 100-0001",
    },
  });

  console.log("✅ Created admin user: basha@amazetech.net / admin123");

  // Create sample employees
  const defaultPassword = await hash("welcome123", 12);

  const employees = [
    {
      name: "Priya Sharma",
      email: "priya@amazetech.net",
      role: "MANAGER",
      title: "TMS Operations Manager",
      departmentId: tmsOps.id,
      phone: "+1 (555) 200-0001",
      startDate: new Date("2022-06-01"),
      managerId: basha.id,
    },
    {
      name: "Raj Patel",
      email: "raj@amazetech.net",
      role: "EMPLOYEE",
      title: "Senior TMS Analyst",
      departmentId: tmsOps.id,
      phone: "+1 (555) 200-0002",
      startDate: new Date("2023-02-15"),
    },
    {
      name: "Sarah Johnson",
      email: "sarah@amazetech.net",
      role: "MANAGER",
      title: "Medical Billing Lead",
      departmentId: medBilling.id,
      phone: "+1 (555) 300-0001",
      startDate: new Date("2022-09-01"),
      managerId: basha.id,
    },
    {
      name: "Amit Kumar",
      email: "amit@amazetech.net",
      role: "EMPLOYEE",
      title: "IT Engineer",
      departmentId: it.id,
      phone: "+1 (555) 400-0001",
      startDate: new Date("2023-05-10"),
    },
    {
      name: "Fatima Ali",
      email: "fatima@amazetech.net",
      role: "EMPLOYEE",
      title: "HR Coordinator",
      departmentId: hr.id,
      phone: "+1 (555) 500-0001",
      startDate: new Date("2023-08-20"),
    },
    {
      name: "Michael Chen",
      email: "michael@amazetech.net",
      role: "EMPLOYEE",
      title: "Financial Analyst",
      departmentId: finance.id,
      phone: "+1 (555) 600-0001",
      startDate: new Date("2024-01-08"),
    },
    {
      name: "Aisha Mohammed",
      email: "aisha@amazetech.net",
      role: "EMPLOYEE",
      title: "Billing Specialist",
      departmentId: medBilling.id,
      phone: "+1 (555) 300-0002",
      startDate: new Date("2024-03-15"),
      status: "ON_LEAVE",
    },
  ];

  for (const emp of employees) {
    const managerId = emp.managerId || (emp.role === "EMPLOYEE" ? basha.id : null);
    await prisma.user.create({
      data: {
        name: emp.name,
        email: emp.email,
        password: defaultPassword,
        role: emp.role,
        title: emp.title,
        departmentId: emp.departmentId,
        phone: emp.phone,
        startDate: emp.startDate,
        managerId,
        status: (emp as Record<string, unknown>).status as string || "ACTIVE",
      },
    });
  }

  console.log(`✅ Created ${employees.length} sample employees`);
  console.log("\n🎉 Database seeded successfully!");
  console.log("   Login: basha@amazetech.net / admin123");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
