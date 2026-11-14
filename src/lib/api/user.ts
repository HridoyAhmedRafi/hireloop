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
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/users/${userId}/role`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ role }),
    },
  );

  if (!res.ok) {
    throw new Error("Failed to update user role");
  }

  return res.json();
};
