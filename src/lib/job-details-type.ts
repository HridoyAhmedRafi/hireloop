import type { IJobPost } from "./job-type";

/**
 * Extra fields used by the job details page.
 * All of them are optional so the page still works with a plain `IJobPost`.
 */
export type IJobDetails = IJobPost & {
  description?: string;
  experience?: string;
  skills?: string[];
  benefits?: string[];
  companySize?: string;
  industry?: string;
  website?: string;
  companyLogo?: string;
  companyImage?: string;
  verified?: boolean;
};
