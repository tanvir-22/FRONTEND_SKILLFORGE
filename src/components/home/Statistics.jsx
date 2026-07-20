import { Bot, LayoutGrid, Milestone, Zap } from "lucide-react";
import CountUp from "@/components/CountUp";
import GlareHover from "@/components/GlareHover";
import { StaggerGroup, StaggerItem } from "@/components/shared/Reveal";

const stats = [
  {
    icon: Zap,
    prefix: "<",
    to: 60,
    suffix: "s",
    label: "To generate a full AI learning path",
  },
  { icon: LayoutGrid, to: 4, label: "Course categories supported" },
  { icon: Milestone, to: 3, label: "Steps from goal to roadmap" },
  { icon: Bot, to: 24, suffix: "/7", label: "AI course advisor availability" },
];

export function Statistics() {
  return (
    <section className="border-b border-border bg-primary py-16">
      <StaggerGroup className="mx-auto grid w-full max-w-7xl grid-cols-2 gap-4 px-4 sm:px-6 lg:grid-cols-4 lg:px-8">
        {stats.map(({ icon: Icon, prefix, to, suffix, label }) => (
          <StaggerItem key={label}>
            <GlareHover
              width="100%"
              height="100%"
              background="transparent"
              borderColor="rgba(255,255,255,0.16)"
              borderRadius="1rem"
              glareColor="#ffffff"
              glareOpacity={0.2}
              glareSize={200}
              transitionDuration={700}
              className="!flex flex-col items-center gap-2.5 px-4 py-7 text-center"
            >
              <span className="flex size-10 items-center justify-center rounded-full bg-primary-foreground/15 text-primary-foreground">
                <Icon className="size-4.5" />
              </span>
              <span className="flex items-baseline text-3xl font-semibold text-primary-foreground">
                {prefix}
                <CountUp to={to} duration={1.5} />
                {suffix}
              </span>
              <span className="text-base font-semibold text-primary-foreground/90">
                {label}
              </span>
            </GlareHover>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </section>
  );
}
