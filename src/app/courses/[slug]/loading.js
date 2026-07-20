import { Skeleton } from "@/components/ui/skeleton";

export default function CourseDetailsLoading() {
  return (
    <div className="mx-auto w-full max-w-7xl flex-1 px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Skeleton className="h-5 w-24" />
          <Skeleton className="mt-3 h-10 w-3/4" />
          <Skeleton className="mt-3 h-5 w-1/2" />
          <Skeleton className="mt-8 aspect-video w-full rounded-2xl" />
          <Skeleton className="mt-10 h-6 w-32" />
          <Skeleton className="mt-3 h-24 w-full" />
        </div>
        <div className="lg:col-span-1">
          <Skeleton className="h-96 w-full rounded-2xl" />
        </div>
      </div>
    </div>
  );
}
