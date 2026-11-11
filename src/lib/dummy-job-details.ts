import type { IJobDetails } from "./job-details-type";

/**
 * Temporary data for the job details page.
 * Replace it with `getSingleJob(id)` once the API returns the detail fields.
 */
export const DUMMY_JOB_DETAILS: IJobDetails = {
  _id: "dummy",
  title: "Senior Product Designer",
  company: "CloudScale AI",
  category: "Design",
  jobType: "Full-time",
  remote: true,
  location: "United States",
  deadline: "2026-12-31",
  minSalary: "140000",
  maxSalary: "180000",
  frequency: "per year",
  responsibilities:
    "Lead the end-to-end design process for major platform features, from discovery to high-fidelity implementation.\nCollaborate with cross-functional partners to understand user needs and translate them into functional design requirements.\nMaintain and evolve our design system, ensuring consistency and accessibility across the platform.\nConduct user research and usability testing to validate design decisions and iterate based on feedback.",
  requirements:
    "5+ years of experience designing complex B2B SaaS products or data-heavy applications.\nA strong portfolio showcasing your design process and problem-solving skills.",
  status: "Active",
  applicants: 34,
  postedAt: "2026-11-08",

  description:
    "At CloudScale AI we are building the next generation of infrastructure monitoring tools. We are looking for a Senior Product Designer who is passionate about transforming complex technical workflows into elegant, intuitive interfaces. You will be a key member of our design team, working closely with engineering and product leadership to define the future of our platform experience.",
  experience: "5+ Years",
  skills: ["Figma Expert", "System Thinking", "UX/UI Design", "Basic Frontend"],
  benefits: [
    "Full Health & Dental",
    "Competitive 401k",
    "Latest Hardware Stipend",
    "Unlimited PTO",
  ],
  companySize: "250 - 500 Employees",
  industry: "SaaS / Artificial Intelligence",
  website: "https://example.com",
  verified: true,
};
