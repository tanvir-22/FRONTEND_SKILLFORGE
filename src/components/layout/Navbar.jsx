"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, GraduationCap, LayoutList, PlusCircle, LogOut, User, BookOpen } from "lucide-react";
import toast from "react-hot-toast";
import { authClient, useSession } from "@/lib/auth-client";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { CartButton } from "@/components/cart/CartButton";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

const publicLinks = [
  { href: "/", label: "Home" },
  { href: "/courses", label: "Explore Courses" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const studentLinks = [{ href: "/my-courses", label: "My Courses" }];

const adminLinks = [
  { href: "/courses/add", label: "Create Course" },
  { href: "/courses/manage", label: "Manage Courses" },
];

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isAdmin = session?.user?.role === "admin";
  const links = session
    ? [...publicLinks, ...studentLinks, ...(isAdmin ? adminLinks : [])]
    : publicLinks;

  async function handleSignOut() {
    await authClient.signOut();
    toast.success("Signed out");
    router.push("/");
    router.refresh();
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/80 bg-background/85 backdrop-blur supports-backdrop-filter:bg-background/70">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 text-lg font-semibold text-foreground">
          <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <GraduationCap className="size-4.5" />
          </span>
          SkillForge AI
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
                pathname === link.href && "bg-muted text-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          {!isPending && session && <CartButton />}
          <ThemeToggle />
          {isPending ? null : session ? (
            <DropdownMenu>
              <DropdownMenuTrigger
                aria-label="Account menu"
                className="rounded-full outline-none ring-primary/50 transition-shadow focus-visible:ring-2"
              >
                <Avatar className="size-9">
                  <AvatarImage src={session.user.image ?? undefined} alt={session.user.name} />
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {session.user.name?.[0]?.toUpperCase() ?? "U"}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuGroup>
                  <DropdownMenuLabel className="font-normal">
                    <p className="text-sm font-medium text-foreground">{session.user.name}</p>
                    <p className="truncate text-xs text-muted-foreground">{session.user.email}</p>
                  </DropdownMenuLabel>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem render={<Link href="/my-courses" />}>
                    <BookOpen /> My Courses
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                {isAdmin && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <DropdownMenuItem render={<Link href="/courses/add" />}>
                        <PlusCircle /> Create Course
                      </DropdownMenuItem>
                      <DropdownMenuItem render={<Link href="/courses/manage" />}>
                        <LayoutList /> Manage Courses
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem variant="destructive" onClick={handleSignOut}>
                  <LogOut /> Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button variant="ghost" nativeButton={false} render={<Link href="/login" />}>
                Log in
              </Button>
              <Button nativeButton={false} render={<Link href="/signup" />}>
                Sign up
              </Button>
            </>
          )}
        </div>

        <div className="flex items-center gap-1 lg:hidden">
          {!isPending && session && <CartButton />}
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="inline-flex size-9 items-center justify-center rounded-lg text-foreground"
            aria-label="Open menu"
          >
            <Menu className="size-5" />
          </button>
        </div>
      </div>

      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="right" className="w-72">
          <SheetHeader>
            <SheetTitle>SkillForge AI</SheetTitle>
          </SheetHeader>
          <nav className="flex flex-col gap-1 px-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground",
                  pathname === link.href && "bg-muted text-foreground"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="mt-auto flex flex-col gap-2 border-t border-border p-4">
            {session ? (
              <>
                <div className="flex items-center gap-2 px-1 pb-2">
                  <Avatar className="size-8">
                    <AvatarImage src={session.user.image ?? undefined} alt={session.user.name} />
                    <AvatarFallback>
                      {session.user.name?.[0]?.toUpperCase() ?? "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-foreground">
                      {session.user.name}
                    </p>
                    <p className="truncate text-xs text-muted-foreground">
                      {session.user.email}
                    </p>
                  </div>
                </div>
                <Button variant="outline" onClick={handleSignOut}>
                  <LogOut /> Log out
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="outline"
                  nativeButton={false}
                  render={<Link href="/login" onClick={() => setMobileOpen(false)} />}
                >
                  <User /> Log in
                </Button>
                <Button
                  nativeButton={false}
                  render={<Link href="/signup" onClick={() => setMobileOpen(false)} />}
                >
                  Sign up
                </Button>
              </>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
}
