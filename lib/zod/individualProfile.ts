import { z } from "zod";

export const OnboardingSchema = z
    .object({
        title: z.string().trim().min(1).optional(),
        bio: z
            .string()
            .trim()
            .min(1)
            .transform((v) => (v === "" ? undefined : v))
            .optional(),

        skills: z
            .array(z.string().trim().min(1))
            .min(0)
            .transform((arr) => (arr.length === 0 ? undefined : arr))
            .optional(),

        experience: z
            .array(
                z.object({
                    company: z.string().trim().min(1),
                    title: z.string().trim().min(1),
                    description: z
                        .string()
                        .trim()
                        .transform((v) => (v === "" ? undefined : v))
                        .optional(),
                    isPresent: z.boolean().optional(),
                    startDate: z.object({
                        month: z.number().min(0).max(11),
                        year: z.number(),
                    }),
                    endDate: z
                        .object({
                            month: z.number().min(0).max(11),
                            year: z.number(),
                        })
                        .optional(),
                }),
            )
            .min(0)
            .transform((arr) => (arr.length === 0 ? undefined : arr))
            .optional(),

        education: z
            .array(
                z.object({
                    institute: z.string().trim().min(1),
                    course: z.string().trim().min(1),
                    startDate: z.object({
                        month: z.number().min(0).max(11),
                        year: z.number(),
                    }),
                    endDate: z.object({
                        month: z.number().min(0).max(11),
                        year: z.number(),
                    }),
                    description: z
                        .string()
                        .trim()
                        .transform((v) => (v === "" ? undefined : v))
                        .optional(),
                }),
            )
            .min(0)
            .transform((arr) => (arr.length === 0 ? undefined : arr))
            .optional(),

        social: z
            .array(
                z.object({
                    platform: z.string().trim().min(1),
                    url: z.string().url(),
                }),
            )
            .min(0)
            .transform((arr) => (arr.length === 0 ? undefined : arr))
            .optional(),
    })
    .strip();
