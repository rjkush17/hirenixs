import { z } from "zod";

export const OrganizationSchema = z
    .object({
        name: z
            .string()
            .trim()
            .min(2, "Organization name must be at least 2 characters long.")
            .max(50, "Organization name cannot exceed 50 characters.")
            .optional(),

        description: z
            .string()
            .trim()
            .max(300)
            .transform((v) => (v === "" ? undefined : v))
            .optional(),

        location: z.object({
            state: z.string().trim().min(1, "State name is required."),
            city: z.string().trim().min(1, "City name is required."),
        }),

        industry_type: z
            .string()
            .trim()
            .min(2, "Industry type must be at least 2 characters.")
            .max(15, "Industry type cannot exceed 15 characters."),

        website: z
            .string()
            .transform((v) => (v === "" ? undefined : v))
            .optional()
            .refine(
                (val) => {
                    if (!val) return true;

                    if (val.length > 140) return false;
                    if (!val.startsWith("https://")) return false;

                    try {
                        new URL(val);
                        return true;
                    } catch {
                        return false;
                    }
                },
                {
                    message:
                        "Website must be a valid https URL and not exceed 140 characters.",
                },
            ),

        employee: z.enum([
            "0-10",
            "11-50",
            "51-100",
            "101-500",
            "501-2000",
            "2000+",
        ]),
    })
    .strip();
