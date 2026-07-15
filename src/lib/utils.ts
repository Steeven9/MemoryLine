export function formatDate(value: string) {
  const parsed = new Date(`${value}T00:00:00`);
  return parsed.toLocaleDateString("en", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
