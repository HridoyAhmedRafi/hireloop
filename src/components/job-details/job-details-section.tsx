import type { ReactNode } from "react";

type JobDetailsSectionProps = {
  title: string;
  children: ReactNode;
};

export function JobDetailsSection({
  title,
  children,
}: JobDetailsSectionProps) {
  return (
    <section className="mt-6 border-t border-border pt-6 first:mt-0 first:border-t-0 first:pt-0">
      <h2 className="text-lg font-semibold">{title}</h2>
      <div className="mt-3 text-sm leading-6 text-muted-foreground">
        {children}
      </div>
    </section>
  );
}
