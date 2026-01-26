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
                .max(
                    FUTURE_YEAR_LIMIT,
                    `You cannot select a future year beyond ${FUTURE_YEAR_LIMIT}`,
                ),
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

export const ExperienceSchema = z
    .object({
        company: z.string().min(3),
        title: z.string().min(2),
        isPresent: z.boolean().optional(),
        startDate: z.object({
            month: z.number().min(0).max(11),
            year: z.number().min(MIN_YEAR).max(MAX_YEAR),
        }),
        //FIX: in correct date msg not mentioned need to fixed it
        endDate: z
            .object({
                month: z.number().min(0).max(11),
                year: z.number().min(MIN_YEAR).max(MAX_YEAR),
            })
            .optional(),

        description: z
            .string()
            .optional()
            .refine((v) => !v || v.length >= 15, "At least 15 chars")
            .refine((v) => !v || v.length <= 300, "Under 300 chars"),
    })
    .superRefine((data, ctx) => {
        const { isPresent, startDate, endDate } = data;

        if (!isPresent && !endDate) {
            ctx.addIssue({
                code: "custom",
                path: ["endDate"],
                message: "End date is required unless currently working.",
            });
            return;
        }

        if (isPresent || !endDate) return;

        if (startDate.year > endDate.year) {
            ctx.addIssue({
                code: "custom",
                path: ["endDate", "year"],
                message: "End year cannot be before start year.",
            });
        }

        if (startDate.year === endDate.year && startDate.month >= endDate.month) {
            ctx.addIssue({
                code: "custom",
                path: ["endDate", "month"],
                message: "End month must be after start month.",
            });
        }
    });
export type ExperienceSchemaType = z.infer<typeof ExperienceSchema>;

export const SkillsSchema = z.object({
    skills: z
        .string()
        .trim()
        .min(2, "Please enter skill name more then 2 letter"),
});
export type SkillsSchemaType = z.infer<typeof SkillsSchema>;

export const SocialLinks = z.object({
    plateform: z
        .string()
        .min(1, "Platform name must complete 1 letter")
        .max(15, "Platform name connot be complete 15 letter"),
    url: z
        .string()
        .url("Invalid Links")
        .min(4, "Invalid Links")
        .max(140, "Links size is over please give short links or use link shortner")
        .refine(
            (v) => v.startsWith("https://"),
            "linked show be start with https://",
        ),
});
export type SocialLinksType = z.infer<typeof SocialLinks>;

export const ProfileSchema = z.object({
    title: z
        .string()
        .min(3, "Profile name should be atlest contain 3 characters")
        .max(30, "you profile name character limit exceed"),
    bio: z
        .string()
        .optional()
        .refine((v) => !v || v.length >= 15, "At least 15 chars")
        .refine((v) => !v || v.length <= 300, "Under 300 chars"),
});
export type ProfileSchemaType = z.infer<typeof ProfileSchema>;
