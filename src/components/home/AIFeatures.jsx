import Link from "next/link";
import { ArrowRight, CheckCircle2, MessageCircle, Sparkles } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { StaggerGroup, StaggerItem } from "@/components/shared/Reveal";
import { Button } from "@/components/ui/button";

const pathChecklist = [
  "A step-by-step, multi-course roadmap toward your goal",
  "Matched to your current skill level and time budget",
  "Milestones so you always know what's next",
  "Adjusts if your goal or available time changes",
];

const chatbotSignals = [
  "Remembers context across your conversation",
  "Answers questions about a course's syllabus & content",
  "Recommends courses based on budget and goals",
];

export function AIFeatures() {
  return (
    <section id="ai-features" className="border-b border-border bg-primary/5 py-20">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="AI Features"
          title="Two AI agents, working for your learning"
          description="SkillForge doesn't just generate text — it reasons across your goal, skill level, and time budget to make real planning decisions."
        />

        <StaggerGroup className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <StaggerItem className="flex flex-col rounded-2xl border border-border bg-card p-8 shadow-sm">
            <span className="flex size-11 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <Sparkles className="size-5" />
            </span>
            <h3 className="mt-5 text-xl font-semibold text-foreground">
              AI Learning Path Generator
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Give it your goal, current skill level, and time budget — it
              reasons through all of it at once to build a complete,
              multi-course roadmap.
            </p>
            <ul className="mt-5 flex flex-col gap-2.5">
              {pathChecklist.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-foreground">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                  {item}
                </li>
              ))}
            </ul>
            <Button
              className="mt-6 w-fit"
              nativeButton={false}
              render={<Link href="/signup" />}
            >
              Generate a learning path
              <ArrowRight />
            </Button>
          </StaggerItem>

          <StaggerItem className="flex flex-col rounded-2xl border border-border bg-card p-8 shadow-sm">
            <span className="flex size-11 items-center justify-center rounded-xl bg-accent text-accent-foreground">
              <MessageCircle className="size-5" />
            </span>
            <h3 className="mt-5 text-xl font-semibold text-foreground">
              AI Course Advisor Chatbot
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Ask "Which course should I take to get job-ready in React?" and
              get a grounded answer — then ask a follow-up and it remembers
              what you already told it.
            </p>
            <ul className="mt-5 flex flex-col gap-2.5">
              {chatbotSignals.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-foreground">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                  {item}
                </li>
              ))}
            </ul>
            <Button
              variant="outline"
              className="mt-6 w-fit"
              nativeButton={false}
              render={<Link href="/signup" />}
            >
              Chat with the AI advisor
              <ArrowRight />
            </Button>
          </StaggerItem>
        </StaggerGroup>
      </div>
    </section>
  );
}
