import { notFound } from "next/navigation";
import {
  Award,
  BookOpen,
  Clock,
  Globe,
  Star,
  Tag,
  Users,
} from "lucide-react";
import { CourseCard } from "@/components/shared/CourseCard";
import { CourseReviews } from "@/components/courses/CourseReviews";
import { CoursePurchasePanel } from "@/components/courses/CoursePurchasePanel";
import { Badge } from "@/components/ui/badge";
import { getCourseBySlug, getCourseReviews, getCourses } from "@/lib/api/courses";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const course = await getCourseBySlug(slug).catch(() => null);
  if (!course) return { title: "Course Not Found — SkillForge AI" };
  return {
    title: `${course.title} — SkillForge AI`,
    description: course.shortDescription,
  };
}

export default async function CourseDetailsPage({ params }) {
  const { slug } = await params;

  const course = await getCourseBySlug(slug).catch(() => null);
  if (!course) notFound();

  let relatedCourses = [];
  try {
    const data = await getCourses({ category: course.categorySlug, limit: "4" });
    relatedCourses = (data?.courses ?? []).filter((c) => c.slug !== course.slug).slice(0, 3);
  } catch {
    // Related courses are a nice-to-have — fail quietly.
  }

  let initialReviews = [];
  try {
    const reviewData = await getCourseReviews(slug);
    initialReviews = reviewData?.reviews ?? [];
  } catch {
    // Reviews list falls back to empty and the client component can still work.
  }

  const gallery = [course.coverImage, ...(course.gallery ?? [])].filter(Boolean);

  return (
    <div className="mx-auto w-full max-w-7xl flex-1 px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Badge className="mb-3">{course.category}</Badge>
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            {course.title}
          </h1>
          <p className="mt-3 text-lg text-muted-foreground">{course.shortDescription}</p>

          <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
            {course.instructor?.name && (
              <span>
                Taught by{" "}
                <span className="font-medium text-foreground">{course.instructor.name}</span>
                {course.instructor.title ? ` · ${course.instructor.title}` : ""}
              </span>
            )}
            {course.rating > 0 && (
              <span className="flex items-center gap-1 text-foreground">
                <Star className="size-4 fill-accent text-accent" />
                {course.rating.toFixed(1)} ({course.reviewCount ?? 0} reviews)
              </span>
            )}
          </div>

          {/* Gallery */}
          <div className="mt-8 overflow-hidden rounded-2xl border border-border">
            <img
              src={gallery[0]}
              alt={course.title}
              className="aspect-video w-full object-cover"
            />
          </div>
          {gallery.length > 1 && (
            <div className="mt-3 grid grid-cols-4 gap-3">
              {gallery.slice(1, 5).map((src, i) => (
                <img
                  key={src + i}
                  src={src}
                  alt={`${course.title} preview ${i + 2}`}
                  className="aspect-video w-full rounded-lg border border-border object-cover"
                />
              ))}
            </div>
          )}

          {/* Overview */}
          <section className="mt-10">
            <h2 className="text-xl font-semibold text-foreground">Overview</h2>
            <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-muted-foreground">
              {course.fullDescription}
            </p>
          </section>

          {/* Curriculum */}
          {course.curriculum?.length > 0 && (
            <section className="mt-10">
              <h2 className="text-xl font-semibold text-foreground">Curriculum</h2>
              <div className="mt-4 flex flex-col gap-3">
                {course.curriculum.map((module, i) => (
                  <div key={module.module} className="rounded-xl border border-border p-4">
                    <p className="text-sm font-semibold text-foreground">
                      Module {i + 1}: {module.module}
                    </p>
                    <ul className="mt-2 flex flex-col gap-1.5">
                      {module.lessons?.map((lesson) => (
                        <li
                          key={lesson}
                          className="flex items-center gap-2 text-sm text-muted-foreground"
                        >
                          <BookOpen className="size-3.5 shrink-0" />
                          {lesson}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Key info / specs */}
          <section className="mt-10">
            <h2 className="text-xl font-semibold text-foreground">Key Information</h2>
            <dl className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
              <Spec icon={Clock} label="Duration" value={course.duration} />
              <Spec icon={Tag} label="Level" value={course.level} />
              <Spec icon={Globe} label="Language" value={course.language ?? "English"} />
              <Spec
                icon={Users}
                label="Students"
                value={(course.studentsEnrolled ?? 0).toLocaleString()}
              />
              <Spec
                icon={Award}
                label="Certificate"
                value={course.certificate ? "Yes" : "No"}
              />
              <Spec icon={Tag} label="Category" value={course.category} />
            </dl>
          </section>

          {/* Reviews */}
          <section className="mt-10">
            <h2 className="text-xl font-semibold text-foreground">Reviews & Ratings</h2>
            <div className="mt-4 flex items-center gap-4 rounded-xl border border-border p-4">
              <div className="flex items-center gap-1.5 text-2xl font-semibold text-foreground">
                <Star className="size-6 fill-accent text-accent" />
                {(course.rating ?? 0).toFixed(1)}
              </div>
              <p className="text-sm text-muted-foreground">
                Based on {course.reviewCount ?? 0} rating{course.reviewCount === 1 ? "" : "s"}.
              </p>
            </div>
            <CourseReviews slug={course.slug} initialReviews={initialReviews} />
          </section>

          {/* Related courses */}
          {relatedCourses.length > 0 && (
            <section className="mt-10">
              <h2 className="text-xl font-semibold text-foreground">Related Courses</h2>
              <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {relatedCourses.map((related) => (
                  <CourseCard key={related._id ?? related.slug} course={related} />
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 flex flex-col gap-4 rounded-2xl border border-border bg-card p-6 shadow-sm">
            <img
              src={course.coverImage}
              alt={course.title}
              className="aspect-video w-full rounded-xl object-cover"
            />
            <CoursePurchasePanel course={course} />
            <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Clock className="size-4" /> {course.duration}
              </li>
              <li className="flex items-center gap-2">
                <Tag className="size-4" /> {course.level}
              </li>
              <li className="flex items-center gap-2">
                <Award className="size-4" />
                {course.certificate ? "Certificate on completion" : "No certificate"}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function Spec({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-2.5">
      <Icon className="mt-0.5 size-4 shrink-0 text-primary" />
      <div>
        <dt className="text-xs text-muted-foreground">{label}</dt>
        <dd className="text-sm font-medium text-foreground">{value}</dd>
      </div>
    </div>
  );
}
