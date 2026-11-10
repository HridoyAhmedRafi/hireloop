"use client";

import { Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";

type BookmarkButtonProps = {
  jobTitle: string;
};

export function BookmarkButton({ jobTitle }: BookmarkButtonProps) {
  const handleBookmark = () => {
    // TODO: persist the bookmark once the API endpoint is available.
  };

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon-sm"
      aria-label={`Bookmark ${jobTitle}`}
      onClick={handleBookmark}
      className="shrink-0 text-muted-foreground hover:text-foreground"
    >
      <Bookmark className="size-4" />
    </Button>
  );
}
