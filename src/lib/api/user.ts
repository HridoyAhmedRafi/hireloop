"use server";

import { protectedMutation } from "../core/token-apis";

export const getPremiumUser = async (id: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/users/${id}/premium`,
  );
  return res.json();
};

//update user role
export const updateUserRole = async (
  userId: string,
  role: "seeker" | "recruiter" | "admin",
) => {
  const api = `${process.env.NEXT_PUBLIC_BASE_URL}/users/${userId}/role`;
  const res = await protectedMutation(api, "PATCH", { role });
  if (!res.ok) {
    throw new Error("Failed to update user role");
  }
  return res.json();
};
