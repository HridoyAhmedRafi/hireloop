import { requiredRole } from "@/lib/core/token-apis";
import React from "react";

const AdminDashboardLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  await requiredRole("admin");
  return children;
};

export default AdminDashboardLayout;
