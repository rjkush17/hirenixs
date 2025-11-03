import { v4 as uuid } from "uuid";

function createUsername(fullName: string) {
  const base = fullName
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "")
    .slice(0, 12);

  const randomPart = uuid().replace(/-/g, "").slice(0, 12);

  return `${base}_${randomPart}`;
}

export default createUsername
