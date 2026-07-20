import Link from "next/link";
import { ArrowRight, SearchX } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CourseNotFound() {
  return (
    <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col items-center justify-center gap-4 px-4 py-24 text-center">
      <span className="flex size-14 items-center justify-center rounded-full bg-muted text-muted-foreground">
        <SearchX className="size-6" />
      </span>
      <h1 className="text-2xl font-semibold text-foreground">Course not found</h1>
      <p className="max-w-sm text-sm text-muted-foreground">
        This course may have been removed or the link is incorrect.
      </p>
      <Button className="mt-2" nativeButton={false} render={<Link href="/courses" />}>
        Browse all courses
        <ArrowRight />
      </Button>
    </div>
  );
}
