import type { IJobDetails } from "@/lib/types/job-details-type";
import { toLines } from "@/lib/formate/job-format";
import { JobBenefits } from "./job-benefits";
import { JobBulletList } from "./job-bullet-list";
import { JobDetailsSection } from "./job-details-section";
import { JobSkills } from "./job-skills";

type JobDetailsContentProps = {
  job: IJobDetails;
};

export function JobDetailsContent({ job }: JobDetailsContentProps) {
  const responsibilities = toLines(job.responsibilities);
  const requirements = toLines(job.requirements);
  const hasRequirements = Boolean(job.skills?.length || requirements.length);

  return (
    <article className="rounded-xl border border-border bg-card p-5 sm:p-6">
      {job.description && (
        <JobDetailsSection title="Job Description">
          <p>{job.description}</p>
        </JobDetailsSection>
      )}

      {responsibilities.length > 0 && (
        <JobDetailsSection title="Responsibilities">
          <JobBulletList items={responsibilities} />
        </JobDetailsSection>
      )}

      {hasRequirements && (
        <JobDetailsSection title="Requirements">
          <JobSkills skills={job.skills} />
          <JobBulletList items={requirements} />
        </JobDetailsSection>
      )}

      {job.benefits?.length ? (
        <JobDetailsSection title="Benefits">
          <JobBenefits benefits={job.benefits} />
        </JobDetailsSection>
      ) : null}
    </article>
  );
}
