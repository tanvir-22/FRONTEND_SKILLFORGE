import { redirect } from "next/navigation";
import { getSession } from "@/lib/get-session";
import { MyCoursesList } from "@/components/courses/MyCoursesList";

export const metadata = {
  title: "My Courses — SkillForge AI",
};

export default async function MyCoursesPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  return (
    <div className="mx-auto w-full max-w-4xl flex-1 px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-semibold tracking-tight text-foreground">
        My Courses
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Courses you've enrolled in. Leave a course any time.
      </p>

      <MyCoursesList />
    </div>
  );
}
