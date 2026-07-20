import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { StaggerGroup, StaggerItem } from "@/components/shared/Reveal";
import { InstructorCard } from "@/components/shared/InstructorCard";

const popularInstructors = [
  {
    id: "instructor-1",
    name: "Tanvir Hasan",
    specialty: "Frontend Development",
    courseCount: 6,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1615109398623-88346a601842?w=600",
  },
  {
    id: "instructor-2",
    name: "Farzana Kabir",
    specialty: "Video Editing",
    courseCount: 4,
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1619895862022-09114b41f16f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "instructor-3",
    name: "Nusrat Anwar",
    specialty: "UI/UX Design",
    courseCount: 5,
    rating: 4.9,
    image:
      "https://plus.unsplash.com/premium_photo-1694557635714-a2322bf81b3b?w=600",
  },
  {
    id: "instructor-4",
    name: "Rahim Uddin",
    specialty: "Digital Marketing",
    courseCount: 3,
    rating: 4.6,
    image:
      "https://plus.unsplash.com/premium_photo-1705892996372-ee667e8f6f66?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

export function PopularInstructors() {
  return (
    <section className="border-b border-border bg-background py-20">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            align="left"
            eyebrow="Instructors"
            title="Learn from popular instructors"
            description="Experienced practitioners teaching real, job-ready skills."
            className="mx-0 text-left"
          />
          <Link
            href="/courses"
            className="flex shrink-0 items-center gap-1.5 text-sm font-medium text-primary hover:underline"
          >
            Browse instructors
            <ArrowRight className="size-4" />
          </Link>
        </div>

        <StaggerGroup className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {popularInstructors.map((instructor) => (
            <StaggerItem key={instructor.id}>
              <InstructorCard instructor={instructor} />
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
