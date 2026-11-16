import { requiredRole } from "@/lib/core/token-apis";
import React from "react";

const RecruiterDashboardLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  await requiredRole("recruiter");
  return children;
};

export default RecruiterDashboardLayout;
