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
