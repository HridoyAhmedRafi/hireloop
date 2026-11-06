import Image from "next/image";
import {
  Briefcase,
  Building2,
  MapPin,
  Search,
  SlidersHorizontal,
  Star,
  Users,
} from "lucide-react";
import globe from "@/assets/globe.png";

const TRENDING_SEARCHES = [
  "Product Designer",
  "AI Engineering",
  "Devops Engineer",
] as const;

const STATS = [
  { icon: Briefcase, value: "50K", label: "Active Jobs" },
  { icon: Building2, value: "12K", label: "Companies" },
  { icon: Users, value: "2M", label: "Job Seekers" },
  { icon: Star, value: "97%", label: "Satisfaction Rate" },
] as const;

// Hand-placed specks read more like a starfield than a repeating pattern.
const STARS = [
  { top: "6%", left: "10%", size: 2, opacity: 0.5 },
  { top: "14%", left: "22%", size: 1, opacity: 0.35 },
  { top: "9%", left: "37%", size: 1.5, opacity: 0.45 },
  { top: "18%", left: "47%", size: 1, opacity: 0.3 },
  { top: "5%", left: "58%", size: 2, opacity: 0.4 },
  { top: "13%", left: "71%", size: 1, opacity: 0.35 },
  { top: "7%", left: "86%", size: 1.5, opacity: 0.5 },
  { top: "24%", left: "92%", size: 1, opacity: 0.3 },
  { top: "27%", left: "7%", size: 1, opacity: 0.35 },
  { top: "33%", left: "16%", size: 1.5, opacity: 0.3 },
  { top: "31%", left: "81%", size: 1.5, opacity: 0.35 },
  { top: "40%", left: "4%", size: 1, opacity: 0.25 },
  { top: "42%", left: "94%", size: 2, opacity: 0.3 },
  { top: "21%", left: "63%", size: 1, opacity: 0.25 },
  { top: "29%", left: "35%", size: 1, opacity: 0.2 },
] as const;

function Banner() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative isolate overflow-hidden bg-background pb-4 sm:pb-6"
    >
      {/* Ambient background: aurora glow in both themes, starfield in dark. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-44 left-1/2 h-[440px] w-[920px] -translate-x-1/2 rounded-full bg-indigo-500/[0.07] blur-[110px] dark:bg-indigo-500/25" />
        <div className="absolute top-24 left-[10%] size-40 rounded-full bg-fuchsia-500/10 blur-[90px] dark:bg-fuchsia-500/15" />
        <div className="absolute top-16 right-[8%] size-40 rounded-full bg-sky-500/10 blur-[90px] dark:bg-sky-500/15" />
        <div className="absolute inset-0 hidden dark:block">
          {STARS.map((star, index) => (
            <span
              key={index}
              className="absolute rounded-full bg-white "
              style={{
                top: star.top,
                left: star.left,
                width: star.size,
                height: star.size,
                opacity: star.opacity,
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center px-4 pt-14 text-center sm:pt-20 lg:pt-24">
        <div className="flex items-center gap-3">
          <span
            aria-hidden="true"
            className="hidden h-px w-12 bg-gradient-to-r from-transparent to-zinc-300 sm:block dark:to-white/20"
          />
          <span className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white/80 px-3 py-1.5 text-[10px] font-medium tracking-[0.16em] text-zinc-600 uppercase shadow-sm backdrop-blur sm:text-[11px] dark:border-white/10 dark:bg-white/[0.04] dark:text-white/65 dark:shadow-none">
            <span className="flex size-4 items-center justify-center rounded-[5px] bg-indigo-500/15 text-indigo-600 dark:bg-indigo-400/15 dark:text-indigo-300">
              <Briefcase className="size-2.5" />
            </span>
            56,000+ New Jobs This Month
          </span>
          <span
            aria-hidden="true"
            className="hidden h-px w-12 bg-gradient-to-l from-transparent to-zinc-300 sm:block dark:to-white/20"
          />
        </div>

        <h1
          id="hero-heading"
          className="mt-5 text-4xl font-semibold tracking-[-0.04em] text-balance text-zinc-900 sm:text-5xl lg:text-6xl dark:text-white"
        >
          Find Your Dream Job Today
        </h1>

        <p className="mt-4 max-w-xl text-sm leading-relaxed text-pretty text-zinc-500 sm:text-base dark:text-white/55">
          Hireloop connects top talent with world-class companies. Browse
          thousands of curated opportunities and land your next role — faster.
        </p>

        <div
          role="search"
          aria-label="Search jobs"
          className="mt-8 flex w-full max-w-2xl flex-col gap-1.5 rounded-2xl border border-zinc-200 bg-white/90 p-1.5 shadow-[0_18px_50px_-24px_rgba(15,23,42,0.45)] backdrop-blur sm:flex-row sm:items-center sm:gap-0 dark:border-white/10 dark:bg-[#0a0a12] dark:shadow-[0_18px_50px_-24px_rgba(0,0,0,0.9)]"
        >
          <label className="flex min-w-0 flex-1 items-center gap-2 rounded-xl px-3 py-2.5 transition-colors focus-within:bg-zinc-100/70 dark:focus-within:bg-white/5">
            <Search className="size-4 shrink-0 text-zinc-400 dark:text-white/40" />
            <span className="sr-only">Job title, skill or company</span>
            <input
              type="text"
              placeholder="Job title, skill or company"
              className="w-full min-w-0 bg-transparent text-sm text-zinc-900 outline-none placeholder:text-zinc-400 dark:text-white dark:placeholder:text-white/35"
            />
          </label>

          <span
            aria-hidden="true"
            className="mx-2 h-px bg-zinc-200 sm:h-6 sm:w-px dark:bg-white/10"
          />

          <label className="flex min-w-0 flex-1 items-center gap-2 rounded-xl px-3 py-2.5 transition-colors focus-within:bg-zinc-100/70 dark:focus-within:bg-white/5">
            <MapPin className="size-4 shrink-0 text-zinc-400 dark:text-white/40" />
            <span className="sr-only">Location</span>
            <input
              type="text"
              placeholder="Location or Remote"
              className="w-full min-w-0 bg-transparent text-sm text-zinc-900 outline-none placeholder:text-zinc-400 dark:text-white dark:placeholder:text-white/35"
            />
          </label>

          <button
            type="button"
            className="mt-1 flex h-10 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 text-sm font-medium text-white transition-colors hover:bg-indigo-500 focus-visible:ring-3 focus-visible:ring-indigo-500/40 focus-visible:outline-none sm:mt-0 sm:w-10 sm:shrink-0 sm:px-0 dark:bg-indigo-500 dark:hover:bg-indigo-400"
          >
            <SlidersHorizontal className="size-4" />
            <span className="sm:sr-only">Search</span>
          </button>
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-center gap-x-2 gap-y-2">
          <span className="rounded-full bg-white/80 px-2.5 py-1 text-xs text-zinc-500 shadow-sm backdrop-blur dark:bg-black/25 dark:text-white/70 dark:shadow-none">
            Trending Searches
          </span>
          {TRENDING_SEARCHES.map((term) => (
            <span
              key={term}
              className="inline-flex items-center rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs font-medium text-zinc-600 shadow-sm dark:border-white/15 dark:bg-white/[0.04] dark:text-white/70 dark:shadow-none"
            >
              {term}
            </span>
          ))}
        </div>
      </div>

      {/* The globe is anchored to the section bottom and cropped by it. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-0 flex justify-center"
      >
        <Image
          src={globe}
          alt=""
          priority
          sizes="(min-width: 1024px) 1280px, (min-width: 640px) 900px, 800px"
          className="h-auto w-[800px] max-w-none shrink-0 translate-y-[10%] opacity-90 select-none [mask-image:linear-gradient(to_bottom,transparent_30%,black_44%)] sm:w-[900px] sm:translate-y-[16%] lg:w-[1280px] lg:translate-y-[27%] dark:opacity-100"
        />
      </div>

      <div className="relative z-10 mx-auto mt-16 flex max-w-5xl flex-col items-center px-4 sm:mt-20 lg:mt-24">
        <p className="max-w-md text-center text-lg leading-snug font-medium text-white [text-shadow:0_2px_16px_rgba(0,0,0,0.55)] sm:text-xl lg:text-2xl">
          Assisting over 15,000 job seekers find their dream positions.
        </p>

        <div className="mt-16 grid w-full grid-cols-2 gap-3 sm:mt-20 sm:gap-4 md:mt-24 md:grid-cols-4">
          {STATS.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.label}
                className="flex flex-col justify-between gap-6 rounded-2xl border border-zinc-200 bg-white p-4 shadow-[0_16px_40px_-24px_rgba(15,23,42,0.35)] sm:p-5 dark:border-white/10 dark:bg-[#0b0b12] dark:shadow-[0_20px_60px_-24px_rgba(0,0,0,0.9)]"
              >
                <Icon className="size-4 text-zinc-500 dark:text-white/45" />
                <div>
                  <p className="text-3xl font-semibold tracking-[-0.03em] text-zinc-900 sm:text-4xl dark:text-white">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-[11px] text-zinc-500 sm:text-xs dark:text-white/45">
                    {stat.label}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export { Banner };
