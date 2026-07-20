import Link from "next/link";
import { redirect } from "next/navigation";
import { PlusCircle } from "lucide-react";
import { getSession } from "@/lib/get-session";
import { getCourses } from "@/lib/api/courses";
import { AdminAccessDenied } from "@/components/courses/admin/AdminAccessDenied";
import { ManageCoursesTable } from "@/components/courses/admin/ManageCoursesTable";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Manage Courses — SkillForge AI",
};

export default async function ManageCoursesPage() {
  const session = await getSession();
  if (!session) redirect("/login");
  if (session.user.role !== "admin") return <AdminAccessDenied />;

  let courses = [];
  try {
    const data = await getCourses({ sort: "newest", limit: "50" });
    courses = data?.courses ?? [];
  } catch {
    // Table renders empty state below if this fails.
  }

  return (
    <div className="mx-auto w-full max-w-6xl flex-1 px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-foreground">
            Manage Courses
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {courses.length} course{courses.length === 1 ? "" : "s"} in the catalog.
          </p>
        </div>
        <Button nativeButton={false} render={<Link href="/courses/add" />}>
          <PlusCircle />
          Create Course
        </Button>
      </div>

      <ManageCoursesTable initialCourses={courses} />
    </div>
  );
}
