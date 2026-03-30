import "next-auth";

declare module "next-auth" {
  interface User {
    role?: string;
    department?: string | null;
    title?: string | null;
    departmentId?: string | null;
  }

  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      image?: string | null;
      role: string;
      department: string | null;
      title: string | null;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: string;
    department: string | null;
    title: string | null;
  }
}
