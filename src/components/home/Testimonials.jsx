import { Quote } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { StaggerGroup, StaggerItem } from "@/components/shared/Reveal";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const testimonials = [
  {
    name: "Tanvir Hasan",
    role: "Aspiring Frontend Developer",
    city: "Dhaka",
    quote:
      "The AI Learning Path took my vague goal — 'get better at React' — and turned it into a 4-course roadmap with a clear order. I actually finished it.",
  },
  {
    name: "Nusrat Anwar",
    role: "Freelance Designer",
    city: "Chattogram",
    quote:
      "I asked the AI advisor which design course fit my budget and skill level, and it gave me a straight answer instead of a wall of search results.",
  },
  {
    name: "Farzana Kabir",
    role: "Content Creator",
    city: "Sylhet",
    quote:
      "Switching from 'learn video editing' to a specific 6-week plan with milestones made it so much easier to stay consistent.",
  },
];

export function Testimonials() {
  return (
    <section className="border-b border-border bg-muted/30 py-20">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Testimonials"
          title="Trusted by people learning real skills"
          description="Early feedback from students using SkillForge to learn faster."
        />

        <StaggerGroup className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <StaggerItem
              key={testimonial.name}
              className="flex flex-col rounded-2xl border border-border bg-card p-6 shadow-sm"
            >
              <Quote className="size-6 text-primary/40" />
              <p className="mt-4 flex-1 text-sm text-foreground">
                “{testimonial.quote}”
              </p>
              <div className="mt-6 flex items-center gap-3">
                <Avatar>
                  <AvatarImage
                    src={`https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(
                      testimonial.name
                    )}`}
                    alt={testimonial.name}
                  />
                  <AvatarFallback>
                    {testimonial.name
                      .split(" ")
                      .map((part) => part[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {testimonial.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {testimonial.role} · {testimonial.city}
                  </p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
