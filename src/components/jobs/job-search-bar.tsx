"use client";

import { useState, type FormEvent } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

export function JobSearchBar() {
  const router = useRouter();
  const [keyword, setKeyword] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());
    const search = data.searchField;

    const params = new URLSearchParams();
    params.set("search", search as string);
    router.push(`/browse-jobs?${params.toString()}`);
  };

  return (
    <form
      role="search"
      onSubmit={handleSubmit}
      className="flex items-center gap-2 rounded-xl border border-border bg-card p-2 shadow-sm transition-colors focus-within:border-indigo-500/60 focus-within:ring-3 focus-within:ring-indigo-500/10"
    >
      <div className="relative flex-1">
        <Search
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
        />
        <Input
          type="search"
          name="searchField"
          value={keyword}
          onChange={(event) => setKeyword(event.target.value)}
          placeholder="Search by job title, keywords..."
          aria-label="Search jobs"
          className="h-10 rounded-lg border-transparent bg-transparent pr-3 pl-9 text-sm focus-visible:border-transparent focus-visible:ring-0 dark:bg-transparent"
        />
      </div>

      <Button
        type="submit"
        className="cursor-pointer h-10 shrink-0 rounded-lg bg-foreground px-5 text-background hover:bg-foreground/90"
      >
        Search Jobs
      </Button>
    </form>
  );
}
