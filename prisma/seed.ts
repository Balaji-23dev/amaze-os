import { PrismaClient } from "@prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";
import bcrypt from "bcryptjs";

const adapter = new PrismaLibSql({ url: "file:./dev.db" });
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
        description: "Transport Management System operations, logistics coordination, and carrier management",
        color: "#0D9488",
        icon: "truck",
      },
    }),
    prisma.department.create({
      data: {
        name: "Medical Billing & RCM",
        description: "Revenue Cycle Management, medical coding, claims processing, and billing operations",
        color: "#3B82F6",
        icon: "stethoscope",
      },
    }),
    prisma.department.create({
      data: {
        name: "Human Resources",
        description: "Talent acquisition, employee relations, payroll, and organizational development",
        color: "#8B5CF6",
        icon: "users",
      },
    }),
    prisma.department.create({
      data: {
        name: "Finance",
        description: "Financial planning, accounting, budgeting, and revenue management",
        color: "#F59E0B",
        icon: "indian-rupee",
      },
    }),
    prisma.department.create({
      data: {
        name: "IT & Technology",
        description: "Infrastructure management, software development, and technical support",
        color: "#EF4444",
        icon: "monitor",
      },
    }),
    prisma.department.create({
      data: {
        name: "Administration",
        description: "Office management, facilities, procurement, and general administration",
        color: "#64748B",
        icon: "building",
      },
    }),
  ]);

  const [tms, rcm, hr, finance, it, admin] = departments;

  const password = await bcrypt.hash("admin123", 10);
  const empPassword = await bcrypt.hash("welcome123", 10);

  // Create admin (Basha)
  const basha = await prisma.user.create({
    data: {
      name: "Basha",
      email: "basha@amazetech.net",
      password,
      role: "ADMIN",
      title: "Founder & CEO",
      departmentId: admin.id,
      status: "ACTIVE",
      phone: "+91 98765 43210",
      employeeId: "AMZ-0001",
      startDate: new Date("2023-01-01"),
      employmentType: "FULL_TIME",
      dateOfBirth: new Date("1990-05-15"),
      address: "Hyderabad, Telangana, India",
      emergencyContactName: "Ahmed",
      emergencyContactPhone: "+91 98765 43211",
      emergencyContactRelation: "Brother",
    },
  });

  // Create managers
  const rahul = await prisma.user.create({
    data: {
      name: "Rahul Kumar",
      email: "rahul@amazetech.net",
      password: empPassword,
      role: "MANAGER",
      title: "TMS Operations Manager",
      departmentId: tms.id,
      status: "ACTIVE",
      phone: "+91 87654 32100",
      employeeId: "AMZ-0002",
      startDate: new Date("2023-03-15"),
      employmentType: "FULL_TIME",
      managerId: basha.id,
      dateOfBirth: new Date("1988-11-20"),
      address: "Chennai, Tamil Nadu, India",
    },
  });

  const priya = await prisma.user.create({
    data: {
      name: "Priya Sharma",
      email: "priya@amazetech.net",
      password: empPassword,
      role: "MANAGER",
      title: "RCM Team Lead",
      departmentId: rcm.id,
      status: "ACTIVE",
      phone: "+91 76543 21000",
      employeeId: "AMZ-0003",
      startDate: new Date("2023-06-01"),
      employmentType: "FULL_TIME",
      managerId: basha.id,
      dateOfBirth: new Date("1992-04-02"),
      address: "Bangalore, Karnataka, India",
    },
  });

  const meera = await prisma.user.create({
    data: {
      name: "Meera Nair",
      email: "meera@amazetech.net",
      password: empPassword,
      role: "MANAGER",
      title: "HR Manager",
      departmentId: hr.id,
      status: "ACTIVE",
      phone: "+91 65432 10000",
      employeeId: "AMZ-0004",
      startDate: new Date("2023-08-15"),
      employmentType: "FULL_TIME",
      managerId: basha.id,
      dateOfBirth: new Date("1991-09-14"),
      address: "Kochi, Kerala, India",
    },
  });

  // Create employees
  const employees = [
    {
      name: "Arjun Patel",
      email: "arjun@amazetech.net",
      title: "TMS Coordinator",
      departmentId: tms.id,
      managerId: rahul.id,
      employeeId: "AMZ-0005",
      startDate: new Date("2024-01-10"),
      phone: "+91 91234 56780",
      dateOfBirth: new Date("1995-04-05"),
      address: "Ahmedabad, Gujarat, India",
    },
    {
      name: "Sneha Reddy",
      email: "sneha@amazetech.net",
      title: "Medical Coding Specialist",
      departmentId: rcm.id,
      managerId: priya.id,
      employeeId: "AMZ-0006",
      startDate: new Date("2024-02-01"),
      phone: "+91 81234 56780",
      dateOfBirth: new Date("1996-07-18"),
      address: "Hyderabad, Telangana, India",
    },
    {
      name: "Vikram Singh",
      email: "vikram@amazetech.net",
      title: "Logistics Analyst",
      departmentId: tms.id,
      managerId: rahul.id,
      employeeId: "AMZ-0007",
      startDate: new Date("2024-03-15"),
      phone: "+91 71234 56780",
      dateOfBirth: new Date("1993-12-25"),
      address: "Delhi, India",
    },
    {
      name: "Anjali Desai",
      email: "anjali@amazetech.net",
      title: "Claims Processor",
      departmentId: rcm.id,
      managerId: priya.id,
      employeeId: "AMZ-0008",
      startDate: new Date("2024-04-01"),
      phone: "+91 61234 56780",
      dateOfBirth: new Date("1997-02-28"),
      address: "Mumbai, Maharashtra, India",
    },
    {
      name: "Karthik Menon",
      email: "karthik@amazetech.net",
      title: "Software Developer",
      departmentId: it.id,
      managerId: basha.id,
      employeeId: "AMZ-0009",
      startDate: new Date("2024-05-20"),
      phone: "+91 51234 56780",
      dateOfBirth: new Date("1994-08-10"),
      address: "Trivandrum, Kerala, India",
    },
    {
      name: "Divya Rao",
      email: "divya@amazetech.net",
      title: "Financial Analyst",
      departmentId: finance.id,
      managerId: basha.id,
      employeeId: "AMZ-0010",
      startDate: new Date("2024-06-15"),
      phone: "+91 41234 56780",
      dateOfBirth: new Date("1995-11-03"),
      address: "Pune, Maharashtra, India",
    },
    {
      name: "Suresh Babu",
      email: "suresh@amazetech.net",
      title: "HR Coordinator",
      departmentId: hr.id,
      managerId: meera.id,
      employeeId: "AMZ-0011",
      startDate: new Date("2024-07-01"),
      phone: "+91 31234 56780",
      status: "ON_LEAVE",
      dateOfBirth: new Date("1996-06-22"),
      address: "Vizag, Andhra Pradesh, India",
    },
    {
      name: "Lakshmi Iyer",
      email: "lakshmi@amazetech.net",
      title: "Office Administrator",
      departmentId: admin.id,
      managerId: basha.id,
      employeeId: "AMZ-0012",
      startDate: new Date("2024-08-10"),
      phone: "+91 21234 56780",
      dateOfBirth: new Date("1993-01-15"),
      address: "Coimbatore, Tamil Nadu, India",
    },
  ];

  for (const emp of employees) {
    await prisma.user.create({
      data: {
        ...emp,
        password: empPassword,
        role: "EMPLOYEE",
        status: emp.status || "ACTIVE",
        employmentType: "FULL_TIME",
      },
    });
  }

  console.log("✅ Seeded:");
  console.log(`   - ${departments.length} departments`);
  console.log(`   - 12 employees (1 admin, 3 managers, 8 employees)`);
  console.log(`   - Admin login: basha@amazetech.net / admin123`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
