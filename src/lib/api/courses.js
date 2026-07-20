const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

async function parseResponse(res) {
  if (res.status === 204) return null;
  const data = await res.json().catch(() => null);
  if (!res.ok) {
    throw new Error(data?.error || `Request failed with status ${res.status}`);
  }
  return data;
}

// Public — list courses with optional search/filter/sort/pagination.
// params: { category, q, level, minPrice, maxPrice, sort, page, limit }
export async function getCourses(params = {}) {
  const query = new URLSearchParams(
    Object.entries(params).filter(([, value]) => value !== undefined && value !== "")
  ).toString();

  const res = await fetch(`${BACKEND_URL}/api/courses${query ? `?${query}` : ""}`, {
    cache: "no-store",
  });
  return parseResponse(res);
}

// Public — single course by slug.
export async function getCourseBySlug(slug) {
  const res = await fetch(`${BACKEND_URL}/api/courses/${slug}`, {
    cache: "no-store",
  });
  return parseResponse(res);
}

// Restricted to admins in the Next.js UI only — backend enforces nothing.
export async function createCourse(payload) {
  const res = await fetch(`${BACKEND_URL}/api/courses`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return parseResponse(res);
}

// Restricted to admins in the Next.js UI only.
export async function updateCourse(id, payload) {
  const res = await fetch(`${BACKEND_URL}/api/courses/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return parseResponse(res);
}

// Restricted to admins in the Next.js UI only.
export async function deleteCourse(id) {
  const res = await fetch(`${BACKEND_URL}/api/courses/${id}`, {
    method: "DELETE",
  });
  return parseResponse(res);
}

// Public — list reviews for a course.
export async function getCourseReviews(slug) {
  const res = await fetch(`${BACKEND_URL}/api/courses/${slug}/reviews`, {
    cache: "no-store",
  });
  return parseResponse(res);
}

// payload must include { userId, userName, rating, comment }.
export async function createReview(slug, payload) {
  const res = await fetch(`${BACKEND_URL}/api/courses/${slug}/reviews`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return parseResponse(res);
}

// payload must include { userId, rating, comment } — edits the caller's own review.
export async function updateReview(slug, payload) {
  const res = await fetch(`${BACKEND_URL}/api/courses/${slug}/reviews`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return parseResponse(res);
}

// Checks whether the given user is enrolled in this course.
export async function getEnrollmentStatus(slug, userId) {
  const res = await fetch(
    `${BACKEND_URL}/api/courses/${slug}/enrollment?userId=${encodeURIComponent(userId)}`,
    { cache: "no-store" }
  );
  return parseResponse(res);
}
