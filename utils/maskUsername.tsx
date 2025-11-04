function maskUsername(username: string) {
  if (username.length <= 2) return username[0] + "*";
  const first = username[0];
  const last = username[username.length - 1];
  const middle = "*".repeat(username.length - 2);
  return `${first}${middle}${last}`;
}

export default maskUsername;
