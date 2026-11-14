"use client";

import { Building2, DollarSign, Globe, MapPin, Plus } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { IJob } from "@/lib/types/job-type";
import { toast } from "@/components/ui/toast";
import { useRouter } from "next/navigation";
import { AddJob } from "@/lib/api/jobs";
import { useSession } from "@/lib/auth-client";

const JOB_TYPES = ["Full-time", "Part-time", "Contract", "Internship"];

const CATEGORIES = [
  "Engineering & Tech",
  "Design",
  "Marketing",
  "Sales",
  "Finance",
  "Operations",
  "Customer Support",
  "Human Resources",
  "Other",
];

const FREQUENCIES = ["per hour", "per month", "per year"];

// Figma palette (Add New Job / 83482:812)
const FIGMA_THEME =
  "[--background:#131314] [--foreground:#f4f4f5] [--card:#151516] [--card-foreground:#f4f4f5] [--popover:#151516] [--popover-foreground:#f4f4f5] [--primary:#5c53fe] [--primary-foreground:#ffffff] [--secondary:#232327] [--secondary-foreground:#f4f4f5] [--muted:#232327] [--muted-foreground:#a0a0ab] [--accent:#232327] [--accent-foreground:#f4f4f5] [--border:#232327] [--input:#232327] [--ring:#5c53fe]";

const inputClass =
  "border-input bg-[#1e1e21] text-[#f4f4f5] placeholder:text-[#5a5a60] dark:bg-[#1e1e21]";

const textareaClass =
  "min-h-28 rounded-xl border-input bg-[#1e1e21] px-3 py-2.5 text-[#f4f4f5] placeholder:text-[#5a5a60] dark:bg-[#1e1e21]";

const selectClass =
  "w-full border-input bg-[#1e1e21] text-[#f4f4f5] dark:bg-[#1e1e21] dark:hover:bg-[#232327]";

const fieldIconClass =
  "pointer-events-none absolute right-2.5 top-1/2 size-4 -translate-y-1/2 text-[#a0a0ab]";

const AddJobPage = () => {
  const { data: session } = useSession();
  const user = session?.user;

  const router = useRouter();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const job: IJob = {
      recruiterId: user?.id ?? "",
      recruiterEmail: user?.email ?? "",
      title: String(formData.get("title") ?? ""),
      company: String(formData.get("company") ?? ""),
      category: String(formData.get("category") ?? ""),
      jobType: String(formData.get("jobType") ?? ""),
      remote: formData.get("remote") === "on",
      location: String(formData.get("location") ?? ""),
      deadline: String(formData.get("deadline") ?? ""),
      minSalary: String(formData.get("minSalary") ?? ""),
      maxSalary: String(formData.get("maxSalary") ?? ""),
      frequency: String(formData.get("frequency") ?? ""),
      responsibilities: String(formData.get("responsibilities") ?? ""),
      requirements: String(formData.get("requirements") ?? ""),
    };

    const result = await AddJob(job);

    if (result.acknowledged === true) {
      toast.add({
        title: "Added",
        description: "Job added successfully",
      });
      router.push("/dashboard/recruiter/jobs");
    }
  };

  return (
    <div className={`flex w-full flex-1 flex-col p-4 md:p-8 ${FIGMA_THEME}`}>
      <form
        onSubmit={handleSubmit}
        className="m-auto w-full max-w-4xl space-y-6"
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">
              Post a New Job
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Fill in the position specifications to attract qualified talent.
            </p>
          </div>

          <Button
            type="submit"
            size="lg"
            className="cursor-pointer gap-2 sm:shrink-0"
          >
            <Plus />
            Publish Job
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-primary" />
              1. Basic Information
            </CardTitle>
          </CardHeader>

          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Job Title *</Label>
              <Input
                id="title"
                name="title"
                placeholder="Frontend Developer"
                className={inputClass}
                required
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="company">Company Name *</Label>
                <div className="relative">
                  <Input
                    id="company"
                    name="company"
                    placeholder="HirePulse Network"
                    className={`${inputClass} pr-9`}
                    required
                  />
                  <Building2 className={fieldIconClass} />
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="category">Job Category *</Label>
                <Select
                  name="category"
                  required
                  defaultValue="Engineering & Tech"
                >
                  <SelectTrigger id="category" className={selectClass}>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-2">
              <Label>Job Type *</Label>
              <RadioGroup
                name="jobType"
                defaultValue="Full-time"
                required
                className="grid grid-cols-2 gap-2 md:grid-cols-4"
              >
                {JOB_TYPES.map((type) => (
                  <Label
                    key={type}
                    htmlFor={`job-type-${type}`}
                    className="h-10 cursor-pointer justify-center rounded-lg border border-[#232327] bg-[#1e1e21] px-3 font-normal text-[#a0a0ab] transition-colors hover:bg-[#232327] has-[[data-checked]]:border-primary has-[[data-checked]]:bg-[#232327] has-[[data-checked]]:text-white"
                  >
                    <RadioGroupItem
                      id={`job-type-${type}`}
                      value={type}
                      className="sr-only"
                    />
                    {type}
                  </Label>
                ))}
              </RadioGroup>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-primary" />
              2. Location, Compensation & Timeline
            </CardTitle>
          </CardHeader>

          <CardContent className="grid gap-4">
            <div className="flex items-center justify-between gap-4 rounded-xl border border-[#232327] bg-[#1e1e21] p-3">
              <div className="flex items-center gap-3">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-[#232327] text-[#c3c0ff]">
                  <Globe className="size-4" />
                </span>
                <div className="grid gap-1">
                  <Label htmlFor="remote">Remote Work Allowed</Label>
                  <p className="text-xs text-muted-foreground">
                    Enable worldwide or distributed candidate applications.
                  </p>
                </div>
              </div>
              <Switch id="remote" name="remote" />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="location">Job Location *</Label>
                <div className="relative">
                  <Input
                    id="location"
                    name="location"
                    placeholder="New York, USA"
                    className={`${inputClass} pr-9`}
                    required
                  />
                  <MapPin className={fieldIconClass} />
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="deadline">Application Deadline</Label>
                <Input
                  id="deadline"
                  name="deadline"
                  type="date"
                  className={inputClass}
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <div className="grid gap-2">
                <Label htmlFor="minSalary">Min Salary / Rate</Label>
                <div className="relative">
                  <Input
                    id="minSalary"
                    name="minSalary"
                    type="number"
                    min="0"
                    placeholder="25"
                    className={`${inputClass} pr-9`}
                  />
                  <DollarSign className={fieldIconClass} />
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="maxSalary">Max Salary / Rate</Label>
                <div className="relative">
                  <Input
                    id="maxSalary"
                    name="maxSalary"
                    type="number"
                    min="0"
                    placeholder="40"
                    className={`${inputClass} pr-9`}
                  />
                  <DollarSign className={fieldIconClass} />
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="frequency">Frequency</Label>
                <Select name="frequency" defaultValue="per hour">
                  <SelectTrigger id="frequency" className={selectClass}>
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    {FREQUENCIES.map((frequency) => (
                      <SelectItem key={frequency} value={frequency}>
                        {frequency}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-primary" />
              3. Responsibilities & Requirements
            </CardTitle>
            <CardDescription>
              Describe the role and the qualifications you are looking for.
            </CardDescription>
          </CardHeader>

          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="responsibilities">Key Responsibilities *</Label>
              <Textarea
                id="responsibilities"
                name="responsibilities"
                placeholder="Describe the day-to-day responsibilities of this role."
                className={textareaClass}
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="requirements">
                Qualifications & Requirements *
              </Label>
              <Textarea
                id="requirements"
                name="requirements"
                placeholder="List the skills, experience, and qualifications required."
                className={textareaClass}
                required
              />
            </div>
          </CardContent>

          <CardContent>
            <div className="rounded-xl border border-[#232327] bg-[#1e1e21] p-4">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="flex min-w-0 items-center gap-3">
                  <Avatar size="lg" className="border border-[#232327]">
                    {user?.image ? (
                      <AvatarImage
                        src={user.image}
                        alt={user.name ?? "Recruiter"}
                      />
                    ) : null}
                    <AvatarFallback className="bg-[#232327] text-sm font-semibold text-[#c3c0ff]">
                      {user?.name?.[0]?.toUpperCase() ??
                        user?.email?.[0]?.toUpperCase() ??
                        "R"}
                    </AvatarFallback>
                  </Avatar>

                  <div className="min-w-0">
                    <p className="text-[11px] font-medium tracking-wide text-[#a0a0ab] uppercase">
                      Recruiter information
                    </p>
                    <p className="truncate text-sm font-medium text-[#f4f4f5]">
                      {user?.name ?? "—"}
                    </p>
                    <p className="truncate text-xs text-[#a0a0ab]">
                      {user?.email ?? "—"}
                    </p>
                  </div>
                </div>
              </div>

              <p className="mt-3 border-t border-[#232327] pt-3 text-xs text-[#a0a0ab]">
                This job will be published under your recruiter account. Contact
                an admin to update these details.
              </p>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
};

export default AddJobPage;
