import { Mail, MapPin, MessageCircle } from "lucide-react";
import { ContactForm } from "@/components/contact/ContactForm";

export const metadata = {
  title: "Contact — SkillForge AI",
  description: "Get in touch with the SkillForge AI team.",
};

const contactMethods = [
  {
    icon: Mail,
    label: "Email",
    value: "hello@skillforge.ai",
    href: "mailto:hello@skillforge.ai",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Dhaka, Bangladesh",
  },
  {
    icon: MessageCircle,
    label: "AI Course Advisor",
    value: "Ask questions right on any course page",
  },
];

export default function ContactPage() {
  return (
    <div className="mx-auto w-full max-w-5xl flex-1 px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-4xl font-semibold tracking-tight text-foreground">
          Get in touch
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Questions about a course, a learning path, or SkillForge in general —
          send us a message.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <div className="flex flex-col gap-6">
            {contactMethods.map(({ icon: Icon, label, value, href }) => (
              <div key={label} className="flex items-start gap-3">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="size-4.5" />
                </span>
                <div>
                  <p className="text-sm text-muted-foreground">{label}</p>
                  {href ? (
                    <a
                      href={href}
                      className="text-sm font-medium text-foreground hover:text-primary"
                    >
                      {value}
                    </a>
                  ) : (
                    <p className="text-sm font-medium text-foreground">{value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-3">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
