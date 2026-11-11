import { Download } from "lucide-react";
import { cn } from "cn";
import { Button } from "@/components/ui/button";

export type ApplicationsTab = "active" | "archived";

const TABS: { value: ApplicationsTab; label: string }[] = [
  { value: "active", label: "Active" },
  { value: "archived", label: "Archived" },
];

type ApplicationsToolbarProps = {
  tab: ApplicationsTab;
  onTabChange: (tab: ApplicationsTab) => void;
};

export function ApplicationsToolbar({
  tab,
  onTabChange,
}: ApplicationsToolbarProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <div className="inline-flex items-center rounded-lg border border-border bg-card p-1">
        {TABS.map((item) => (
          <button
            key={item.value}
            type="button"
            onClick={() => onTabChange(item.value)}
            aria-pressed={tab === item.value}
            className={cn(
              "h-7 cursor-pointer rounded-md px-3 text-xs font-medium transition-colors",
              tab === item.value
                ? "bg-secondary text-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {item.label}
          </button>
        ))}
      </div>

      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => window.print()}
        className="h-9 cursor-pointer"
      >
        <Download className="size-3.5" />
        Export PDF
      </Button>
    </div>
  );
}
