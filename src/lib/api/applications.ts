export const ApplyJob = async (data) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/applications`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return res.json();
};
