"use client";

import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { useEnrollmentStatus } from "@/lib/use-enrollment-status";
import { AddToCartButton } from "@/components/cart/AddToCartButton";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export function CoursePurchasePanel({ course }) {
  const { sessionPending, isEnrolled } = useEnrollmentStatus(course.slug);

  if (sessionPending || isEnrolled === null) {
    return (
      <div className="flex flex-col gap-3">
        <Skeleton className="h-9 w-24" />
        <Skeleton className="h-11 w-full rounded-lg" />
      </div>
    );
  }

  if (isEnrolled) {
    return (
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2 rounded-lg bg-emerald-500/10 px-3 py-2.5 text-sm font-medium text-emerald-600 dark:text-emerald-400">
          <CheckCircle2 className="size-4 shrink-0" />
          You&apos;re enrolled in this course
        </div>
        <Button
          variant="outline"
          size="lg"
          className="h-11 w-full text-base"
          nativeButton={false}
          render={<Link href="/my-courses" />}
        >
          Go to My Courses
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <p className="text-3xl font-semibold text-foreground">
        {currencyFormatter.format(course.price)}
      </p>
      <AddToCartButton course={course} variant="full" />
    </div>
  );
}
