import Link from "next/link";
import { Home, ShieldAlert } from "lucide-react";

const UnauthorizedPage = () => {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-md text-center">
        <div className="mx-auto mb-6 flex size-20 items-center justify-center rounded-full bg-destructive/10">
          <ShieldAlert className="size-10 text-destructive" />
        </div>

        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-destructive">
          Error 403
        </p>

        <h1 className="mb-3 text-3xl font-bold tracking-tight">
          Access Denied
        </h1>

        <p className="mb-8 text-muted-foreground">
          Sorry, you don not have permission to access this page. Please return
          to the homepage.
        </p>

        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          <Home className="size-4" />
          Back to Home
        </Link>
      </div>
    </main>
  );
};

export default UnauthorizedPage;
