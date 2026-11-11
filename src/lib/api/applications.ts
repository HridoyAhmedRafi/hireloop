import type { IApplication } from "@/lib/application-type";

export const ApplyJob = async (data: IApplication) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/applications`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to submit application");
  }

  return (await res.json()) as {
    acknowledged: boolean;
    insertedId: string;
  };
};
