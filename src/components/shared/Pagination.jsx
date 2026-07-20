import Link from "next/link";
import { Fragment } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { buildQueryString } from "@/lib/build-query-string";
import { cn } from "@/lib/utils";

export function Pagination({ basePath, currentPage, totalPages, searchParams }) {
  if (totalPages <= 1) return null;

  function hrefFor(page) {
    const qs = buildQueryString(searchParams, {
      page: page === 1 ? undefined : String(page),
    });
    return `${basePath}${qs ? `?${qs}` : ""}`;
  }

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1).filter(
    (p) => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 1
  );

  const pageLinkClass = (isActive) =>
    cn(
      "flex size-9 items-center justify-center rounded-lg text-sm font-medium transition-colors",
      isActive
        ? "bg-primary text-primary-foreground"
        : "text-muted-foreground hover:bg-muted hover:text-foreground"
    );

  return (
    <nav className="mt-12 flex items-center justify-center gap-1.5" aria-label="Pagination">
      <Link
        href={hrefFor(Math.max(1, currentPage - 1))}
        aria-label="Previous page"
        className={cn(pageLinkClass(false), currentPage === 1 && "pointer-events-none opacity-40")}
      >
        <ChevronLeft className="size-4" />
      </Link>

      {pages.map((page, idx) => (
        <Fragment key={page}>
          {idx > 0 && pages[idx - 1] !== page - 1 && (
            <span className="px-1 text-sm text-muted-foreground">…</span>
          )}
          <Link href={hrefFor(page)} className={pageLinkClass(page === currentPage)}>
            {page}
          </Link>
        </Fragment>
      ))}

      <Link
        href={hrefFor(Math.min(totalPages, currentPage + 1))}
        aria-label="Next page"
        className={cn(
          pageLinkClass(false),
          currentPage === totalPages && "pointer-events-none opacity-40"
        )}
      >
        <ChevronRight className="size-4" />
      </Link>
    </nav>
  );
}
