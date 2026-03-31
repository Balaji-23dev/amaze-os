import { getAllEmployees } from "@/lib/mock-data";
import EmployeeProfileClient from "./client";

export function generateStaticParams() {
  return getAllEmployees().map((e) => ({ id: e.id }));
}

export default function EmployeeProfilePage() {
  return <EmployeeProfileClient />;
}
