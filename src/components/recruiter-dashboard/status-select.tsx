"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { ApplicationStatus } from "@/lib/types/application-type";
import { APPLICATION_STATUSES, STATUS_LABELS } from "./statuses";

type StatusSelectProps = {
  value: ApplicationStatus;
  onChange: (status: ApplicationStatus) => void;
};

export function StatusSelect({ value, onChange }: StatusSelectProps) {
  return (
    <Select
      value={value}
      onValueChange={(nextValue) =>
        onChange(nextValue as ApplicationStatus)
      }
    >
      <SelectTrigger
        size="sm"
        aria-label="Update application status"
        className="w-[132px] border-[#232327] bg-[#1f1f1f] text-[#f4f4f5] hover:bg-[#232327]"
      >
        <SelectValue />
      </SelectTrigger>

      <SelectContent>
        {APPLICATION_STATUSES.map((status) => (
          <SelectItem key={status} value={status}>
            {STATUS_LABELS[status]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
