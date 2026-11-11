"use client";

import { Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";

type JobDetailsActionsProps = {
  jobTitle: string;
};

export function JobDetailsActions({ jobTitle }: JobDetailsActionsProps) {
  const handleApply = () => {
    // TODO: open the apply flow for this job.
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
        aria-label={`Bookmark ${jobTitle}`}
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
