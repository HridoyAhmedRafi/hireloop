"use client";

import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SORT_OPTIONS = [
  { value: "recent", label: "Most Recent" },
  { value: "salary-high", label: "Salary: High to Low" },
  { value: "salary-low", label: "Salary: Low to High" },
] as const;

type SortValue = (typeof SORT_OPTIONS)[number]["value"];

export function JobSort() {
  const [sort, setSort] = useState<SortValue>("recent");

  return (
    <div className="flex shrink-0 items-center gap-2">
      <span className="text-xs text-muted-foreground">Sort by</span>
      <Select
        items={SORT_OPTIONS}
        value={sort}
        onValueChange={(value) => {
          if (value) setSort(value as SortValue);
          // TODO: re-fetch or re-order the job list for the selected sort.
        }}
      >
        <SelectTrigger
          aria-label="Sort jobs"
          className="h-8 w-[150px] rounded-lg border-border bg-card text-sm"
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent align="end">
          {SORT_OPTIONS.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
