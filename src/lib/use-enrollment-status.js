"use client";

import { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";
import { getEnrollmentStatus } from "@/lib/api/courses";

export function useEnrollmentStatus(slug) {
  const { data: session, isPending: sessionPending } = useSession();
  const [isEnrolled, setIsEnrolled] = useState(null);

  useEffect(() => {
    if (sessionPending) return;

    if (!session) {
      setIsEnrolled(false);
      return;
    }

    let cancelled = false;
    getEnrollmentStatus(slug, session.user.id)
      .then((data) => {
        if (!cancelled) setIsEnrolled(Boolean(data?.enrolled));
      })
      .catch(() => {
        if (!cancelled) setIsEnrolled(false);
      });

    return () => {
      cancelled = true;
    };
  }, [session, sessionPending, slug]);

  return { session, sessionPending, isEnrolled };
}
