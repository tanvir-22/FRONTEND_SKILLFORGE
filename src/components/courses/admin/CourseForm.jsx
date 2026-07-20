"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { useSession } from "@/lib/auth-client";
import { createCourse, updateCourse } from "@/lib/api/courses";
import { COURSE_CATEGORIES, COURSE_LEVELS } from "@/lib/course-categories";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function CourseForm({ mode = "create", initialData }) {
  const router = useRouter();
  const { data: session } = useSession();
  const isEdit = mode === "edit";

  const [form, setForm] = useState(() => ({
    title: initialData?.title ?? "",
    categorySlug: initialData?.categorySlug ?? "",
    level: initialData?.level ?? "",
    shortDescription: initialData?.shortDescription ?? "",
    fullDescription: initialData?.fullDescription ?? "",
    duration: initialData?.duration ?? "",
    price: initialData?.price?.toString() ?? "",
    instructorName: initialData?.instructor?.name ?? "",
    instructorTitle: initialData?.instructor?.title ?? "",
    coverImage: initialData?.coverImage ?? "",
    language: initialData?.language ?? "English",
    tags: initialData?.tags?.join(", ") ?? "",
  }));
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  }

  function handleSelectChange(name, value) {
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  }

  function validate() {
    const next = {};
    if (!form.title.trim()) next.title = "Title is required";
    if (!form.categorySlug) next.categorySlug = "Category is required";
    if (!form.level) next.level = "Level is required";
    if (!form.shortDescription.trim()) next.shortDescription = "Short description is required";
    if (!form.fullDescription.trim()) next.fullDescription = "Full description is required";
    if (!form.duration.trim()) next.duration = "Duration is required (e.g. \"12 hours\")";
    if (form.price === "" || Number.isNaN(Number(form.price)) || Number(form.price) < 0) {
      next.price = "Enter a valid non-negative price";
    }
    if (!form.instructorName.trim()) next.instructorName = "Instructor name is required";
    if (!form.coverImage.trim()) next.coverImage = "Cover image URL is required";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;

    const category = COURSE_CATEGORIES.find((c) => c.slug === form.categorySlug)?.name;

    const payload = {
      title: form.title.trim(),
      category,
      categorySlug: form.categorySlug,
      level: form.level,
      shortDescription: form.shortDescription.trim(),
      fullDescription: form.fullDescription.trim(),
      duration: form.duration.trim(),
      price: Number(form.price),
      instructor: {
        name: form.instructorName.trim(),
        title: form.instructorTitle.trim() || undefined,
      },
      coverImage: form.coverImage.trim(),
      language: form.language.trim() || "English",
      tags: form.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
    };

    setIsSubmitting(true);
    try {
      if (isEdit) {
        await updateCourse(initialData._id, payload);
        toast.success("Course updated");
      } else {
        await createCourse({ ...payload, userId: session?.user?.id });
        toast.success("Course created");
      }
      router.push("/courses/manage");
      router.refresh();
    } catch (error) {
      toast.error(error.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-8">
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5 sm:col-span-2">
          <Label htmlFor="title">Course title</Label>
          <Input
            id="title"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="The Complete JavaScript & React Bootcamp"
            className="h-10"
            aria-invalid={Boolean(errors.title)}
          />
          {errors.title && <p className="text-sm text-destructive">{errors.title}</p>}
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="categorySlug">Category</Label>
          <Select
            value={form.categorySlug || undefined}
            onValueChange={(value) => handleSelectChange("categorySlug", value)}
          >
            <SelectTrigger id="categorySlug" className="h-10 w-full">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              {COURSE_CATEGORIES.map((category) => (
                <SelectItem key={category.slug} value={category.slug}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.categorySlug && (
            <p className="text-sm text-destructive">{errors.categorySlug}</p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="level">Level</Label>
          <Select
            value={form.level || undefined}
            onValueChange={(value) => handleSelectChange("level", value)}
          >
            <SelectTrigger id="level" className="h-10 w-full">
              <SelectValue placeholder="Select a level" />
            </SelectTrigger>
            <SelectContent>
              {COURSE_LEVELS.map((level) => (
                <SelectItem key={level} value={level}>
                  {level}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.level && <p className="text-sm text-destructive">{errors.level}</p>}
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="duration">Duration</Label>
          <Input
            id="duration"
            name="duration"
            value={form.duration}
            onChange={handleChange}
            placeholder="32 hours"
            className="h-10"
            aria-invalid={Boolean(errors.duration)}
          />
          {errors.duration && <p className="text-sm text-destructive">{errors.duration}</p>}
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="price">Price (USD)</Label>
          <Input
            id="price"
            name="price"
            type="number"
            min="0"
            step="1"
            value={form.price}
            onChange={handleChange}
            placeholder="49"
            className="h-10"
            aria-invalid={Boolean(errors.price)}
          />
          {errors.price && <p className="text-sm text-destructive">{errors.price}</p>}
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="shortDescription">Short description</Label>
          <Textarea
            id="shortDescription"
            name="shortDescription"
            value={form.shortDescription}
            onChange={handleChange}
            placeholder="Go from JS fundamentals to building full React applications."
            className="min-h-20"
            aria-invalid={Boolean(errors.shortDescription)}
          />
          {errors.shortDescription && (
            <p className="text-sm text-destructive">{errors.shortDescription}</p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="fullDescription">Full description</Label>
          <Textarea
            id="fullDescription"
            name="fullDescription"
            value={form.fullDescription}
            onChange={handleChange}
            placeholder="What students will learn, module by module..."
            className="min-h-32"
            aria-invalid={Boolean(errors.fullDescription)}
          />
          {errors.fullDescription && (
            <p className="text-sm text-destructive">{errors.fullDescription}</p>
          )}
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="instructorName">Instructor name</Label>
          <Input
            id="instructorName"
            name="instructorName"
            value={form.instructorName}
            onChange={handleChange}
            placeholder="Tanvir Hasan"
            className="h-10"
            aria-invalid={Boolean(errors.instructorName)}
          />
          {errors.instructorName && (
            <p className="text-sm text-destructive">{errors.instructorName}</p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="instructorTitle">Instructor title (optional)</Label>
          <Input
            id="instructorTitle"
            name="instructorTitle"
            value={form.instructorTitle}
            onChange={handleChange}
            placeholder="Senior Frontend Engineer"
            className="h-10"
          />
        </div>

        <div className="flex flex-col gap-1.5 sm:col-span-2">
          <Label htmlFor="coverImage">Cover image URL</Label>
          <Input
            id="coverImage"
            name="coverImage"
            value={form.coverImage}
            onChange={handleChange}
            placeholder="https://..."
            className="h-10"
            aria-invalid={Boolean(errors.coverImage)}
          />
          {errors.coverImage && (
            <p className="text-sm text-destructive">{errors.coverImage}</p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="language">Language</Label>
          <Input
            id="language"
            name="language"
            value={form.language}
            onChange={handleChange}
            placeholder="English"
            className="h-10"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="tags">Tags (comma-separated, optional)</Label>
          <Input
            id="tags"
            name="tags"
            value={form.tags}
            onChange={handleChange}
            placeholder="react, javascript"
            className="h-10"
          />
        </div>
      </section>

      <div className="flex items-center gap-3">
        <Button type="submit" disabled={isSubmitting} className="h-10">
          {isSubmitting && <Loader2 className="animate-spin" />}
          {isEdit ? "Save Changes" : "Create Course"}
        </Button>
        <Button
          type="button"
          variant="ghost"
          onClick={() => router.push("/courses/manage")}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
