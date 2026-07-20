"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ShoppingCart } from "lucide-react";
import toast from "react-hot-toast";
import { useCart } from "@/lib/cart-context";
import { useSession } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function AddToCartButton({ course, variant = "icon", className }) {
  const { addItem, removeItem, isInCart } = useCart();
  const { data: session } = useSession();
  const router = useRouter();
  const [justAdded, setJustAdded] = useState(false);

  if (!course?.slug) return null;

  const inCart = isInCart(course.slug);

  function handleClick() {
    if (inCart) {
      removeItem(course.slug);
      toast.success(`Removed "${course.title}" from cart`);
      return;
    }

    if (!session) {
      toast.error("Log in to add courses to your cart");
      router.push(`/login?redirect=/courses/${course.slug}`);
      return;
    }

    addItem(course);
    setJustAdded(true);
    toast.success(`Added "${course.title}" to cart`, { icon: "🛒" });
    setTimeout(() => setJustAdded(false), 1200);
  }

  const showCheck = inCart || justAdded;

  if (variant === "full") {
    return (
      <Button
        type="button"
        size="lg"
        variant={showCheck ? "outline" : "default"}
        onClick={handleClick}
        className={cn("h-11 w-full overflow-hidden text-base", className)}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={showCheck ? "in-cart" : "add"}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15 }}
            className="flex items-center gap-1.5"
          >
            {showCheck ? <Check /> : <ShoppingCart />}
            {showCheck ? "Added to Cart" : "Add to Cart"}
          </motion.span>
        </AnimatePresence>
      </Button>
    );
  }

  return (
    <Button
      type="button"
      size="icon"
      variant={showCheck ? "secondary" : "outline"}
      onClick={handleClick}
      aria-label={inCart ? "Remove from cart" : "Add to cart"}
      className={cn("h-9 w-9 shrink-0 overflow-hidden", className)}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={showCheck ? "in-cart" : "add"}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.6 }}
          transition={{ duration: 0.15 }}
          className="flex items-center justify-center"
        >
          {showCheck ? <Check className="size-4" /> : <ShoppingCart className="size-4" />}
        </motion.span>
      </AnimatePresence>
    </Button>
  );
}
