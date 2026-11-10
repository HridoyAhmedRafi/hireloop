"use client";

import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { cn } from "cn";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export type FilterOption = {
  value: string;
  label: string;
  count?: number;
};

export type FilterGroup = {
  id: string;
  title: string;
  options: FilterOption[];
};

type JobFiltersProps = {
  groups: FilterGroup[];
};

const toSlug = (value: string) =>
  value.toLowerCase().replace(/[^a-z0-9]+/g, "-");

export function JobFilters({ groups }: JobFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});

  // The URL is the source of truth, so filters survive refresh and back/forward.
  const selected: Record<string, string | undefined> = Object.fromEntries(
    groups.map(
      (group) => [group.id, searchParams.get(group.id) ?? undefined] as const
    )
  );

  const updateParams = (change: (params: URLSearchParams) => void) => {
    const params = new URLSearchParams(searchParams.toString());
    change(params);

    const next = params.toString();
    router.push(next ? `${pathname}?${next}` : pathname, { scroll: false });
  };

  const selectOption = (groupId: string, value: string) => {
    updateParams((params) => params.set(groupId, value));
  };

  const clearAll = () => {
    updateParams((params) => {
      groups.forEach((group) => params.delete(group.id));
    });
  };

  const toggleSection = (groupId: string) => {
    setCollapsed((previous) => ({
      ...previous,
      [groupId]: !previous[groupId],
    }));
  };

  const hasSelection = groups.some((group) => selected[group.id]);

  return (
    <aside className="self-start rounded-xl border border-border bg-card p-5 lg:sticky lg:top-6">
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-sm font-semibold">Filters</h2>
        {hasSelection && (
          <button
            type="button"
            onClick={clearAll}
            className="text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            Clear
          </button>
        )}
      </div>

      <div className="mt-2">
        {groups.map((group) => {
          const isOpen = !collapsed[group.id];
          const contentId = `filter-${group.id}-options`;

          return (
            <div
              key={group.id}
              className="border-t border-border py-1 first:border-t-0"
            >
              <button
                type="button"
                onClick={() => toggleSection(group.id)}
                aria-expanded={isOpen}
                aria-controls={contentId}
                className="flex w-full items-center justify-between gap-2 py-2 text-left text-sm font-medium"
              >
                {group.title}
                <ChevronDown
                  aria-hidden="true"
                  className={cn(
                    "size-4 shrink-0 text-muted-foreground transition-transform",
                    isOpen && "rotate-180"
                  )}
                />
              </button>

              {isOpen && (
                <RadioGroup
                  aria-label={group.title}
                  value={selected[group.id] ?? ""}
                  onValueChange={(value) => selectOption(group.id, value)}
                  className={cn(
                    "gap-0 pt-1 pb-2",
                    group.options.length > 8 && "max-h-64 overflow-y-auto pr-1"
                  )}
                  id={contentId}
                >
                  {group.options.map((option) => {
                    const optionId = `filter-${group.id}-${toSlug(option.value)}`;

                    return (
                      <div
                        key={option.value}
                        className="flex items-center gap-3 py-1.5"
                      >
                        <RadioGroupItem
                          id={optionId}
                          value={option.value}
                          className="data-checked:border-indigo-600 data-checked:bg-indigo-600 dark:data-checked:border-indigo-500 dark:data-checked:bg-indigo-500 [&_[data-slot=radio-group-indicator]>span]:bg-white"
                        />
                        <label
                          htmlFor={optionId}
                          className="flex-1 cursor-pointer text-sm"
                        >
                          {option.label}
                        </label>
                        {option.count !== undefined && (
                          <span className="text-xs text-muted-foreground tabular-nums">
                            {option.count}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </RadioGroup>
              )}
            </div>
          );
        })}
      </div>
    </aside>
  );
}
