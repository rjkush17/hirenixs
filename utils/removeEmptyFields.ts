export function removeEmptyFields<T extends Record<string, unknown>>(
    obj: T,
): Partial<T> {
    return Object.fromEntries(
        Object.entries(obj).filter(([_, value]) => {
            if (value === null || value === undefined) return false;
            if (typeof value === "string" && value.trim() === "") return false;
            if (Array.isArray(value) && value.length === 0) return false;
            return true;
        }),
    ) as Partial<T>;
}
