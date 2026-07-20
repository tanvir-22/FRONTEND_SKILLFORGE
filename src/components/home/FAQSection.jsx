import { SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal } from "@/components/shared/Reveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    id: "how-it-works",
    question: "How does the AI Learning Path Generator actually work?",
    answer:
      "You provide your goal, current skill level, and how much time you can commit per week. The AI reasons across all of these together to produce a structured, multi-course roadmap with milestones — not just a generic list of courses.",
  },
  {
    id: "chatbot",
    question: "What can the AI Course Advisor chatbot actually help with?",
    answer:
      "Ask it things like which course fits your budget, what a course covers before you buy it, or how to adjust your learning path — it keeps context across the conversation so you can ask follow-up questions.",
  },
  {
    id: "free",
    question: "Is SkillForge AI free to use?",
    answer:
      "Creating an account, generating AI learning paths, and browsing courses is free. You pay per course when you're ready to enroll.",
  },
  {
    id: "lifetime-access",
    question: "Do I get lifetime access to a course after enrolling?",
    answer:
      "Yes — once you enroll in a course, it stays in your dashboard under Manage My Courses for as long as your account is active.",
  },
  {
    id: "instructors",
    question: "Who creates the courses on SkillForge?",
    answer:
      "Courses are created and managed by verified instructors. If you're an instructor, you can apply for admin access to publish your own courses.",
  },
  {
    id: "security",
    question: "Is my account and payment data secure?",
    answer:
      "Authentication is handled by Better Auth with hashed credentials and optional Google sign-in, and your data is stored in an access-controlled database.",
  },
];

export function FAQSection() {
  return (
    <section className="border-b border-border bg-background py-20">
      <div className="mx-auto w-full max-w-3xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="FAQ"
          title="Frequently asked questions"
          description="Everything you need to know before you start learning."
        />

        <Reveal delay={0.1}>
          <Accordion className="mt-10">
            {faqs.map((faq) => (
              <AccordionItem key={faq.id} value={faq.id}>
                <AccordionTrigger className="text-base">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}
