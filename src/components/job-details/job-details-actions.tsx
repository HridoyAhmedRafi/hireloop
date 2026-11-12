"use client";

import { Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { IJobDetails } from "@/lib/types/job-details-type";
import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "../ui/toast";
import { ApplyJob } from "@/lib/api/applications";
import type { IApplication } from "@/lib/types/application-type";

type JobDetailsActionsProps = {
  job: IJobDetails;
};

export function JobDetailsActions({ job }: JobDetailsActionsProps) {
  const { data: session } = useSession();
  const user = session?.user;

  const router = useRouter();
  const handleApply = async () => {
    if (!user) {
      router.push(`/sign-in?redirectTo=/browse-jobs/${job._id}`);
      toast.add({
        title: "Login",
        description: "Login required for apply.",
      });
      return;
    } else if (user.role === "seeker") {
      const application: IApplication = {
        jobId: job._id,
        jobTitle: job.title,
        companyName: job.company,
        userId: user.id,
        email: user.email,
        jobType: job.jobType,
        remote: job.remote,
        location: job.location,
        minSalary: job.minSalary,
        maxSalary: job.maxSalary,
        frequency: job.frequency,
        archived: false,
      };

      try {
        const res = await ApplyJob(application);

        if (!res.acknowledged) {
          throw new Error("Application was not saved");
        }

        toast.add({
          title: "Applied",
          description: "Applied successfully!",
        });
        router.push(`/browse-jobs`);
      } catch {
        toast.add({
          title: "Something went wrong",
          description: "Could not submit your application. Please try again.",
        });
      }
    } else {
      toast.add({
        title: "Not a seeker",
        description: "User not job seeker",
      });
    }
  };

  const handleBookmark = () => {
    // TODO: save this job to the user's bookmarks.
  };

  return (
    <div className="flex shrink-0 items-center gap-2">
      <Button
        type="button"
        variant="outline"
        size="icon"
        aria-label={`Bookmark ${job.title}`}
        onClick={handleBookmark}
        className="size-9 cursor-pointer border-border bg-card text-muted-foreground hover:text-foreground"
      >
        <Bookmark className="size-4" />
      </Button>

      <Button
        type="button"
        onClick={handleApply}
        className="h-9 cursor-pointer rounded-lg bg-foreground px-4 text-background hover:bg-foreground/90"
      >
        Apply Now
      </Button>
    </div>
  );
}
