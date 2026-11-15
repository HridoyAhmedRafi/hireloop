import { requiredRole } from "@/lib/core/get-server-session";
import React from "react";

const SeekerDashboardLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  await requiredRole("seeker");
  return children;
};

export default SeekerDashboardLayout;
