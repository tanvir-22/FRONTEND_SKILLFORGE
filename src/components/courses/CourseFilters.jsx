"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { COURSE_CATEGORIES, COURSE_LEVELS } from "@/lib/course-categories";
import { buildQueryString } from "@/lib/build-query-string";

const sortOptions = [
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" },
];

export function CourseFilters({ initialParams }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(initialParams.q ?? "");

  useEffect(() => {
    setSearch(initialParams.q ?? "");
  }, [initialParams.q]);

  function navigate(overrides) {
    const current = Object.fromEntries(searchParams.entries());
    const qs = buildQueryString(current, { ...overrides, page: undefined });
    router.push(`${pathname}${qs ? `?${qs}` : ""}`);
  }

  useEffect(() => {
    const handle = setTimeout(() => {
      if (search !== (initialParams.q ?? "")) {
        navigate({ q: search || undefined });
      }
    }, 400);
    return () => clearTimeout(handle);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
      <div className="relative flex-1 sm:min-w-64">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search courses..."
          className="h-10 pl-9"
        />
      </div>

      <Select
        value={initialParams.category ?? "all"}
        onValueChange={(value) => navigate({ category: value === "all" ? undefined : value })}
      >
        <SelectTrigger className="h-10 w-full sm:w-48">
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Categories</SelectItem>
          {COURSE_CATEGORIES.map((category) => (
            <SelectItem key={category.slug} value={category.slug}>
              {category.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={initialParams.level ?? "all"}
        onValueChange={(value) => navigate({ level: value === "all" ? undefined : value })}
      >
        <SelectTrigger className="h-10 w-full sm:w-44">
          <SelectValue placeholder="Level" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Levels</SelectItem>
          {COURSE_LEVELS.map((level) => (
            <SelectItem key={level} value={level}>
              {level}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={initialParams.sort ?? "newest"}
        onValueChange={(value) => navigate({ sort: value === "newest" ? undefined : value })}
      >
        <SelectTrigger className="h-10 w-full sm:w-44">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          {sortOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
