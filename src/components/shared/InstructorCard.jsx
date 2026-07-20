import { BookOpen, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function InstructorCard({ instructor }) {
  const { name, specialty, courseCount, rating, image } = instructor;

  return (
    <div className="flex h-full w-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
        <img
          src={image}
          alt={name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
        />
        <Badge className="absolute left-3 top-3 bg-background/90 text-foreground shadow-sm">
          {specialty}
        </Badge>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="line-clamp-1 text-base font-semibold text-foreground">
          {name}
        </h3>
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <BookOpen className="size-3.5" />
            {courseCount} courses
          </span>
          <span className="flex items-center gap-1 text-foreground">
            <Star className="size-3.5 fill-accent text-accent" />
            {rating.toFixed(1)}
          </span>
        </div>
      </div>
    </div>
  );
}
