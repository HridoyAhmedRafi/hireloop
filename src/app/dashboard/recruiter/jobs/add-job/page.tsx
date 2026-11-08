"use client";

import { Plus } from "lucide-react";

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
import { AddJob } from "@/lib/actions/jobs";
import { IJob } from "@/lib/job-type";

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

const AddJobPage = () => {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const job: IJob = {
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

    console.log("New job:", result);
  };

  return (
    <div className="flex w-full flex-1 flex-col p-4 md:p-8">
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

          <Button type="submit" size="lg" className="gap-2 sm:shrink-0">
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
                required
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="company">Company Name *</Label>
                <Input
                  id="company"
                  name="company"
                  placeholder="HirePulse Network"
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="category">Job Category *</Label>
                <Select
                  name="category"
                  required
                  defaultValue="Engineering & Tech"
                >
                  <SelectTrigger id="category" className="w-full">
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
                    className="h-10 cursor-pointer justify-center rounded-lg border border-input px-3 font-normal transition-colors hover:bg-muted has-[[data-checked]]:border-primary has-[[data-checked]]:bg-primary/10"
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
            <div className="flex items-center justify-between gap-4 rounded-lg border border-input p-3">
              <div className="grid gap-1">
                <Label htmlFor="remote">Remote Work Allowed</Label>
                <p className="text-xs text-muted-foreground">
                  Enable worldwide or distributed candidate applications.
                </p>
              </div>
              <Switch id="remote" name="remote" />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="location">Job Location *</Label>
                <Input
                  id="location"
                  name="location"
                  placeholder="New York, USA"
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="deadline">Application Deadline</Label>
                <Input id="deadline" name="deadline" type="date" />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <div className="grid gap-2">
                <Label htmlFor="minSalary">Min Salary / Rate</Label>
                <Input
                  id="minSalary"
                  name="minSalary"
                  type="number"
                  min="0"
                  placeholder="25"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="maxSalary">Max Salary / Rate</Label>
                <Input
                  id="maxSalary"
                  name="maxSalary"
                  type="number"
                  min="0"
                  placeholder="40"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="frequency">Frequency</Label>
                <Select name="frequency" defaultValue="per hour">
                  <SelectTrigger id="frequency" className="w-full">
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
                className="min-h-28"
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
                className="min-h-28"
                required
              />
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
};

export default AddJobPage;
