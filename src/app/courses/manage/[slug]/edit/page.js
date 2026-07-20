import { notFound, redirect } from "next/navigation";
import { getSession } from "@/lib/get-session";
import { getCourseBySlug } from "@/lib/api/courses";
import { AdminAccessDenied } from "@/components/courses/admin/AdminAccessDenied";
import { CourseForm } from "@/components/courses/admin/CourseForm";

export const metadata = {
  title: "Edit Course — SkillForge AI",
};

export default async function EditCoursePage({ params }) {
  const session = await getSession();
  if (!session) redirect("/login");
  if (session.user.role !== "admin") return <AdminAccessDenied />;

  const { slug } = await params;
  const course = await getCourseBySlug(slug).catch(() => null);
  if (!course) notFound();

  return (
    <div className="mx-auto w-full max-w-3xl flex-1 px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-semibold tracking-tight text-foreground">
        Edit Course
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Update details for &quot;{course.title}&quot;.
      </p>

      <div className="mt-8">
        <CourseForm mode="edit" initialData={course} />
      </div>
    </div>
  );
}
