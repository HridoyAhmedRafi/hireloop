"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronDown, LogOut } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { authClient, useSession } from "@/lib/auth-client";

const SIGN_IN =
  "text-sm font-medium text-indigo-600 transition-colors hover:texst-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300";

const SIGN_UP =
  "bg-indigo-600 text-white hover:bg-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-400";

const SIGN_OUT =
  "flex w-full cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-destructive transition-colors hover:bg-destructive/10";

const BADGE =
  "mt-1 inline-block rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-primary";

function SessionButton({ variant = "bar" }: { variant?: "bar" | "menu" }) {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const user = session?.user;

  useEffect(() => {
    if (!open) return;

    const closeOnOutsideClick = (event: PointerEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) setOpen(false);
    };

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("pointerdown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);

    return () => {
      document.removeEventListener("pointerdown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  const signOut = async () => {
    setOpen(false);
    await authClient.signOut();
    router.refresh();
  };

  if (isPending) {
    return (
      <div
        aria-hidden="true"
        className={
          variant === "menu"
            ? "h-16 animate-pulse rounded-lg bg-muted"
            : "size-9 animate-pulse rounded-full bg-muted"
        }
      />
    );
  }

  if (!user) {
    if (variant === "menu") {
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
            className={`flex-1 ${SIGN_UP}`}
          >
            Get Started
          </Button>
        </div>
      );
    }

    return (
      <div className="hidden items-center gap-4 md:flex">
        <Link href="/sign-in" className={SIGN_IN}>
          Sign In
        </Link>

        <Button
          nativeButton={false}
          render={<Link href="/sign-up" />}
          className={SIGN_UP}
        >
          Get Started
        </Button>
      </div>
    );
  }

  const avatar = (
    <Avatar className="size-8">
      {user.image ? (
        <AvatarImage src={user.image} alt={user.name?.[0]?.toUpperCase()} />
      ) : null}

      <AvatarFallback className="text-xs font-semibold text-primary">
        {user.name?.[0]?.toUpperCase() ?? user.email?.[0]?.toUpperCase() ?? "U"}
      </AvatarFallback>
    </Avatar>
  );

  const details = (
    <div className="min-w-0">
      <p className="truncate text-sm font-medium">{user.name}</p>
      <p className="truncate text-xs text-muted-foreground">{user.email}</p>

      {user.role ? <span className={BADGE}>{user.role}</span> : null}
    </div>
  );

  const signOutButton = (
    <button type="button" onClick={signOut} className={SIGN_OUT}>
      <LogOut className="size-4" />
      Sign out
    </button>
  );

  if (variant === "menu") {
    return (
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3 rounded-lg bg-muted/50 p-2">
          {avatar}
          {details}
        </div>

        {signOutButton}
      </div>
    );
  }

  return (
    <div ref={menuRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-haspopup="true"
        aria-expanded={open}
        aria-label="Open account menu"
        className="flex size-9 cursor-pointer items-center justify-center rounded-full border border-border bg-background transition-colors hover:bg-muted md:h-10 md:w-auto md:justify-start md:gap-2 md:py-1 md:pl-1 md:pr-3"
      >
        {avatar}

        <span className="hidden max-w-40 truncate text-sm font-medium md:inline">
          {user.name}
        </span>

        <ChevronDown className="hidden size-4 text-muted-foreground md:block" />
      </button>

      {open ? (
        <div className="absolute right-0 top-full z-20 mt-2 w-64 rounded-xl border border-border bg-card p-1.5 shadow-lg">
          <div className="px-3 py-2">{details}</div>

          <div className="my-1 h-px bg-border" />

          {signOutButton}
        </div>
      ) : null}
    </div>
  );
}

export { SessionButton };
