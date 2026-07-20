"use client";

import { useState } from "react";
import { Mail } from "lucide-react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Reveal } from "@/components/shared/Reveal";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (!emailPattern.test(email)) {
      toast.error("Enter a valid email address");
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setEmail("");
      toast.success("You're on the list — we'll be in touch!");
    }, 500);
  }

  return (
    <section className="bg-primary py-16">
      <Reveal className="mx-auto flex w-full max-w-4xl flex-col items-center gap-6 px-4 text-center sm:px-6 lg:px-8">
        <span className="flex size-12 items-center justify-center rounded-full bg-primary-foreground/10 text-primary-foreground">
          <Mail className="size-5" />
        </span>
        <h2 className="text-3xl font-semibold tracking-tight text-primary-foreground sm:text-4xl">
          Get new courses & features first
        </h2>
        <p className="max-w-xl text-primary-foreground/80">
          Occasional updates when we add new courses, categories, or AI
          learning features. No spam.
        </p>

        <form
          onSubmit={handleSubmit}
          className="flex w-full max-w-md flex-col gap-3 sm:flex-row"
        >
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            aria-label="Email address"
            className="h-11 flex-1 border-primary-foreground/30 bg-primary-foreground/10 text-primary-foreground placeholder:text-primary-foreground/60 focus-visible:border-primary-foreground/60 focus-visible:ring-primary-foreground/30"
          />
          <Button
            type="submit"
            variant="secondary"
            disabled={isSubmitting}
            className="h-11 px-6"
          >
            {isSubmitting ? "Subscribing..." : "Subscribe"}
          </Button>
        </form>
      </Reveal>
    </section>
  );
}
