import * as z from "zod";

export const loginSchema = z.object({
    identifier: z.string().min(4,"username is Reuired"),
    password: z.string().min(6,"Password must be at least 6 characters"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
