"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Briefcase,
  Eye,
  EyeOff,
  ImagePlus,
  UserPlus,
  UserRound,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "cn";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/toast";
import { signUpWithRole } from "@/lib/actions/signup";

const ROLES = [
  {
    value: "seeker",
    label: "Seeker",
    icon: UserRound,
  },
  {
    value: "recruiter",
    label: "Recruiter",
    icon: Briefcase,
  },
] as const;

type Role = (typeof ROLES)[number]["value"];

export default function SignUpPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState<Role>("seeker");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Release the object URL when the component unmounts.
  useEffect(() => {
    return () => {
      if (imagePreview) URL.revokeObjectURL(imagePreview);
    };
  }, [imagePreview]);

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0] ?? null;
    setImageFile(file);

    setImagePreview((current) => {
      if (current) URL.revokeObjectURL(current);
      return file ? URL.createObjectURL(file) : null;
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!imageFile) {
      toast.add({
        title: "Profile image required",
        description: "Please choose a profile image before signing up.",
      });
      return;
    }

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const body = new FormData();
      body.append("image", imageFile);

      const uploadRes = await fetch(
        `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
        { method: "POST", body },
      );
      const upload = await uploadRes.json();
      console.log("ImgBB status:", uploadRes.status); // <-- add
      console.log("ImgBB response:", upload); // <-- add
      console.log("Image URL:", upload?.data?.url);

      if (!uploadRes.ok || !upload?.data?.url) {
        throw new Error(
          upload?.error?.message ?? "Could not upload the profile image.",
        );
      }

      const result = await signUpWithRole({
        name,
        email,
        password,
        role,
        image: upload.data.url,
      });

      if (!result.ok) {
        toast.add({
          title: "Error",
          description: result.message,
        });
        return;
      }

      toast.add({
        title: "Account created ",
        description: "Account created successfully!",
      });
      router.push("/sign-in"); // Redirect to sign-in page after successful sign-up
    } catch (error) {
      console.error("Something went wrong:", error);
      toast.add({
        title: "Error",
        description:
          error instanceof Error
            ? error.message
            : "An error occurred while creating your account.",
      });
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4 py-10">
      <Card className="w-full max-w-md border-border shadow-xl">
        <CardHeader className="space-y-3 text-center">
          <div className="mx-auto flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <UserPlus size={24} />
          </div>

          <CardTitle className="text-2xl font-bold tracking-tight">
            Create an account
          </CardTitle>

          <CardDescription>
            Join us today! Enter your details to get started.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <fieldset className="space-y-2">
              <legend className="text-sm font-medium">
                I&apos;m signing up as
              </legend>

              <div className="grid grid-cols-2 gap-2">
                {ROLES.map(({ value, label, icon: Icon }) => (
                  <label
                    key={value}
                    className={cn(
                      "flex cursor-pointer flex-col items-center gap-1.5 rounded-lg border p-4 text-center transition-colors",
                      role === value
                        ? "border-primary bg-primary/10 ring-2 ring-primary"
                        : "border-border hover:bg-muted",
                    )}
                  >
                    <input
                      type="radio"
                      name="role"
                      value={value}
                      checked={role === value}
                      onChange={() => setRole(value)}
                      className="sr-only"
                    />

                    <Icon
                      className={cn(
                        "size-6",
                        role === value
                          ? "text-primary"
                          : "text-muted-foreground",
                      )}
                    />

                    <span className="text-sm font-medium">{label}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="space-y-2">
              <Label htmlFor="name">Username</Label>
              <Input
                id="name"
                name="name"
                placeholder="Enter your username"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">Profile image</Label>

              <input
                id="image"
                name="image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="sr-only"
              />

              <label
                htmlFor="image"
                className="flex cursor-pointer items-center gap-3 rounded-lg border border-dashed border-border p-3 transition-colors hover:bg-muted"
              >
                <Avatar className="size-12">
                  {imagePreview ? (
                    <AvatarImage
                      src={imagePreview}
                      alt="Selected profile image"
                    />
                  ) : null}

                  <AvatarFallback>
                    <ImagePlus className="size-5 text-muted-foreground" />
                  </AvatarFallback>
                </Avatar>

                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">
                    {imageFile ? imageFile.name : "Choose an image"}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {imageFile
                      ? `${Math.max(1, Math.round(imageFile.size / 1024))} KB`
                      : "PNG or JPG, up to 5 MB"}
                  </p>
                </div>
              </label>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>

              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  className="pr-11"
                  minLength={6}
                  required
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <Button type="submit" className="w-full cursor-pointer">
              Create Account
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              href="/sign-in"
              className="font-semibold text-primary hover:underline"
            >
              Sign in
            </Link>
          </p>
        </CardContent>
      </Card>
    </main>
  );
}
