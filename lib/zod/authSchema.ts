import * as z from "zod";

export const loginSchema = z.object({
  identifier: z.string().min(4, "username is Required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});
export type LoginFormValues = z.infer<typeof loginSchema>;

export const registerSchema = z.object({
  email: z.string().min(4, "Email is required").email("Invalid email format"),

  password: z
    .string()
    .min(6, "Password must contain at least 6 characters")
    .max(20, "Password must not exceed 20 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),

  name: z.string().min(4, "Name is required").max(30, "Name is too long"),

  role: z.enum(["user", "company"],"Role must be either 'user' or 'company'"),

  username: z
    .string()
    .min(3, "Username must be at least 3 characters long")
    .max(15, "Username must not exceed 15 characters")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Username can only contain letters, numbers, and underscores",
    ),
});
export type registerFormSchema = z.infer<typeof registerSchema>;
