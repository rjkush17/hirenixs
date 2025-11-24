import * as z from "zod";
import { FUTURE_YEAR_LIMIT, MAX_YEAR, MIN_YEAR } from "@/lib/datetime";

export const EducationSchema = z
    .object({
        institute: z
            .string()
            .trim()
            .min(3, "Institute name must be at least 3 characters")
            .max(60, "Institute name must be under 60 characters"),

        course: z
            .string()
            .trim()
            .min(2, "Course name must be at least 2 characters")
            .max(40, "Course name must be under 40 characters"),

        startDate: z.object({
            month: z
                .number()
                .min(0, "Month must be between 0 and 11")
                .max(11, "Month must be between 0 and 11"),

            year: z
                .number()
                .min(MIN_YEAR, `You cannot select a year before ${MIN_YEAR}`)
                .max(MAX_YEAR, "You cannot select a year after current year"),
        }),

        endDate: z.object({
            month: z
                .number()
                .min(0, "Month must be between 0 and 11")
                .max(11, "Month must be between 0 and 11"),

            year: z
                .number()
                .min(MIN_YEAR, `You cannot select a year before ${MIN_YEAR}`)
                .max(FUTURE_YEAR_LIMIT, `You cannot select a future year beyond ${FUTURE_YEAR_LIMIT}`),
        }),
        description: z
            .string()
            .optional()
            .refine(
                (v) => !v || v.length >= 15,
                "Description must be at least 15 characters",
            )
            .refine(
                (v) => !v || v.length <= 300,
                "Description must be under 300 characters",
            ),
    })
    .superRefine((v, ctx) => {
        const start = v.startDate;
        const end = v.endDate;

        if (start.year > end.year) {
            ctx.addIssue({
                code: "custom",
                message: "End Year connot be before start year",
                path: ["endDate", "year"],
            });
            return;
        }

        if (start.year === end.year && start.month >= end.month) {
            ctx.addIssue({
                code: "custom",
                message: "End month must be after start month",
                path: ["endDate", "month"],
            });
            return;
        }
    });

export type EducationSchemaType = z.infer<typeof EducationSchema>;
