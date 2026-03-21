export function getSidebarFromCookie() {
  if (typeof document === "undefined") return true;

  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith("sidebar_state="));

  return match ? match.split("=")[1] === "true" : true;
}
