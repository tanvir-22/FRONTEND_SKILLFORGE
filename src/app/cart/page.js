"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  CheckCircle2,
  Loader2,
  ShoppingCart,
  Trash2,
} from "lucide-react";
import toast from "react-hot-toast";
import { useCart } from "@/lib/cart-context";
import { useSession } from "@/lib/auth-client";
import { checkoutEnrollment } from "@/lib/api/enrollments";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export default function CartPage() {
  const { items, removeItem, subtotal, clearCart } = useCart();
  const { data: session } = useSession();
  const router = useRouter();

  const [phase, setPhase] = useState("cart"); // "cart" | "processing" | "success"
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  async function handleConfirmPayment() {
    if (!session) {
      toast.error("Log in to complete checkout");
      router.push("/login?redirect=/cart");
      return;
    }

    setPhase("processing");
    const purchasedItems = items;

    try {
      // Simulated processing delay — this is a demo payment, no real charge.
      await new Promise((resolve) => setTimeout(resolve, 900));
      await checkoutEnrollment(purchasedItems.map((item) => item.slug), session.user.id);
      setEnrolledCourses(purchasedItems);
      clearCart();
      setPhase("success");
    } catch (error) {
      toast.error(error.message || "Payment failed. Please try again.");
      setPhase("cart");
    }
  }

  if (phase === "success") {
    return (
      <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col items-center justify-center gap-4 px-4 py-24 text-center">
        <span className="flex size-16 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500">
          <CheckCircle2 className="size-8" />
        </span>
        <h1 className="text-2xl font-semibold text-foreground">
          Payment successful!
        </h1>
        <p className="max-w-sm text-sm text-muted-foreground">
          You're enrolled in {enrolledCourses.length} course
          {enrolledCourses.length === 1 ? "" : "s"}. You can now leave a review
          on each course's page.
        </p>

        <div className="mt-4 flex w-full flex-col gap-2">
          {enrolledCourses.map((course) => (
            <Link
              key={course.slug}
              href={`/courses/${course.slug}`}
              className="flex items-center gap-3 rounded-xl border border-border bg-card p-3 text-left transition-colors hover:border-primary/40"
            >
              <img
                src={course.coverImage}
                alt={course.title}
                className="size-12 shrink-0 rounded-lg object-cover"
              />
              <span className="line-clamp-1 text-sm font-medium text-foreground">
                {course.title}
              </span>
            </Link>
          ))}
        </div>

        <Button
          className="mt-4"
          nativeButton={false}
          render={<Link href="/courses" />}
        >
          Browse more courses
          <ArrowRight />
        </Button>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col items-center justify-center gap-4 px-4 py-24 text-center">
        <span className="flex size-14 items-center justify-center rounded-full bg-muted text-muted-foreground">
          <ShoppingCart className="size-6" />
        </span>
        <h1 className="text-2xl font-semibold text-foreground">
          Your cart is empty
        </h1>
        <p className="max-w-sm text-sm text-muted-foreground">
          Browse courses and add the ones you want to learn — they'll show up
          here.
        </p>
        <Button
          className="mt-2"
          nativeButton={false}
          render={<Link href="/courses" />}
        >
          Explore courses
          <ArrowRight />
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-4xl flex-1 px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-semibold tracking-tight text-foreground">
        Your Cart
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        {items.length} course{items.length === 1 ? "" : "s"} in your cart.
      </p>

      <div className="mt-8 flex flex-col gap-4">
        {items.map((item) => (
          <div
            key={item.slug}
            className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4"
          >
            <img
              src={item.coverImage}
              alt={item.title}
              className="size-20 shrink-0 rounded-lg object-cover"
            />
            <div className="min-w-0 flex-1">
              <Link
                href={`/courses/${item.slug}`}
                className="line-clamp-1 text-base font-semibold text-foreground hover:underline"
              >
                {item.title}
              </Link>
              {item.instructor && (
                <p className="mt-1 text-sm text-muted-foreground">
                  Taught by {item.instructor}
                </p>
              )}
            </div>
            <span className="shrink-0 font-medium text-foreground">
              {currencyFormatter.format(item.price)}
            </span>
            <button
              type="button"
              onClick={() => removeItem(item.slug)}
              aria-label={`Remove ${item.title} from cart`}
              className="flex size-9 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
            >
              <Trash2 className="size-4" />
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-col gap-4 rounded-2xl border border-border bg-card p-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-muted-foreground">Subtotal</p>
          <p className="text-2xl font-semibold text-foreground">
            {currencyFormatter.format(subtotal)}
          </p>
        </div>

        <AlertDialog>
          <AlertDialogTrigger
            className="inline-flex h-11 items-center justify-center gap-1.5 rounded-lg bg-primary px-6 text-base font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:pointer-events-none disabled:opacity-50"
            disabled={phase === "processing"}
          >
            {phase === "processing" ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                Proceed to Checkout
                <ArrowRight className="size-4" />
              </>
            )}
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirm payment</AlertDialogTitle>
              <AlertDialogDescription>
                Confirm to enroll course{items.length === 1 ? "" : "s"} for{" "}
                {currencyFormatter.format(subtotal)}.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleConfirmPayment}>
                Confirm Payment
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
