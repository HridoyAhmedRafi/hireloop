/** Roles a user can hold in HireLoop. */
export type UserRole = "seeker" | "recruiter" | "admin";

/** The subset of the better-auth user record this dashboard displays. */
export type AdminUser = {
  id: string;
  name: string;
  email: string;
  image?: string | null;
  role?: string | null;
  banned?: boolean | null;
  premium?: boolean | null;
  createdAt: string | Date;
};

/** An admin user whose role has already been resolved to a known value. */
export type AdminUserRow = AdminUser & {
  role: UserRole;
};
