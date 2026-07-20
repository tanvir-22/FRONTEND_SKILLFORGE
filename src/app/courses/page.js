import { Suspense } from "react";
import { SearchX } from "lucide-react";
import { CourseCard } from "@/components/shared/CourseCard";
import { CourseFilters } from "@/components/courses/CourseFilters";
import { Pagination } from "@/components/shared/Pagination";
import { StaggerGroup, StaggerItem } from "@/components/shared/Reveal";
import { Skeleton } from "@/components/ui/skeleton";
import { getCourses } from "@/lib/api/courses";

export const metadata = {
  title: "Explore Courses — SkillForge AI",
  description: "Browse coding, video editing, design, and marketing courses.",
};

export default async function CoursesPage({ searchParams }) {
  const params = await searchParams;
  const { category, q, level, sort, page = "1" } = params;

  let courses = [];
  let totalPages = 1;
  let total = 0;
  let loadError = false;

  try {
    const data = await getCourses({ category, q, level, sort, page, limit: "12" });
    courses = data?.courses ?? [];
    totalPages = data?.totalPages ?? 1;
    total = data?.total ?? 0;
  } catch {
    loadError = true;
  }

  return (
    <div className="mx-auto w-full max-w-7xl flex-1 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          Explore Courses
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {loadError
            ? "Search, filter, and find the right course for your goal."
            : `${total} course${total === 1 ? "" : "s"} available.`}
        </p>
      </div>

      <Suspense
        fallback={
          <div className="flex flex-col gap-3 sm:flex-row">
            <Skeleton className="h-10 flex-1 sm:min-w-64" />
            <Skeleton className="h-10 w-full sm:w-48" />
            <Skeleton className="h-10 w-full sm:w-44" />
            <Skeleton className="h-10 w-full sm:w-44" />
          </div>
        }
      >
        <CourseFilters initialParams={params} />
      </Suspense>

      {loadError ? (
        <div className="mt-16 flex flex-col items-center gap-3 text-center">
          <SearchX className="size-8 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">
            Couldn't load courses right now. Please try again shortly.
          </p>
        </div>
      ) : courses.length === 0 ? (
        <div className="mt-16 flex flex-col items-center gap-3 text-center">
          <SearchX className="size-8 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">
            No courses match your search. Try a different keyword or filter.
          </p>
        </div>
      ) : (
        <>
          <StaggerGroup className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {courses.map((course) => (
              <StaggerItem key={course._id ?? course.slug}>
                <CourseCard course={course} />
              </StaggerItem>
            ))}
          </StaggerGroup>

          <Pagination
            basePath="/courses"
            currentPage={Number(page) || 1}
            totalPages={totalPages}
            searchParams={params}
          />
        </>
      )}
    </div>
  );
}
