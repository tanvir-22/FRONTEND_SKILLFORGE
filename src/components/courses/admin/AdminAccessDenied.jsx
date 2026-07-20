import Link from "next/link";
import { ArrowRight, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AdminAccessDenied() {
  return (
    <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col items-center justify-center gap-4 px-4 py-24 text-center">
      <span className="flex size-14 items-center justify-center rounded-full bg-muted text-muted-foreground">
        <ShieldAlert className="size-6" />
      </span>
      <h1 className="text-2xl font-semibold text-foreground">Admin access required</h1>
      <p className="max-w-sm text-sm text-muted-foreground">
        Only admins can create, edit, or delete courses. If you think this is a
        mistake, contact an existing admin.
      </p>
      <Button className="mt-2" nativeButton={false} render={<Link href="/" />}>
        Back to home
        <ArrowRight />
      </Button>
    </div>
  );
}
