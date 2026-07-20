import Link from "next/link";
import { Code2, Film, Megaphone, Palette } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { StaggerGroup, StaggerItem } from "@/components/shared/Reveal";
import { COURSE_CATEGORIES } from "@/lib/course-categories";

const categoryDetails = {
  programming: {
    icon: Code2,
    description: "JavaScript, Python, full-stack & mobile development.",
  },
  "video-editing": {
    icon: Film,
    description: "Premiere Pro, After Effects, DaVinci Resolve & more.",
  },
  design: {
    icon: Palette,
    description: "Figma, Photoshop, design systems & prototyping.",
  },
  marketing: {
    icon: Megaphone,
    description: "SEO, social media, freelancing & entrepreneurship.",
  },
};

export function CourseCategories() {
  return (
    <section className="border-b border-border bg-background py-20">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Categories"
          title="Learn the skills that matter"
          description="Pick a category to see AI-tailored learning paths, courses, and instructors for it."
        />

        <StaggerGroup className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {COURSE_CATEGORIES.map(({ name, slug }) => {
            const { icon: Icon, description } = categoryDetails[slug];
            return (
              <StaggerItem key={slug}>
                <Link
                  href={`/courses?category=${slug}`}
                  className="group flex h-full flex-col gap-3 rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
                >
                  <span className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="size-5" />
                  </span>
                  <h3 className="text-base font-semibold text-foreground">{name}</h3>
                  <p className="text-sm text-muted-foreground">{description}</p>
                </Link>
              </StaggerItem>
            );
          })}
        </StaggerGroup>
      </div>
    </section>
  );
}
