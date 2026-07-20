"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, CalendarDays, Loader2, LogOut } from "lucide-react";
import toast from "react-hot-toast";
import { useSession } from "@/lib/auth-client";
import { getMyEnrollments, leaveCourse } from "@/lib/api/enrollments";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

export function MyCoursesList() {
  const { data: session, isPending: sessionPending } = useSession();
  const [enrollments, setEnrollments] = useState(null);
  const [leavingSlug, setLeavingSlug] = useState(null);

  useEffect(() => {
    if (sessionPending) return;
    if (!session) {
      setEnrollments([]);
      return;
    }
    getMyEnrollments(session.user.id)
      .then((data) => setEnrollments(data?.enrollments ?? []))
      .catch(() => setEnrollments([]));
  }, [session, sessionPending]);

  async function handleLeave(enrollment) {
    setLeavingSlug(enrollment.courseSlug);
    try {
      await leaveCourse(enrollment.courseSlug, session.user.id);
      setEnrollments((prev) => prev.filter((e) => e.courseSlug !== enrollment.courseSlug));
      toast.success(`Left "${enrollment.courseTitle}"`);
    } catch (error) {
      toast.error(error.message || "Could not leave the course");
    } finally {
      setLeavingSlug(null);
    }
  }

  if (enrollments === null) {
    return (
      <div className="mt-8 flex flex-col gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-24 w-full rounded-2xl" />
        ))}
      </div>
    );
  }

  if (enrollments.length === 0) {
    return (
      <div className="mt-8 flex flex-col items-center gap-3 rounded-2xl border border-dashed border-border py-16 text-center">
        <p className="text-sm text-muted-foreground">
          You haven&apos;t enrolled in any courses yet.
        </p>
        <Button nativeButton={false} render={<Link href="/courses" />}>
          Explore courses
          <ArrowRight />
        </Button>
      </div>
    );
  }

  return (
    <div className="mt-8 flex flex-col gap-4">
      {enrollments.map((enrollment) => {
        const course = enrollment.course;
        return (
          <div
            key={enrollment.courseSlug}
            className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-4 sm:flex-row sm:items-center"
          >
            <img
              src={course?.coverImage}
              alt={enrollment.courseTitle}
              className="h-20 w-full shrink-0 rounded-lg object-cover sm:w-28"
            />
            <div className="min-w-0 flex-1">
              <p className="line-clamp-1 font-semibold text-foreground">
                {enrollment.courseTitle}
              </p>
              {course?.instructor?.name && (
                <p className="mt-0.5 text-sm text-muted-foreground">
                  Taught by {course.instructor.name}
                </p>
              )}
              <p className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                <CalendarDays className="size-3.5" />
                Enrolled {dateFormatter.format(new Date(enrollment.enrolledAt))}
              </p>
            </div>

            <div className="flex shrink-0 items-center gap-2">
              <Button
                variant="outline"
                nativeButton={false}
                render={<Link href={`/courses/${enrollment.courseSlug}`} />}
              >
                View Course
              </Button>

              <AlertDialog>
                <AlertDialogTrigger
                  className="inline-flex h-8 items-center justify-center gap-1.5 rounded-lg px-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive disabled:pointer-events-none disabled:opacity-50"
                  disabled={leavingSlug === enrollment.courseSlug}
                >
                  {leavingSlug === enrollment.courseSlug ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : (
                    <LogOut className="size-4" />
                  )}
                  Leave
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Leave this course?</AlertDialogTitle>
                    <AlertDialogDescription>
                      You&apos;ll lose access to &quot;{enrollment.courseTitle}&quot; and
                      won&apos;t be able to leave a new review unless you re-enroll. Your
                      existing review, if any, will stay.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => handleLeave(enrollment)}
                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                      Leave Course
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        );
      })}
    </div>
  );
}
