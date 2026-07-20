"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, Loader2, Pencil, Star, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { deleteCourse } from "@/lib/api/courses";
import { Button } from "@/components/ui/button";
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

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export function ManageCoursesTable({ initialCourses }) {
  const [courses, setCourses] = useState(initialCourses);
  const [deletingId, setDeletingId] = useState(null);

  async function handleDelete(course) {
    setDeletingId(course._id);
    try {
      await deleteCourse(course._id);
      setCourses((prev) => prev.filter((c) => c._id !== course._id));
      toast.success(`Deleted "${course.title}"`);
    } catch (error) {
      toast.error(error.message || "Failed to delete course");
    } finally {
      setDeletingId(null);
    }
  }

  if (courses.length === 0) {
    return (
      <div className="mt-8 flex flex-col items-center gap-3 rounded-2xl border border-dashed border-border py-16 text-center">
        <p className="text-sm text-muted-foreground">No courses yet.</p>
        <Button nativeButton={false} render={<Link href="/courses/add" />}>
          Create your first course
        </Button>
      </div>
    );
  }

  return (
    <div className="mt-8 overflow-x-auto rounded-2xl border border-border">
      <table className="w-full min-w-[720px] border-collapse text-sm">
        <thead>
          <tr className="border-b border-border bg-muted/40 text-left text-xs uppercase tracking-wide text-muted-foreground">
            <th className="px-4 py-3 font-medium">Course</th>
            <th className="px-4 py-3 font-medium">Category</th>
            <th className="px-4 py-3 font-medium">Price</th>
            <th className="px-4 py-3 font-medium">Rating</th>
            <th className="px-4 py-3 text-right font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr key={course._id} className="border-b border-border last:border-0">
              <td className="px-4 py-3">
                <div className="flex items-center gap-3">
                  <img
                    src={course.coverImage}
                    alt={course.title}
                    className="size-12 shrink-0 rounded-lg object-cover"
                  />
                  <span className="line-clamp-1 font-medium text-foreground">
                    {course.title}
                  </span>
                </div>
              </td>
              <td className="px-4 py-3 text-muted-foreground">{course.category}</td>
              <td className="px-4 py-3 text-foreground">
                {currencyFormatter.format(course.price)}
              </td>
              <td className="px-4 py-3">
                <span className="flex items-center gap-1 text-foreground">
                  <Star className="size-3.5 fill-accent text-accent" />
                  {(course.rating ?? 0).toFixed(1)}
                </span>
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center justify-end gap-1">
                  <Button
                    size="icon-sm"
                    variant="ghost"
                    nativeButton={false}
                    render={<Link href={`/courses/${course.slug}`} aria-label="View course" />}
                  >
                    <Eye className="size-4" />
                  </Button>
                  <Button
                    size="icon-sm"
                    variant="ghost"
                    nativeButton={false}
                    render={
                      <Link
                        href={`/courses/manage/${course.slug}/edit`}
                        aria-label="Edit course"
                      />
                    }
                  >
                    <Pencil className="size-4" />
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger
                      className="inline-flex size-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                      aria-label="Delete course"
                    >
                      {deletingId === course._id ? (
                        <Loader2 className="size-4 animate-spin" />
                      ) : (
                        <Trash2 className="size-4" />
                      )}
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete this course?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This will permanently remove &quot;{course.title}&quot; from the
                          catalog. This can&apos;t be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDelete(course)}
                          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
