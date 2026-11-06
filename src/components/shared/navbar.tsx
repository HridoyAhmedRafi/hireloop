"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Menu, Moon, Sun, X } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";

const NAV_LINKS = [
  { label: "Browse Jobs", href: "/jobs" },
  { label: "Company", href: "/company" },
  { label: "Pricing", href: "/pricing" },
] as const;

// Theme state lives in next-themes (see theme-provider.tsx). The icons below
// follow the .dark class on <html> via CSS, so nothing here reads the theme
// during render — no hydration mismatch.
function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  return (
    <>
      {/* Click-away layer lives outside <header>: its backdrop-blur would
          otherwise become the containing block and shrink this overlay. */}
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
                <Link
                  href="/sign-in"
                  className="text-sm font-medium text-indigo-600 transition-colors hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
                >
                  Sign In
                </Link>
              </nav>

              <Button
                nativeButton={false}
                render={<Link href="/sign-up" />}
                className="hidden bg-indigo-600 text-white hover:bg-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-400 md:inline-flex"
              >
                Get Started
              </Button>

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
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    nativeButton={false}
                    render={<Link href="/sign-in" />}
                    onClick={() => setMenuOpen(false)}
                    className="flex-1"
                  >
                    Sign In
                  </Button>
                  <Button
                    nativeButton={false}
                    render={<Link href="/sign-up" />}
                    onClick={() => setMenuOpen(false)}
                    className="flex-1 bg-indigo-600 text-white hover:bg-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-400"
                  >
                    Get Started
                  </Button>
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
