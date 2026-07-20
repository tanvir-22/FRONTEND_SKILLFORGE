"use client";

import { useState } from "react";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import toast from "react-hot-toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const initialForm = { name: "", email: "", subject: "", message: "" };

export function ContactForm() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(null);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  }

  function validate() {
    const next = {};
    if (!form.name.trim()) next.name = "Name is required";
    if (!form.email.trim()) next.email = "Email is required";
    else if (!emailPattern.test(form.email)) next.email = "Enter a valid email address";
    if (!form.subject.trim()) next.subject = "Subject is required";
    if (!form.message.trim()) next.message = "Message is required";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    // Demo form — no backend endpoint yet, just a simulated round trip.
    await new Promise((resolve) => setTimeout(resolve, 700));
    setSubmitted(form);
    setForm(initialForm);
    setIsSubmitting(false);
    toast.success("Message sent");
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-2xl border border-border bg-card p-8 text-center">
        <span className="flex size-14 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500">
          <CheckCircle2 className="size-7" />
        </span>
        <div>
          <h3 className="text-lg font-semibold text-foreground">
            Thanks, {submitted.name}!
          </h3>
          <p className="mt-2 max-w-sm text-sm text-muted-foreground">
            We&apos;ve received your message about &quot;{submitted.subject}&quot; and
            will get back to you soon at {submitted.email}.
          </p>
        </div>
        <Button
          type="button"
          variant="outline"
          onClick={() => setSubmitted(null)}
          className="mt-2"
        >
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Jane Doe"
            className="h-10"
            aria-invalid={Boolean(errors.name)}
          />
          {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="you@example.com"
            className="h-10"
            aria-invalid={Boolean(errors.email)}
          />
          {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="subject">Subject</Label>
        <Input
          id="subject"
          name="subject"
          value={form.subject}
          onChange={handleChange}
          placeholder="Question about a course"
          className="h-10"
          aria-invalid={Boolean(errors.subject)}
        />
        {errors.subject && <p className="text-sm text-destructive">{errors.subject}</p>}
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder="How can we help?"
          className="min-h-32"
          aria-invalid={Boolean(errors.message)}
        />
        {errors.message && <p className="text-sm text-destructive">{errors.message}</p>}
      </div>

      <Button type="submit" disabled={isSubmitting} className="mt-2 h-10 w-fit">
        {isSubmitting ? <Loader2 className="animate-spin" /> : <Send />}
        {isSubmitting ? "Sending..." : "Send Message"}
      </Button>
    </form>
  );
}
