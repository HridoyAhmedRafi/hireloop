"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronDown, LogOut } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { authClient, useSession } from "@/lib/auth-client";
import { cn } from "cn";

type View = "desktop" | "mobile-bar" | "mobile-menu";

type SessionUser = typeof authClient.$Infer.Session.user;

const INDIGO_BUTTON =
  "bg-indigo-600 text-white hover:bg-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-400";

function getInitials(user: { name?: string | null; email?: string | null }) {
  const name = user.name?.trim();

  if (name) {
    const initials = name
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part[0])
      .join("");

    if (initials) return initials.toUpperCase();
  }

  return user.email?.trim()[0]?.toUpperCase() ?? "U";
}

function UserAvatar({
  user,
  size = "default",
  className,
}: {
  user: SessionUser;
  size?: "default" | "sm" | "lg";
  className?: string;
}) {
  return (
    <Avatar size={size} className={className}>
      {user.image ? (
        <AvatarImage src={user.image} alt="" />
      ) : null}

      <AvatarFallback className="text-xs font-semibold text-primary">
        {getInitials(user)}
      </AvatarFallback>
    </Avatar>
  );
}

function AccountPanel({
  user,
  onSignOut,
}: {
  user: SessionUser;
  onSignOut: () => void;
}) {
  return (
    <div
      role="menu"
      className="absolute right-0 top-full z-20 mt-2 w-64 rounded-xl border border-border bg-card p-1.5 shadow-lg"
    >
      <div className="px-3 py-2">
        <p className="truncate text-sm font-medium">{user.name}</p>

        <p className="truncate text-xs text-muted-foreground">{user.email}</p>

        {user.role ? (
          <span className="mt-2 inline-block rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-primary">
            {user.role}
          </span>
        ) : null}
      </div>

      <div className="my-1 h-px bg-border" />

      <button
        type="button"
        role="menuitem"
        onClick={onSignOut}
        className="flex w-full cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-destructive transition-colors hover:bg-destructive/10"
      >
        <LogOut className="size-4" />
        Sign out
      </button>
    </div>
  );
}

function SignedOutActions({ view }: { view: View }) {
  if (view === "mobile-bar") return null;

  if (view === "mobile-menu") {
    return (
      <div className="flex gap-2">
        <Button
          variant="outline"
          nativeButton={false}
          render={<Link href="/sign-in" />}
          className="flex-1"
        >
          Sign In
        </Button>

        <Button
          nativeButton={false}
          render={<Link href="/sign-up" />}
          className={cn("flex-1", INDIGO_BUTTON)}
        >
          Get Started
        </Button>
      </div>
    );
  }

  return (
    <div className="hidden items-center gap-4 md:flex">
      <Link
        href="/sign-in"
        className="text-sm font-medium text-indigo-600 transition-colors hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
      >
        Sign In
      </Link>

      <Button
        nativeButton={false}
        render={<Link href="/sign-up" />}
        className={INDIGO_BUTTON}
      >
        Get Started
      </Button>
    </div>
  );
}

function SessionButton({ view }: { view: View }) {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const user = session?.user;

  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  const handleSignOut = async () => {
    setOpen(false);
    await authClient.signOut();
    router.refresh();
  };

  if (isPending) {
    if (view === "desktop") {
      return (
        <div
          aria-hidden="true"
          className="hidden h-10 w-32 animate-pulse rounded-full bg-muted md:block"
        />
      );
    }

    if (view === "mobile-bar") {
      return (
        <div
          aria-hidden="true"
          className="size-8 animate-pulse rounded-full bg-muted md:hidden"
        />
      );
    }

    return (
      <div
        aria-hidden="true"
        className="h-16 animate-pulse rounded-lg bg-muted"
      />
    );
  }

  if (!user) return <SignedOutActions view={view} />;

  if (view === "mobile-menu") {
    return (
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3 rounded-lg bg-muted/50 p-2">
          <UserAvatar user={user} className="size-9" />

          <div className="min-w-0">
            <p className="truncate text-sm font-medium">{user.name}</p>
            <p className="truncate text-xs text-muted-foreground">
              {user.email}
            </p>
          </div>

          {user.role ? (
            <span className="ml-auto rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-primary">
              {user.role}
            </span>
          ) : null}
        </div>

        <Button
          variant="outline"
          onClick={handleSignOut}
          className="w-full justify-start text-destructive hover:text-destructive"
        >
          <LogOut data-icon="inline-start" />
          Sign out
        </Button>
      </div>
    );
  }

  const isDesktop = view === "desktop";

  return (
    <div
      ref={menuRef}
      className={cn("relative", isDesktop ? "hidden md:block" : "md:hidden")}
    >
      {isDesktop ? (
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-haspopup="menu"
          aria-expanded={open}
          aria-label="Open account menu"
          className="flex h-10 cursor-pointer items-center gap-2 rounded-full border border-border bg-background py-1 pl-1 pr-3 transition-colors hover:bg-muted"
        >
          <UserAvatar user={user} />

          <span className="max-w-24 truncate text-sm font-medium lg:max-w-40">
            {user.name}
          </span>

          <ChevronDown className="size-4 text-muted-foreground" />
        </button>
      ) : (
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setOpen((value) => !value)}
          aria-haspopup="menu"
          aria-expanded={open}
          aria-label="Open account menu"
          className="md:hidden"
        >
          <UserAvatar user={user} size="sm" />
        </Button>
      )}

      {open ? <AccountPanel user={user} onSignOut={handleSignOut} /> : null}
    </div>
  );
}

export { SessionButton };
