import { redirect } from "next/navigation";
import { getSession } from "@/lib/get-session";
import { AdminAccessDenied } from "@/components/courses/admin/AdminAccessDenied";
import { CourseForm } from "@/components/courses/admin/CourseForm";

export const metadata = {
  title: "Create Course — SkillForge AI",
};

export default async function AddCoursePage() {
  const session = await getSession();
  if (!session) redirect("/login");
  if (session.user.role !== "admin") return <AdminAccessDenied />;

  return (
    <div className="mx-auto w-full max-w-3xl flex-1 px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-semibold tracking-tight text-foreground">
        Create Course
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Add a new course to the SkillForge catalog.
      </p>

      <div className="mt-8">
        <CourseForm mode="create" />
      </div>
    </div>
  );
}
