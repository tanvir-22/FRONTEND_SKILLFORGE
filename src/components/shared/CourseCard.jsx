import Link from "next/link";
import { Clock, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { AddToCartButton } from "@/components/cart/AddToCartButton";

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export function CourseCard({ course }) {
  const {
    slug,
    title,
    category,
    shortDescription,
    instructor,
    level,
    duration,
    price,
    rating,
    coverImage,
  } = course;

  return (
    <div className="flex h-full w-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
        <img
          src={coverImage}
          alt={title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
        />
        {category && (
          <Badge className="absolute left-3 top-3 bg-background/90 text-foreground shadow-sm">
            {category}
          </Badge>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div>
          <h3 className="line-clamp-1 text-base font-semibold text-foreground">
            {title}
          </h3>
          <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
            {shortDescription}
          </p>
        </div>

        <div className="mt-auto flex flex-col gap-2 text-sm text-muted-foreground">
          <div className="flex items-center justify-between gap-2">
            <span className="truncate">{level}</span>
            <span className="flex shrink-0 items-center gap-1.5">
              <Clock className="size-3.5" />
              {duration}
            </span>
          </div>
          <div className="flex items-center justify-between gap-2">
            <span className="font-medium text-foreground">
              {currencyFormatter.format(price)}
            </span>
            {rating && (
              <span className="flex items-center gap-1 text-foreground">
                <Star className="size-3.5 fill-accent text-accent" />
                {rating.toFixed(1)}
              </span>
            )}
          </div>
        </div>

        {instructor?.name && (
          <p className="text-xs text-muted-foreground">
            Taught by <span className="text-foreground">{instructor.name}</span>
          </p>
        )}

        <div className="mt-1 flex items-center gap-2">
          <Link
            href={`/courses/${slug}`}
            className="inline-flex h-9 flex-1 items-center justify-center rounded-lg bg-primary text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            View Details
          </Link>
          <AddToCartButton course={course} />
        </div>
      </div>
    </div>
  );
}

export function CourseCardSkeleton() {
  return (
    <div className="flex h-full w-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
      <Skeleton className="aspect-[4/3] w-full rounded-none" />
      <div className="flex flex-1 flex-col gap-3 p-4">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-2/3" />
        <div className="mt-auto flex flex-col gap-2">
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-full" />
        </div>
        <Skeleton className="h-9 w-full rounded-lg" />
      </div>
    </div>
  );
}
