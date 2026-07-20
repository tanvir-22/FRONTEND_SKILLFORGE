import Link from "next/link";
import { ArrowRight, MessageCircle, Sparkles, Users2 } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/shared/Reveal";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "About — SkillForge AI",
  description:
    "Why we built SkillForge AI — an AI-guided course platform for coding, video editing, design, and marketing.",
};

const differentiators = [
  {
    icon: Sparkles,
    title: "AI Learning Path Generator",
    description:
      "Tell us your goal, skill level, and time budget — get a structured, multi-course roadmap instead of a wall of search results.",
  },
  {
    icon: MessageCircle,
    title: "AI Course Advisor",
    description:
      "A conversational assistant that remembers context and helps you pick the right course for your budget and goals.",
  },
  {
    icon: Users2,
    title: "Real instructors, real feedback",
    description:
      "Courses are taught by working practitioners, and reviews only come from students who actually enrolled.",
  },
];

export default function AboutPage() {
  return (
    <div className="flex-1">
      <section className="border-b border-border bg-primary/5 py-16 sm:py-20">
        <Reveal className="mx-auto w-full max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
            About Us
          </span>
          <h1 className="mt-5 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Learning shouldn&apos;t start with 40 browser tabs.
          </h1>
          <p className="mt-5 text-lg text-muted-foreground">
            SkillForge AI exists so that deciding what to learn next — and in what
            order — takes minutes, not weeks of comparing course listings.
          </p>
        </Reveal>
      </section>

      <section className="border-b border-border bg-background py-16 sm:py-20">
        <Reveal className="mx-auto w-full max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold text-foreground">Our mission</h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            Most course platforms hand you a search bar and thousands of results,
            then leave you to figure out the order, the overlap, and whether a
            course actually fits your current skill level. We built SkillForge AI
            to close that gap: an AI that reasons across your goal, your starting
            point, and how much time you actually have — and turns that into a
            plan you can follow, plus courses matched to it.
          </p>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            We&apos;re starting with four categories — Programming & Web Dev, Video
            Editing & Motion, UI/UX & Graphic Design, and Digital Marketing &
            Business — taught by practitioners, not just credentialed instructors.
          </p>
        </Reveal>
      </section>

      <section className="border-b border-border bg-muted/30 py-16 sm:py-20">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Why SkillForge"
            title="What makes it different"
            description="Two AI agents and a review system that only real students can use."
          />
          <StaggerGroup className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            {differentiators.map(({ icon: Icon, title, description }) => (
              <StaggerItem
                key={title}
                className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-6"
              >
                <span className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="size-5" />
                </span>
                <h3 className="text-base font-semibold text-foreground">{title}</h3>
                <p className="text-sm text-muted-foreground">{description}</p>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      <section className="bg-primary py-16">
        <Reveal className="mx-auto flex w-full max-w-2xl flex-col items-center gap-5 px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-semibold tracking-tight text-primary-foreground sm:text-4xl">
            Ready to start learning?
          </h2>
          <p className="text-primary-foreground/80">
            Create a free account and generate your first AI learning path.
          </p>
          <Button
            size="lg"
            variant="secondary"
            className="h-11 px-6 text-base"
            nativeButton={false}
            render={<Link href="/signup" />}
          >
            Get started free
            <ArrowRight />
          </Button>
        </Reveal>
      </section>
    </div>
  );
}
