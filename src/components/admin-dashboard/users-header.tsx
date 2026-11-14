import { ChevronRight, Search } from "lucide-react";

import { Input } from "@/components/ui/input";

type UsersHeaderProps = {
  query: string;
  onQueryChange: (value: string) => void;
};

export function UsersHeader({ query, onQueryChange }: UsersHeaderProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="min-w-0">
        <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
          Admin
          <ChevronRight className="size-3.5 text-[#5a5a60]" />
          <span className="text-[#c3c0ff]">User Management</span>
        </p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight">
          User Management
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage every account, role, and access level from one place.
        </p>
      </div>

      <div className="relative w-full sm:max-w-xs">
        <Search className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-[#a0a0ab]" />
        <Input
          type="search"
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="Search by email..."
          aria-label="Search users by email"
          className="h-9 border-[#232327] bg-[#1f1f1f] pl-8 text-sm text-white placeholder:text-[#a0a0ab]"
        />
      </div>
    </div>
  );
}
