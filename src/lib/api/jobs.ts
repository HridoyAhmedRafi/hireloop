import type { IJobPost } from "../job-type";

// mutation
import { IJob } from "../job-type";

export const AddJob = async (data: IJob) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/add-job`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const deleteJob = async (jobId: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/jobs/${jobId}`, {
    method: "DELETE",
  });
  return res.json();
};

export const updateJob = async (id: string, data: IJob) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/jobs/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return res.json();
};

// getting
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
