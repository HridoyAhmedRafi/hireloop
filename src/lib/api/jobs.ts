import type { IJobPost } from "../job-type";

export const getJobs = async (): Promise<IJobPost[]> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/jobs`, {
    cache: "no-store",
  });
  return res.json();
};

export const getSingleJob = async (id: string): Promise<IJobPost | null> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/jobs/${id}`, {
    cache: "no-store",
  });
  if (!res.ok) return null;
  return res.json();
};
