const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

async function parseResponse(res) {
  if (res.status === 204) return null;
  const data = await res.json().catch(() => null);
  if (!res.ok) {
    throw new Error(data?.error || `Request failed with status ${res.status}`);
  }
  return data;
}

// Demo/fake payment: records enrollment for each slug, no real charge happens.
export async function checkoutEnrollment(slugs, userId) {
  const res = await fetch(`${BACKEND_URL}/api/enrollments/checkout`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ slugs, userId }),
  });
  return parseResponse(res);
}

// The given user's enrolled courses, with full course details.
export async function getMyEnrollments(userId) {
  const res = await fetch(
    `${BACKEND_URL}/api/enrollments/mine?userId=${encodeURIComponent(userId)}`,
    { cache: "no-store" }
  );
  return parseResponse(res);
}

// Leave/unenroll from a course.
export async function leaveCourse(slug, userId) {
  const res = await fetch(
    `${BACKEND_URL}/api/enrollments/${slug}?userId=${encodeURIComponent(userId)}`,
    { method: "DELETE" }
  );
  return parseResponse(res);
}
