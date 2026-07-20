import { cn } from "@/lib/utils";
import { Reveal } from "@/components/shared/Reveal";
import ShinyText from "@/components/ShinyText";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}) {
  return (
    <Reveal
      className={cn(
        "mx-auto max-w-2xl",
        align === "center" ? "text-center" : "text-left",
        className
      )}
    >
      {eyebrow && (
        <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold tracking-wide uppercase">
          <ShinyText
            text={eyebrow}
            color="var(--color-primary)"
            shineColor="var(--color-accent)"
            speed={2.5}
          />
        </span>
      )}
      <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-3 text-base text-muted-foreground">{description}</p>
      )}
    </Reveal>
  );
}
