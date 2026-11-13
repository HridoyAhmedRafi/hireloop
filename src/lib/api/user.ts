export const getPremiumUser = async (id: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/users/${id}/premium`,
  );
  return res.json();
};
