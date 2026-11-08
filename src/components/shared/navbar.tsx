"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Menu, Moon, Sun, X } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { SessionButton } from "@/components/session-button/SessionButton";
import { useSession } from "@/lib/auth-client";
import logo from "@/assets/logo.png";

const NAV_LINKS = [
  { label: "Browse Jobs", href: "/jobs" },
  { label: "Company", href: "/company" },
  { label: "Pricing", href: "/pricing" },
] as const;

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { data: session } = useSession();
  const user = session?.user;

  const { resolvedTheme, setTheme } = useTheme();
  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  return (
    <>
      {menuOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />
      )}
      <header
        className="sticky top-0 z-50 bg-background/95 backdrop-blur"
        onKeyDown={(event) => {
          if (event.key === "Escape") setMenuOpen(false);
        }}
      >
        <div className="mx-auto max-w-7xl px-3 py-3 md:px-4">
          <div className="relative z-10 flex h-14 items-center justify-between gap-3 rounded-2xl border border-border bg-card px-4 shadow-sm md:px-6">
            <Link href="/" aria-label="hireloop home" className="shrink-0">
              <Image
                src={logo}
                alt="hireloop"
                width={154}
                height={44}
                className="h-7 w-auto md:h-8"
              />
            </Link>

            <div className="flex items-center gap-2 md:gap-4">
              <nav
                aria-label="Main"
                className="hidden items-center gap-4 md:flex lg:gap-5"
              >
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                ))}
                <span aria-hidden="true" className="h-4 w-px bg-border" />
              </nav>

              <SessionButton />

              {user ? (
                <Link
                  href={`dashboard/${user?.role}`}
                  className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  Dashboard
                </Link>
              ) : null}

              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                aria-label="Toggle theme"
                title="Toggle theme"
              >
                <Sun className="hidden dark:block" />
                <Moon className="block dark:hidden" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                aria-expanded={menuOpen}
                aria-controls="mobile-menu"
                onClick={() => setMenuOpen((open) => !open)}
              >
                {menuOpen ? <X /> : <Menu />}
              </Button>
            </div>

            {menuOpen && (
              <nav
                id="mobile-menu"
                aria-label="Mobile"
                className="absolute inset-x-3 top-full z-20 mt-2 flex flex-col gap-1 rounded-2xl border border-border bg-card p-3 shadow-lg md:hidden"
              >
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="my-1 h-px bg-border" />
                <div onClick={() => setMenuOpen(false)}>
                  <SessionButton variant="menu" />
                </div>
              </nav>
            )}
          </div>
        </div>
      </header>
    </>
  );
}

export { Navbar };
