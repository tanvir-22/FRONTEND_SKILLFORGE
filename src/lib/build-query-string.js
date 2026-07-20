export function buildQueryString(params, overrides = {}) {
  const merged = { ...params, ...overrides };
  const usp = new URLSearchParams();

  Object.entries(merged).forEach(([key, value]) => {
    if (value === undefined || value === null || value === "" || value === "all") return;
    usp.set(key, String(value));
  });

  return usp.toString();
}
