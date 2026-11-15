"use server";

import { auth } from "@/lib/auth";

/**
 * Roles a visitor is allowed to pick when creating their own account.
 * `admin` is intentionally excluded: admins are promoted from the dashboard.
 */
const SIGNUP_ROLES = ["seeker", "recruiter"] as const;

export type SignupRole = (typeof SIGNUP_ROLES)[number];

export type SignUpWithRoleInput = {
  name: string;
  email: string;
  password: string;
  image?: string;
  role: SignupRole;
};

export type SignUpWithRoleResult =
  | { ok: true; user: { id: string; email: string } }
  | { ok: false; message: string };

/**
 * Creates the account without a `role` in the request body, then writes the
 * chosen role server-side. The admin plugin marks `user.role` as `input: false`,
 * so sending it to `/sign-up/email` is rejected with
 * "role is not allowed to be set".
 */
export async function signUpWithRole(
  input: SignUpWithRoleInput,
): Promise<SignUpWithRoleResult> {
  if (!SIGNUP_ROLES.includes(input.role)) {
    return { ok: false, message: "Role must be either seeker or recruiter" };
  }

  try {
    const { user } = await auth.api.signUpEmail({
      body: {
        name: input.name,
        email: input.email,
        password: input.password,
        image: input.image,
      },
    });

    const context = await auth.$context;
    await context.internalAdapter.updateUser(user.id, { role: input.role });

    return { ok: true, user: { id: user.id, email: user.email } };
  } catch (error) {
    const message =
      error instanceof Error && error.message
        ? error.message
        : "An error occurred while creating your account.";

    return { ok: false, message };
  }
}
