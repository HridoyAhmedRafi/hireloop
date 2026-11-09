export const getJobs = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/jobs`, {
    cache: "no-store",
  });
  return res.json();
};
