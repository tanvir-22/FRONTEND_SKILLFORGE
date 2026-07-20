"use client";

import { useState } from "react";
import Link from "next/link";
import { Loader2, Pencil, Star } from "lucide-react";
import toast from "react-hot-toast";
import { createReview, updateReview } from "@/lib/api/courses";
import { useEnrollmentStatus } from "@/lib/use-enrollment-status";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

function StarPicker({ value, onChange }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          onClick={() => onChange(n)}
          aria-label={`Rate ${n} star${n === 1 ? "" : "s"}`}
          className="p-0.5"
        >
          <Star
            className={`size-6 transition-colors ${
              n <= value ? "fill-accent text-accent" : "text-muted-foreground"
            }`}
          />
        </button>
      ))}
    </div>
  );
}

function ReviewForm({ rating, comment, onRatingChange, onCommentChange, onSubmit, onCancel, isSubmitting, submitLabel }) {
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-3">
      <StarPicker value={rating} onChange={onRatingChange} />
      <Textarea
        value={comment}
        onChange={(e) => onCommentChange(e.target.value)}
        placeholder="What did you think of this course?"
        className="min-h-20"
      />
      <div className="flex items-center gap-2">
        <Button type="submit" disabled={isSubmitting} className="h-9 w-fit">
          {isSubmitting && <Loader2 className="animate-spin" />}
          {submitLabel}
        </Button>
        {onCancel && (
          <Button type="button" variant="ghost" onClick={onCancel} className="h-9 w-fit">
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
}

export function CourseReviews({ slug, initialReviews }) {
  const { session, sessionPending, isEnrolled } = useEnrollmentStatus(slug);
  const [reviews, setReviews] = useState(initialReviews);
  const [isEditing, setIsEditing] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const myReview = session
    ? reviews.find((review) => review.userId === session.user.id)
    : null;

  function startEditing() {
    if (!myReview) return;
    setRating(myReview.rating);
    setComment(myReview.comment);
    setIsEditing(true);
  }

  function cancelEditing() {
    setIsEditing(false);
    setRating(0);
    setComment("");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (rating < 1) {
      toast.error("Select a star rating");
      return;
    }
    if (!comment.trim()) {
      toast.error("Write a short comment");
      return;
    }

    setIsSubmitting(true);
    try {
      if (isEditing) {
        const updated = await updateReview(slug, {
          userId: session.user.id,
          rating,
          comment: comment.trim(),
        });
        setReviews((prev) =>
          prev.map((review) =>
            review.userId === session.user.id ? { ...review, ...updated } : review
          )
        );
        toast.success("Review updated");
        setIsEditing(false);
      } else {
        const review = await createReview(slug, {
          userId: session.user.id,
          userName: session.user.name,
          rating,
          comment: comment.trim(),
        });
        setReviews((prev) => [review, ...prev]);
        toast.success("Review posted — thanks!");
      }
      setRating(0);
      setComment("");
    } catch (error) {
      toast.error(error.message || "Could not save your review");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="mt-4 flex flex-col gap-6">
      {reviews.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          No written reviews yet. Be the first to share your experience.
        </p>
      ) : (
        <div className="flex flex-col gap-4">
          {reviews.map((review) => {
            const isMine = session && review.userId === session.user.id;
            return (
              <div
                key={review._id ?? `${review.userId}-${review.createdAt}`}
                className="rounded-xl border border-border p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <Avatar className="size-8">
                      <AvatarImage
                        src={`https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(
                          review.userName ?? "Student"
                        )}`}
                        alt={review.userName}
                      />
                      <AvatarFallback>
                        {review.userName?.[0]?.toUpperCase() ?? "S"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-foreground">
                        {review.userName}
                        {isMine && <span className="text-muted-foreground"> (You)</span>}
                      </p>
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <span className="flex items-center gap-0.5">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`size-3 ${
                                i < review.rating
                                  ? "fill-accent text-accent"
                                  : "text-muted-foreground"
                              }`}
                            />
                          ))}
                        </span>
                        <span>
                          {dateFormatter.format(
                            new Date(review.updatedAt ?? review.createdAt)
                          )}
                          {review.updatedAt ? " (edited)" : ""}
                        </span>
                      </div>
                    </div>
                  </div>
                  {isMine && !isEditing && (
                    <button
                      type="button"
                      onClick={startEditing}
                      aria-label="Edit your review"
                      className="flex size-7 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                    >
                      <Pencil className="size-3.5" />
                    </button>
                  )}
                </div>
                <p className="mt-3 text-sm text-muted-foreground">{review.comment}</p>
              </div>
            );
          })}
        </div>
      )}

      <div className="rounded-xl border border-dashed border-border p-4">
        {sessionPending || isEnrolled === null ? (
          <p className="flex items-center gap-2 text-sm text-muted-foreground">
            <Loader2 className="size-4 animate-spin" />
            Checking your enrollment status...
          </p>
        ) : !session ? (
          <p className="text-sm text-muted-foreground">
            <Link href="/login" className="font-medium text-primary hover:underline">
              Log in
            </Link>{" "}
            and enroll in this course to leave a review.
          </p>
        ) : myReview && isEditing ? (
          <div className="flex flex-col gap-3">
            <p className="text-sm font-medium text-foreground">Edit your review</p>
            <ReviewForm
              rating={rating}
              comment={comment}
              onRatingChange={setRating}
              onCommentChange={setComment}
              onSubmit={handleSubmit}
              onCancel={cancelEditing}
              isSubmitting={isSubmitting}
              submitLabel="Save Changes"
            />
          </div>
        ) : myReview ? (
          <p className="text-sm text-muted-foreground">
            You've already reviewed this course — use the pencil icon above to edit it.
          </p>
        ) : !isEnrolled ? (
          <p className="text-sm text-muted-foreground">
            Enroll in this course (add it to your cart and complete checkout) to leave
            a review.
          </p>
        ) : (
          <div className="flex flex-col gap-3">
            <p className="text-sm font-medium text-foreground">Write a review</p>
            <ReviewForm
              rating={rating}
              comment={comment}
              onRatingChange={setRating}
              onCommentChange={setComment}
              onSubmit={handleSubmit}
              isSubmitting={isSubmitting}
              submitLabel="Post Review"
            />
          </div>
        )}
      </div>
    </div>
  );
}
