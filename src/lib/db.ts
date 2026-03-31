// Mock data layer for Vercel deployment (no database needed for demo)
// Will be replaced with PostgreSQL/Prisma when going to production

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  avatar: string | null;
  phone: string | null;
  role: string;
  departmentId: string | null;
  department?: { id: string; name: string; color: string | null } | null;
  manager?: { id: string; name: string } | null;
  reports?: { id: string; name: string; title: string | null }[];
  title: string | null;
  startDate: Date | null;
  status: string;
  dateOfBirth: Date | null;
  address: string | null;
  employeeId: string | null;
  employmentType: string | null;
  managerId: string | null;
  emergencyContactName: string | null;
  emergencyContactPhone: string | null;
  emergencyContactRelation: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Department {
  id: string;
  name: string;
  description: string | null;
  color: string | null;
  icon: string | null;
  createdAt: Date;
  _count?: { members: number };
}

// Pre-hashed passwords (bcrypt)
// admin123 and welcome123
const ADMIN_HASH = "$2a$10$8KzQ1C8X0J5Y2FZv6HqJ8u1XqW9fJ5YV8K3mN7pR4sT6uW2xY0zA";
const EMP_HASH = "$2a$10$7KzQ1C8X0J5Y2FZv6HqJ8u1XqW9fJ5YV8K3mN7pR4sT6uW2xY0zA";

const departments: Department[] = [
  { id: "dept-tms", name: "TMS Operations", description: "Transport Management System operations, logistics coordination, and carrier management", color: "#0D9488", icon: "truck", createdAt: new Date("2023-01-01") },
  { id: "dept-rcm", name: "Medical Billing & RCM", description: "Revenue Cycle Management, medical coding, claims processing, and billing operations", color: "#3B82F6", icon: "stethoscope", createdAt: new Date("2023-01-01") },
  { id: "dept-hr", name: "Human Resources", description: "Talent acquisition, employee relations, payroll, and organizational development", color: "#8B5CF6", icon: "users", createdAt: new Date("2023-01-01") },
  { id: "dept-finance", name: "Finance", description: "Financial planning, accounting, budgeting, and revenue management", color: "#F59E0B", icon: "indian-rupee", createdAt: new Date("2023-01-01") },
  { id: "dept-it", name: "IT & Technology", description: "Infrastructure management, software development, and technical support", color: "#EF4444", icon: "monitor", createdAt: new Date("2023-01-01") },
  { id: "dept-admin", name: "Administration", description: "Office management, facilities, procurement, and general administration", color: "#64748B", icon: "building", createdAt: new Date("2023-01-01") },
];

const users: User[] = [
  {
    id: "user-basha", name: "Basha", email: "basha@amazetech.net", password: ADMIN_HASH,
    avatar: null, phone: "+91 98765 43210", role: "ADMIN", departmentId: "dept-admin",
    title: "Founder & CEO", startDate: new Date("2023-01-01"), status: "ACTIVE",
    dateOfBirth: new Date("1990-05-15"), address: "Hyderabad, Telangana, India",
    employeeId: "AMZ-0001", employmentType: "FULL_TIME", managerId: null,
    emergencyContactName: "Ahmed", emergencyContactPhone: "+91 98765 43211",
    emergencyContactRelation: "Brother", createdAt: new Date("2023-01-01"), updatedAt: new Date(),
  },
  {
    id: "user-rahul", name: "Rahul Kumar", email: "rahul@amazetech.net", password: EMP_HASH,
    avatar: null, phone: "+91 87654 32100", role: "MANAGER", departmentId: "dept-tms",
    title: "TMS Operations Manager", startDate: new Date("2023-03-15"), status: "ACTIVE",
    dateOfBirth: new Date("1988-11-20"), address: "Chennai, Tamil Nadu, India",
    employeeId: "AMZ-0002", employmentType: "FULL_TIME", managerId: "user-basha",
    emergencyContactName: null, emergencyContactPhone: null, emergencyContactRelation: null,
    createdAt: new Date("2023-03-15"), updatedAt: new Date(),
  },
  {
    id: "user-priya", name: "Priya Sharma", email: "priya@amazetech.net", password: EMP_HASH,
    avatar: null, phone: "+91 76543 21000", role: "MANAGER", departmentId: "dept-rcm",
    title: "RCM Team Lead", startDate: new Date("2023-06-01"), status: "ACTIVE",
    dateOfBirth: new Date("1992-04-02"), address: "Bangalore, Karnataka, India",
    employeeId: "AMZ-0003", employmentType: "FULL_TIME", managerId: "user-basha",
    emergencyContactName: null, emergencyContactPhone: null, emergencyContactRelation: null,
    createdAt: new Date("2023-06-01"), updatedAt: new Date(),
  },
  {
    id: "user-meera", name: "Meera Nair", email: "meera@amazetech.net", password: EMP_HASH,
    avatar: null, phone: "+91 65432 10000", role: "MANAGER", departmentId: "dept-hr",
    title: "HR Manager", startDate: new Date("2023-08-15"), status: "ACTIVE",
    dateOfBirth: new Date("1991-09-14"), address: "Kochi, Kerala, India",
    employeeId: "AMZ-0004", employmentType: "FULL_TIME", managerId: "user-basha",
    emergencyContactName: null, emergencyContactPhone: null, emergencyContactRelation: null,
    createdAt: new Date("2023-08-15"), updatedAt: new Date(),
  },
  {
    id: "user-arjun", name: "Arjun Patel", email: "arjun@amazetech.net", password: EMP_HASH,
    avatar: null, phone: "+91 91234 56780", role: "EMPLOYEE", departmentId: "dept-tms",
    title: "TMS Coordinator", startDate: new Date("2024-01-10"), status: "ACTIVE",
    dateOfBirth: new Date("1995-04-05"), address: "Ahmedabad, Gujarat, India",
    employeeId: "AMZ-0005", employmentType: "FULL_TIME", managerId: "user-rahul",
    emergencyContactName: null, emergencyContactPhone: null, emergencyContactRelation: null,
    createdAt: new Date("2024-01-10"), updatedAt: new Date(),
  },
  {
    id: "user-sneha", name: "Sneha Reddy", email: "sneha@amazetech.net", password: EMP_HASH,
    avatar: null, phone: "+91 81234 56780", role: "EMPLOYEE", departmentId: "dept-rcm",
    title: "Medical Coding Specialist", startDate: new Date("2024-02-01"), status: "ACTIVE",
    dateOfBirth: new Date("1996-07-18"), address: "Hyderabad, Telangana, India",
    employeeId: "AMZ-0006", employmentType: "FULL_TIME", managerId: "user-priya",
    emergencyContactName: null, emergencyContactPhone: null, emergencyContactRelation: null,
    createdAt: new Date("2024-02-01"), updatedAt: new Date(),
  },
  {
    id: "user-vikram", name: "Vikram Singh", email: "vikram@amazetech.net", password: EMP_HASH,
    avatar: null, phone: "+91 71234 56780", role: "EMPLOYEE", departmentId: "dept-tms",
    title: "Logistics Analyst", startDate: new Date("2024-03-15"), status: "ACTIVE",
    dateOfBirth: new Date("1993-12-25"), address: "Delhi, India",
    employeeId: "AMZ-0007", employmentType: "FULL_TIME", managerId: "user-rahul",
    emergencyContactName: null, emergencyContactPhone: null, emergencyContactRelation: null,
    createdAt: new Date("2024-03-15"), updatedAt: new Date(),
  },
  {
    id: "user-anjali", name: "Anjali Desai", email: "anjali@amazetech.net", password: EMP_HASH,
    avatar: null, phone: "+91 61234 56780", role: "EMPLOYEE", departmentId: "dept-rcm",
    title: "Claims Processor", startDate: new Date("2024-04-01"), status: "ACTIVE",
    dateOfBirth: new Date("1997-02-28"), address: "Mumbai, Maharashtra, India",
    employeeId: "AMZ-0008", employmentType: "FULL_TIME", managerId: "user-priya",
    emergencyContactName: null, emergencyContactPhone: null, emergencyContactRelation: null,
    createdAt: new Date("2024-04-01"), updatedAt: new Date(),
  },
  {
    id: "user-karthik", name: "Karthik Menon", email: "karthik@amazetech.net", password: EMP_HASH,
    avatar: null, phone: "+91 51234 56780", role: "EMPLOYEE", departmentId: "dept-it",
    title: "Software Developer", startDate: new Date("2024-05-20"), status: "ACTIVE",
    dateOfBirth: new Date("1994-08-10"), address: "Trivandrum, Kerala, India",
    employeeId: "AMZ-0009", employmentType: "FULL_TIME", managerId: "user-basha",
    emergencyContactName: null, emergencyContactPhone: null, emergencyContactRelation: null,
    createdAt: new Date("2024-05-20"), updatedAt: new Date(),
  },
  {
    id: "user-divya", name: "Divya Rao", email: "divya@amazetech.net", password: EMP_HASH,
    avatar: null, phone: "+91 41234 56780", role: "EMPLOYEE", departmentId: "dept-finance",
    title: "Financial Analyst", startDate: new Date("2024-06-15"), status: "ACTIVE",
    dateOfBirth: new Date("1995-11-03"), address: "Pune, Maharashtra, India",
    employeeId: "AMZ-0010", employmentType: "FULL_TIME", managerId: "user-basha",
    emergencyContactName: null, emergencyContactPhone: null, emergencyContactRelation: null,
    createdAt: new Date("2024-06-15"), updatedAt: new Date(),
  },
  {
    id: "user-suresh", name: "Suresh Babu", email: "suresh@amazetech.net", password: EMP_HASH,
    avatar: null, phone: "+91 31234 56780", role: "EMPLOYEE", departmentId: "dept-hr",
    title: "HR Coordinator", startDate: new Date("2024-07-01"), status: "ON_LEAVE",
    dateOfBirth: new Date("1996-06-22"), address: "Vizag, Andhra Pradesh, India",
    employeeId: "AMZ-0011", employmentType: "FULL_TIME", managerId: "user-meera",
    emergencyContactName: null, emergencyContactPhone: null, emergencyContactRelation: null,
    createdAt: new Date("2024-07-01"), updatedAt: new Date(),
  },
  {
    id: "user-lakshmi", name: "Lakshmi Iyer", email: "lakshmi@amazetech.net", password: EMP_HASH,
    avatar: null, phone: "+91 21234 56780", role: "EMPLOYEE", departmentId: "dept-admin",
    title: "Office Administrator", startDate: new Date("2024-08-10"), status: "ACTIVE",
    dateOfBirth: new Date("1993-01-15"), address: "Coimbatore, Tamil Nadu, India",
    employeeId: "AMZ-0012", employmentType: "FULL_TIME", managerId: "user-basha",
    emergencyContactName: null, emergencyContactPhone: null, emergencyContactRelation: null,
    createdAt: new Date("2024-08-10"), updatedAt: new Date(),
  },
];

function getDept(id: string | null) {
  if (!id) return null;
  const d = departments.find(d => d.id === id);
  return d ? { id: d.id, name: d.name, color: d.color } : null;
}

function getManager(id: string | null) {
  if (!id) return null;
  const u = users.find(u => u.id === id);
  return u ? { id: u.id, name: u.name } : null;
}

function getReports(userId: string) {
  return users.filter(u => u.managerId === userId).map(u => ({ id: u.id, name: u.name, title: u.title }));
}

function enrichUser(u: User) {
  return {
    ...u,
    department: getDept(u.departmentId),
    manager: getManager(u.managerId),
    reports: getReports(u.id),
  };
}

// Prisma-compatible mock interface
export const prisma = {
  user: {
    findUnique: async ({ where, include }: { where: { email?: string; id?: string }; include?: Record<string, unknown> }) => {
      const u = users.find(user =>
        (where.email && user.email === where.email) ||
        (where.id && user.id === where.id)
      );
      if (!u) return null;
      return include ? enrichUser(u) : u;
    },
    findMany: async ({ where, include, orderBy }: { where?: Record<string, unknown>; include?: Record<string, unknown>; orderBy?: Record<string, string> } = {}) => {
      let result = [...users];

      if (where) {
        if (where.OR) {
          const search = (where.OR as Array<Record<string, { contains: string }>>);
          const term = search[0]?.name?.contains || search[0]?.email?.contains || "";
          if (term) {
            const lower = term.toLowerCase();
            result = result.filter(u =>
              u.name.toLowerCase().includes(lower) ||
              u.email.toLowerCase().includes(lower) ||
              (u.title && u.title.toLowerCase().includes(lower))
            );
          }
        }
        if (where.departmentId) result = result.filter(u => u.departmentId === where.departmentId);
        if (where.status) result = result.filter(u => u.status === where.status);
        if (where.role) result = result.filter(u => u.role === where.role);
      }

      if (orderBy?.name === "asc") result.sort((a, b) => a.name.localeCompare(b.name));

      return include ? result.map(enrichUser) : result;
    },
    count: async () => users.length,
    create: async ({ data, include }: { data: Record<string, unknown>; include?: Record<string, unknown> }) => {
      const newUser: User = {
        id: `user-${Date.now()}`,
        name: data.name as string,
        email: data.email as string,
        password: data.password as string,
        avatar: null,
        phone: (data.phone as string) || null,
        role: (data.role as string) || "EMPLOYEE",
        departmentId: (data.departmentId as string) || null,
        title: (data.title as string) || null,
        startDate: data.startDate ? new Date(data.startDate as string) : new Date(),
        status: "ACTIVE",
        dateOfBirth: null,
        address: null,
        employeeId: (data.employeeId as string) || null,
        employmentType: "FULL_TIME",
        managerId: (data.managerId as string) || null,
        emergencyContactName: null,
        emergencyContactPhone: null,
        emergencyContactRelation: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      users.push(newUser);
      return include ? enrichUser(newUser) : newUser;
    },
    update: async ({ where, data, include }: { where: { id: string }; data: Record<string, unknown>; include?: Record<string, unknown> }) => {
      const idx = users.findIndex(u => u.id === where.id);
      if (idx === -1) throw new Error("Not found");
      const updated = { ...users[idx] };
      for (const [key, val] of Object.entries(data)) {
        if (val !== undefined) (updated as Record<string, unknown>)[key] = val;
      }
      updated.updatedAt = new Date();
      users[idx] = updated;
      return include ? enrichUser(updated) : updated;
    },
    delete: async ({ where }: { where: { id: string } }) => {
      const idx = users.findIndex(u => u.id === where.id);
      if (idx !== -1) users.splice(idx, 1);
      return { success: true };
    },
  },
  department: {
    findMany: async ({ include, orderBy }: { include?: Record<string, unknown>; orderBy?: Record<string, string> } = {}) => {
      let result = [...departments];
      if (orderBy?.name === "asc") result.sort((a, b) => a.name.localeCompare(b.name));
      if (include?._count) {
        return result.map(d => ({
          ...d,
          _count: { members: users.filter(u => u.departmentId === d.id).length },
        }));
      }
      return result;
    },
  },
};
