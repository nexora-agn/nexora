import { Link, useLocation } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

type PaginationControlsProps = {
  page: number;
  totalPages: number;
  searchParams: URLSearchParams;
  paramName?: string;
  className?: string;
};

function visiblePageButtons(current: number, total: number): (number | "ellipsis")[] {
  if (total <= 9) return Array.from({ length: total }, (_, i) => i + 1);
  const out: (number | "ellipsis")[] = [1];
  if (current <= 4) {
    out.push(2, 3, 4, 5, "ellipsis", total);
  } else if (current >= total - 3) {
    out.push("ellipsis", total - 4, total - 3, total - 2, total - 1, total);
  } else {
    out.push("ellipsis", current - 1, current, current + 1, "ellipsis", total);
  }
  return out;
}

const PaginationControls = ({
  page,
  totalPages,
  searchParams,
  paramName = "page",
  className,
}: PaginationControlsProps) => {
  const { pathname, hash } = useLocation();

  if (totalPages <= 1) return null;

  const buildHref = (p: number) => {
    const next = new URLSearchParams(searchParams);
    if (p <= 1) next.delete(paramName);
    else next.set(paramName, String(p));
    const qs = next.toString();
    return `${pathname}${qs ? `?${qs}` : ""}${hash ?? ""}`;
  };

  const buttons = visiblePageButtons(page, totalPages);

  return (
    <nav className={cn("flex flex-wrap items-center justify-center gap-2 pt-4", className)} aria-label="Pagination">
      <Link
        to={buildHref(page - 1)}
        className={cn(
          "inline-flex h-9 items-center gap-1 rounded-md px-3 text-sm font-semibold text-muted-foreground hover:text-secondary transition-colors",
          page <= 1 && "pointer-events-none opacity-40",
        )}
        aria-disabled={page <= 1}
      >
        <ChevronLeft className="h-4 w-4" />
        Prev
      </Link>

      <div className="flex items-center gap-1.5">
        {buttons.map((n, i) =>
          n === "ellipsis" ? (
            <span key={`e-${i}`} className="px-1.5 text-muted-foreground select-none">
              …
            </span>
          ) : (
            <Link
              key={n}
              to={buildHref(n)}
              className={cn(
                "inline-flex h-9 min-w-[2.25rem] items-center justify-center rounded-md text-sm font-bold transition-colors",
                n === page ? "bg-secondary text-secondary-foreground shadow-sm" : "border border-border text-muted-foreground hover:border-secondary hover:text-secondary",
              )}
              aria-current={n === page ? "page" : undefined}
            >
              {n}
            </Link>
          ),
        )}
      </div>

      <Link
        to={buildHref(page + 1)}
        className={cn(
          "inline-flex h-9 items-center gap-1 rounded-md px-3 text-sm font-semibold text-muted-foreground hover:text-secondary transition-colors",
          page >= totalPages && "pointer-events-none opacity-40",
        )}
        aria-disabled={page >= totalPages}
      >
        Next
        <ChevronRight className="h-4 w-4" />
      </Link>
    </nav>
  );
};

export default PaginationControls;
