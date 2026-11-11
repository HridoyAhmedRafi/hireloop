type JobSkillsProps = {
  skills?: string[];
};

export function JobSkills({ skills }: JobSkillsProps) {
  if (!skills?.length) return null;

  return (
    <div className="mb-4 flex flex-wrap gap-2">
      {skills.map((skill) => (
        <span
          key={skill}
          className="inline-flex items-center gap-1.5 rounded-md border border-border bg-secondary/40 px-2.5 py-1 text-xs font-medium text-foreground"
        >
          <span
            aria-hidden="true"
            className="size-1 rounded-full bg-muted-foreground"
          />
          {skill}
        </span>
      ))}
    </div>
  );
}
