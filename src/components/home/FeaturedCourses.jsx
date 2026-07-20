import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { StaggerGroup, StaggerItem } from "@/components/shared/Reveal";
import { CourseCard } from "@/components/shared/CourseCard";
import { getCourses } from "@/lib/api/courses";

export async function FeaturedCourses() {
  let courses = [];
  try {
    const data = await getCourses({ sort: "rating", limit: "4" });
    courses = data?.courses ?? [];
  } catch {
    // Backend unreachable or empty — section quietly renders nothing below.
  }

  if (courses.length === 0) return null;

  return (
    <section className="border-b border-border bg-muted/30 py-20">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            align="left"
            eyebrow="Featured"
            title="Courses students are loving"
            description="A snapshot of top-rated courses on SkillForge right now."
            className="mx-0 text-left"
          />
          <Link
            href="/courses"
            className="flex shrink-0 items-center gap-1.5 text-sm font-medium text-primary hover:underline"
          >
            View all courses
            <ArrowRight className="size-4" />
          </Link>
        </div>

        <StaggerGroup className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {courses.map((course) => (
            <StaggerItem key={course._id ?? course.slug}>
              <CourseCard course={course} />
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
