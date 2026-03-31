// Client-side mock data for AmazOS demo
// All data lives in memory — no server/database needed

export interface Employee {
  id: string;
  name: string;
  email: string;
  avatar: string | null;
  phone: string | null;
  role: string;
  departmentId: string | null;
  department: { id: string; name: string; color: string | null } | null;
  manager: { id: string; name: string } | null;
  reports: { id: string; name: string; title: string | null }[];
  title: string | null;
  startDate: string | null;
  status: string;
  dateOfBirth: string | null;
  address: string | null;
  employeeId: string | null;
  employmentType: string | null;
  managerId: string | null;
  emergencyContactName: string | null;
  emergencyContactPhone: string | null;
  emergencyContactRelation: string | null;
}

export interface Department {
  id: string;
  name: string;
  description: string | null;
  color: string | null;
  icon: string | null;
  _count: { members: number };
}

const departments = [
  { id: "dept-tms", name: "TMS Operations", description: "Transport Management System operations, logistics coordination, and carrier management", color: "#0D9488", icon: "truck" },
  { id: "dept-rcm", name: "Medical Billing & RCM", description: "Revenue Cycle Management, medical coding, claims processing, and billing operations", color: "#3B82F6", icon: "stethoscope" },
  { id: "dept-hr", name: "Human Resources", description: "Talent acquisition, employee relations, payroll, and organizational development", color: "#8B5CF6", icon: "users" },
  { id: "dept-finance", name: "Finance", description: "Financial planning, accounting, budgeting, and revenue management", color: "#F59E0B", icon: "indian-rupee" },
  { id: "dept-it", name: "IT & Technology", description: "Infrastructure management, software development, and technical support", color: "#EF4444", icon: "monitor" },
  { id: "dept-admin", name: "Administration", description: "Office management, facilities, procurement, and general administration", color: "#64748B", icon: "building" },
];

const rawEmployees = [
  { id: "user-basha", name: "Basha", email: "basha@amazetech.net", phone: "+91 98765 43210", role: "ADMIN", departmentId: "dept-admin", title: "Founder & CEO", startDate: "2023-01-01", status: "ACTIVE", dateOfBirth: "1990-05-15", address: "Hyderabad, Telangana, India", employeeId: "AMZ-0001", employmentType: "FULL_TIME", managerId: null, emergencyContactName: "Ahmed", emergencyContactPhone: "+91 98765 43211", emergencyContactRelation: "Brother" },
  { id: "user-rahul", name: "Rahul Kumar", email: "rahul@amazetech.net", phone: "+91 87654 32100", role: "MANAGER", departmentId: "dept-tms", title: "TMS Operations Manager", startDate: "2023-03-15", status: "ACTIVE", dateOfBirth: "1988-11-20", address: "Chennai, Tamil Nadu, India", employeeId: "AMZ-0002", employmentType: "FULL_TIME", managerId: "user-basha", emergencyContactName: null, emergencyContactPhone: null, emergencyContactRelation: null },
  { id: "user-priya", name: "Priya Sharma", email: "priya@amazetech.net", phone: "+91 76543 21000", role: "MANAGER", departmentId: "dept-rcm", title: "RCM Team Lead", startDate: "2023-06-01", status: "ACTIVE", dateOfBirth: "1992-04-02", address: "Bangalore, Karnataka, India", employeeId: "AMZ-0003", employmentType: "FULL_TIME", managerId: "user-basha", emergencyContactName: null, emergencyContactPhone: null, emergencyContactRelation: null },
  { id: "user-meera", name: "Meera Nair", email: "meera@amazetech.net", phone: "+91 65432 10000", role: "MANAGER", departmentId: "dept-hr", title: "HR Manager", startDate: "2023-08-15", status: "ACTIVE", dateOfBirth: "1991-09-14", address: "Kochi, Kerala, India", employeeId: "AMZ-0004", employmentType: "FULL_TIME", managerId: "user-basha", emergencyContactName: null, emergencyContactPhone: null, emergencyContactRelation: null },
  { id: "user-arjun", name: "Arjun Patel", email: "arjun@amazetech.net", phone: "+91 91234 56780", role: "EMPLOYEE", departmentId: "dept-tms", title: "TMS Coordinator", startDate: "2024-01-10", status: "ACTIVE", dateOfBirth: "1995-04-05", address: "Ahmedabad, Gujarat, India", employeeId: "AMZ-0005", employmentType: "FULL_TIME", managerId: "user-rahul", emergencyContactName: null, emergencyContactPhone: null, emergencyContactRelation: null },
  { id: "user-sneha", name: "Sneha Reddy", email: "sneha@amazetech.net", phone: "+91 81234 56780", role: "EMPLOYEE", departmentId: "dept-rcm", title: "Medical Coding Specialist", startDate: "2024-02-01", status: "ACTIVE", dateOfBirth: "1996-07-18", address: "Hyderabad, Telangana, India", employeeId: "AMZ-0006", employmentType: "FULL_TIME", managerId: "user-priya", emergencyContactName: null, emergencyContactPhone: null, emergencyContactRelation: null },
  { id: "user-vikram", name: "Vikram Singh", email: "vikram@amazetech.net", phone: "+91 71234 56780", role: "EMPLOYEE", departmentId: "dept-tms", title: "Logistics Analyst", startDate: "2024-03-15", status: "ACTIVE", dateOfBirth: "1993-12-25", address: "Delhi, India", employeeId: "AMZ-0007", employmentType: "FULL_TIME", managerId: "user-rahul", emergencyContactName: null, emergencyContactPhone: null, emergencyContactRelation: null },
  { id: "user-anjali", name: "Anjali Desai", email: "anjali@amazetech.net", phone: "+91 61234 56780", role: "EMPLOYEE", departmentId: "dept-rcm", title: "Claims Processor", startDate: "2024-04-01", status: "ACTIVE", dateOfBirth: "1997-02-28", address: "Mumbai, Maharashtra, India", employeeId: "AMZ-0008", employmentType: "FULL_TIME", managerId: "user-priya", emergencyContactName: null, emergencyContactPhone: null, emergencyContactRelation: null },
  { id: "user-karthik", name: "Karthik Menon", email: "karthik@amazetech.net", phone: "+91 51234 56780", role: "EMPLOYEE", departmentId: "dept-it", title: "Software Developer", startDate: "2024-05-20", status: "ACTIVE", dateOfBirth: "1994-08-10", address: "Trivandrum, Kerala, India", employeeId: "AMZ-0009", employmentType: "FULL_TIME", managerId: "user-basha", emergencyContactName: null, emergencyContactPhone: null, emergencyContactRelation: null },
  { id: "user-divya", name: "Divya Rao", email: "divya@amazetech.net", phone: "+91 41234 56780", role: "EMPLOYEE", departmentId: "dept-finance", title: "Financial Analyst", startDate: "2024-06-15", status: "ACTIVE", dateOfBirth: "1995-11-03", address: "Pune, Maharashtra, India", employeeId: "AMZ-0010", employmentType: "FULL_TIME", managerId: "user-basha", emergencyContactName: null, emergencyContactPhone: null, emergencyContactRelation: null },
  { id: "user-suresh", name: "Suresh Babu", email: "suresh@amazetech.net", phone: "+91 31234 56780", role: "EMPLOYEE", departmentId: "dept-hr", title: "HR Coordinator", startDate: "2024-07-01", status: "ON_LEAVE", dateOfBirth: "1996-06-22", address: "Vizag, Andhra Pradesh, India", employeeId: "AMZ-0011", employmentType: "FULL_TIME", managerId: "user-meera", emergencyContactName: null, emergencyContactPhone: null, emergencyContactRelation: null },
  { id: "user-lakshmi", name: "Lakshmi Iyer", email: "lakshmi@amazetech.net", phone: "+91 21234 56780", role: "EMPLOYEE", departmentId: "dept-admin", title: "Office Administrator", startDate: "2024-08-10", status: "ACTIVE", dateOfBirth: "1993-01-15", address: "Coimbatore, Tamil Nadu, India", employeeId: "AMZ-0012", employmentType: "FULL_TIME", managerId: "user-basha", emergencyContactName: null, emergencyContactPhone: null, emergencyContactRelation: null },
];

function getDept(id: string | null) {
  if (!id) return null;
  const d = departments.find(d => d.id === id);
  return d ? { id: d.id, name: d.name, color: d.color } : null;
}

function getManager(id: string | null) {
  if (!id) return null;
  const u = rawEmployees.find(u => u.id === id);
  return u ? { id: u.id, name: u.name } : null;
}

function getReports(userId: string) {
  return rawEmployees.filter(u => u.managerId === userId).map(u => ({ id: u.id, name: u.name, title: u.title }));
}

function enrichEmployee(e: typeof rawEmployees[0]): Employee {
  return {
    ...e,
    avatar: null,
    department: getDept(e.departmentId),
    manager: getManager(e.managerId),
    reports: getReports(e.id),
  };
}

// Public API

export function getAllEmployees(): Employee[] {
  return rawEmployees.map(enrichEmployee).sort((a, b) => a.name.localeCompare(b.name));
}

export function getEmployeeById(id: string): Employee | null {
  const e = rawEmployees.find(u => u.id === id);
  return e ? enrichEmployee(e) : null;
}

export function searchEmployees(opts: { search?: string; departmentId?: string; status?: string; role?: string }): Employee[] {
  let result = rawEmployees;
  if (opts.search) {
    const lower = opts.search.toLowerCase();
    result = result.filter(u =>
      u.name.toLowerCase().includes(lower) ||
      u.email.toLowerCase().includes(lower) ||
      (u.title && u.title.toLowerCase().includes(lower))
    );
  }
  if (opts.departmentId) result = result.filter(u => u.departmentId === opts.departmentId);
  if (opts.status) result = result.filter(u => u.status === opts.status);
  if (opts.role) result = result.filter(u => u.role === opts.role);
  return result.map(enrichEmployee).sort((a, b) => a.name.localeCompare(b.name));
}

export function getAllDepartments(): Department[] {
  return departments
    .map(d => ({
      ...d,
      _count: { members: rawEmployees.filter(u => u.departmentId === d.id).length },
    }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

export function validateLogin(email: string, password: string): Employee | null {
  const passwords: Record<string, string> = { "basha@amazetech.net": "admin123" };
  const expectedPassword = passwords[email] || "welcome123";
  if (password !== expectedPassword) return null;
  const e = rawEmployees.find(u => u.email === email);
  return e ? enrichEmployee(e) : null;
}
