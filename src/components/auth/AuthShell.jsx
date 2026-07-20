import Link from "next/link";
import { CheckCircle2, GraduationCap } from "lucide-react";

const highlights = [
  "AI Learning Path generated for your goal & skill level",
  "AI Course Advisor to answer questions and match courses",
  "One dashboard to manage every course you're taking",
];

export function AuthShell({ children }) {
  return (
    <div className="grid min-h-[calc(100vh-4rem)] lg:grid-cols-2">
      <div className="relative hidden flex-col justify-between overflow-hidden bg-primary p-10 text-primary-foreground lg:flex">
        <div className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full bg-primary-foreground/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -left-16 size-72 rounded-full bg-accent/20 blur-3xl" />

      

        <div className="relative my-auto flex flex-col gap-6">
          <h2 className="text-3xl font-semibold leading-tight tracking-tight">
            Learn smarter with an AI that plans your path forward.
          </h2>
          <ul className="flex flex-col gap-3">
            {highlights.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm text-primary-foreground/90">
                <CheckCircle2 className="mt-0.5 size-4.5 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <p className="relative text-sm text-primary-foreground/70">
          “The AI Learning Path took my goal — 'become job-ready in React' — and
          turned it into a 6-course roadmap I actually followed.”
          <br />
          <span className="font-medium text-primary-foreground/90">— Tanvir Hasan, Student</span>
        </p>
      </div>

      <div className="flex items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-10">
        {children}
      </div>
    </div>
  );
}
