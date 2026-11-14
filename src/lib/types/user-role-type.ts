import type { UserRole } from "./admin-user-type";

export const USER_ROLES: UserRole[] = ["seeker", "recruiter", "admin"];

export const ROLE_LABELS: Record<UserRole, string> = {
  seeker: "Seeker",
  recruiter: "Recruiter",
  admin: "Admin",
};

export const ROLE_BADGE_STYLES: Record<UserRole, string> = {
  seeker: "border-[#232327] bg-[#232327]/60 text-[#a0a0ab]",
  recruiter: "border-sky-500/25 bg-sky-500/10 text-sky-300",
  admin: "border-[#5c53fe]/30 bg-[#5c53fe]/15 text-[#c3c0ff]",
};

/** Falls back to "seeker" when the stored role is missing or unknown. */
export const normalizeRole = (role?: string | null): UserRole =>
  USER_ROLES.includes(role as UserRole) ? (role as UserRole) : "seeker";
