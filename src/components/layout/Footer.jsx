import Link from "next/link";
import { GraduationCap, Mail, MapPin } from "lucide-react";
import { FaFacebookSquare, FaInstagramSquare, FaLinkedin, FaTwitterSquare } from "react-icons/fa";
const productLinks = [
  { href: "/courses", label: "Explore Courses" },
  { href: "/courses/add", label: "Create Course" },
  { href: "/courses/manage", label: "Manage Courses" },
  { href: "/#ai-features", label: "AI Advisor & Learning Paths" },
];

const companyLinks = [
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/blog", label: "Blog & Help" },
];

const legalLinks = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
];

const socialLinks = [
  { href: "https://twitter.com", label: "Twitter", icon: FaTwitterSquare },
  { href: "https://facebook.com", label: "Facebook", icon: FaFacebookSquare },
  { href: "https://instagram.com", label: "Instagram", icon: FaInstagramSquare },
  { href: "https://linkedin.com", label: "LinkedIn", icon: FaLinkedin },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/40">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-2 gap-8 px-4 py-14 sm:px-6 md:grid-cols-4 lg:px-8">
        <div className="col-span-2 flex flex-col gap-4">
          <Link href="/" className="flex items-center gap-2 text-lg font-semibold text-foreground">
            <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <GraduationCap className="size-4.5" />
            </span>
            SkillForge AI
          </Link>
          <p className="max-w-sm text-sm text-muted-foreground">
            Learn in-demand skills with AI-guided course recommendations and
            learning paths — from coding to video editing, matched to your goals.
          </p>
          <div className="flex flex-col gap-2 text-sm text-muted-foreground">
            <a
              href="mailto:hello@skillforge.ai"
              className="flex items-center gap-2 hover:text-foreground"
            >
              <Mail className="size-4" />
              hello@skillforge.ai
            </a>
            <span className="flex items-center gap-2">
              <MapPin className="size-4" />
              Dhaka, Bangladesh
            </span>
          </div>
          <div className="flex items-center gap-2 pt-2">
            {socialLinks.map(({ href, label, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex size-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
              >
                <Icon className="size-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-foreground">Product</h3>
          <ul className="mt-4 flex flex-col gap-3">
            {productLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-foreground">Company</h3>
          <ul className="mt-4 flex flex-col gap-3">
            {companyLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <h3 className="mt-6 text-sm font-semibold text-foreground">Legal</h3>
          <ul className="mt-4 flex flex-col gap-3">
            {legalLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-2 px-4 py-6 text-xs text-muted-foreground sm:flex-row sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} SkillForge AI. All rights reserved.</p>
          <p>Built for smarter, AI-guided learning.</p>
        </div>
      </div>
    </footer>
  );
}
