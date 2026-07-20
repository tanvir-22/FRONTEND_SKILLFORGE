"use client";

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
} from "framer-motion";
import {
  ArrowRight,
  Clock3,
  Route,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import {
  SiPython,
  SiDavinciresolve,
  SiFigma,
  SiGoogleads,
} from "react-icons/si";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import TextType from "@/components/TextType";

const roadmaps = [
  {
    tag: "programming",
    goal: "Frontend Developer",
    weeks: "10 weeks",
    milestones: [
      "HTML & CSS Fundamentals",
      "JavaScript Essentials",
      "React from Scratch",
      "Build & Deploy a Portfolio",
    ],
  },
  {
    tag: "video-editing",
    goal: "Video Editor",
    weeks: "6 weeks",
    milestones: [
      "Premiere Pro Basics",
      "Color Grading & Audio",
      "Motion Graphics in After Effects",
    ],
  },
  {
    tag: "design",
    goal: "UI/UX Designer",
    weeks: "8 weeks",
    milestones: [
      "Design Systems in Figma",
      "User Research Fundamentals",
      "Prototyping & Handoff",
    ],
  },
];

const floatingChips = [
  {
    label: "Python",
    icon: SiPython,
    iconColor: "#3776AB",
    className: "-left-6 top-10",
    duration: 4.2,
  },
  {
    label: "DaVinci Resolve",
    icon: SiDavinciresolve,
    iconColor: "#233A51",
    className: "-right-8 top-2",
    duration: 5,
  },
  {
    label: "Figma",
    icon: SiFigma,
    iconColor: "#F24E1E",
    className: "-right-10 bottom-24",
    duration: 4.6,
  },
  {
    label: "Google Ads",
    icon: SiGoogleads,
    iconColor: "#4285F4",
    className: "-left-10 bottom-8",
    duration: 3.8,
  },
];

const NODE_SIZE = 36;
const ROW_GAP = 16;
const ROW_PITCH = NODE_SIZE + ROW_GAP;

export function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const next = setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % roadmaps.length);
    }, 5200);
    return () => clearTimeout(next);
  }, [activeIndex]);

  const active = roadmaps[activeIndex];
  const lineHeight = (active.milestones.length - 1) * ROW_PITCH;

  const cardRef = useRef(null);
  const rawRotateX = useMotionValue(0);
  const rawRotateY = useMotionValue(0);
  const rotateX = useSpring(rawRotateX, { stiffness: 150, damping: 18 });
  const rotateY = useSpring(rawRotateY, { stiffness: 150, damping: 18 });

  function handleMouseMove(e) {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    rawRotateY.set(px * 8);
    rawRotateX.set(py * -8);
  }

  function handleMouseLeave() {
    rawRotateX.set(0);
    rawRotateY.set(0);
  }

  return (
    <section className="relative flex min-h-[60vh] items-center overflow-hidden border-b border-border bg-gradient-to-b from-primary/5 to-background lg:min-h-[70vh]">
      <div className="mx-auto grid w-full max-w-[1300px] grid-cols-1 items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
            <Sparkles className="size-3.5" />
            AI-Powered Learning
          </span>

          <h1 className="mt-5 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Learn{" "}
            <TextType
              as="span"
              className="text-primary"
              text={["coding", "video editing", "UI/UX design", "digital marketing"]}
              typingSpeed={70}
              deletingSpeed={35}
              pauseDuration={1800}
              loop
            />
            <br className="hidden sm:block" /> with an AI that plans your path
            forward.
          </h1>

          <p className="mt-5 max-w-xl text-lg text-muted-foreground">
            Tell SkillForge your goal, current skill level, and time budget —
            get a personalized multi-course learning path and course
            recommendations in seconds, not hours of searching.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button
              size="lg"
              className="h-11 px-6 text-base"
              nativeButton={false}
              render={<Link href="/signup" />}
            >
              Start learning free
              <ArrowRight />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-11 px-6 text-base"
              nativeButton={false}
              render={<Link href="/courses" />}
            >
              Explore courses
            </Button>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="size-4 text-primary" />
              No credit card required
            </span>
            <span className="flex items-center gap-1.5">
              <Clock3 className="size-4 text-primary" />
              Learning paths generated in seconds
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative mx-auto w-full max-w-md"
          style={{ perspective: 1200 }}
        >
          {/* Ambient glow */}
          <motion.div
            aria-hidden
            className="absolute inset-0 -z-10 rounded-[2rem] bg-primary/20 blur-3xl"
            animate={{ opacity: [0.4, 0.7, 0.4], scale: [0.95, 1.05, 0.95] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Floating category chips */}
          {floatingChips.map((chip) => (
            <motion.span
              key={chip.label}
              aria-hidden
              className={`pointer-events-none absolute z-10 hidden select-none items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground shadow-md sm:inline-flex ${chip.className}`}
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: chip.duration, repeat: Infinity, ease: "easeInOut" }}
            >
              <chip.icon className="size-3.5 shrink-0" style={{ color: chip.iconColor }} />
              {chip.label}
            </motion.span>
          ))}

          <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className="relative rounded-2xl border border-border bg-card p-5 shadow-xl"
          >
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                <span className="flex size-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Route className="size-3.5" />
                </span>
                AI Learning Path
              </span>
              <span className="flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
                <Sparkles className="size-3" />
                Live
              </span>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.3 }}
                className="mt-5 min-h-[220px]"
              >
                <div className="flex items-baseline justify-between">
                  <h3 className="text-xl font-semibold text-foreground">
                    Goal: {active.goal}
                  </h3>
                  <span className="flex items-center gap-1 text-sm font-medium text-foreground">
                    <Clock3 className="size-3.5 text-muted-foreground" />
                    {active.weeks}
                  </span>
                </div>

                <div className="relative mt-6">
                  {active.milestones.length > 1 && (
                    <>
                      <div
                        className="absolute left-[17px] top-[18px] w-px bg-border"
                        style={{ height: lineHeight }}
                      />
                      <motion.div
                        className="absolute left-[17px] top-[18px] w-px bg-primary"
                        initial={{ height: 0 }}
                        animate={{ height: lineHeight }}
                        transition={{ duration: 0.9, ease: "easeInOut" }}
                      />
                    </>
                  )}

                  <div className="flex flex-col gap-4">
                    {active.milestones.map((label, i) => (
                      <motion.div
                        key={label}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.15 + i * 0.25, duration: 0.35 }}
                        className="relative z-10 flex items-center gap-3"
                      >
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{
                            delay: 0.15 + i * 0.25,
                            type: "spring",
                            stiffness: 320,
                            damping: 16,
                          }}
                          className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground"
                        >
                          {i + 1}
                        </motion.span>
                        <span className="text-sm text-foreground">{label}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="mt-5 flex items-center justify-center gap-1.5">
              {roadmaps.map((roadmap, index) => (
                <button
                  key={roadmap.tag}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  aria-label={`Show ${roadmap.goal} roadmap`}
                  className={`h-1.5 rounded-full transition-all ${
                    index === activeIndex ? "w-6 bg-primary" : "w-1.5 bg-muted"
                  }`}
                />
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
