import * as z from "zod";

export const loginSchema = z.object({
  identifier: z.string().min(4, "username is Required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});
export type LoginFormValues = z.infer<typeof loginSchema>;

export const registerSchema = z
  .object({
    email: z.string().min(4, "Email is required").email("Invalid email format"),

    password: z
      .string()
      .min(6, "Password must contain at least 6 characters")
      .max(20, "Password must not exceed 20 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[0-9]/, "Password must contain at least one number"),

    confirmPassword: z.string().min(6, "Confirm your password"),

    name: z.string().min(4, "Name is required").max(30, "Name is too long"),

    role: z.enum(
      ["individual", "organization"],
      "Role must be either 'Individual' or 'Organization'",
    ),

    username: z
      .string()
      .min(3, "Username must be at least 3 characters long")
      .max(15, "Username must not exceed 15 characters")
      .regex(
        /^[a-zA-Z0-9_]+$/,
        "Username can only contain letters, numbers, and underscores",
      ),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
export type registerFormSchema = z.infer<typeof registerSchema>;

export const OTPSchema = z.object({
  pin: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});
export type OTPSchemaType = z.infer<typeof OTPSchema>;

export const forgotPasswordSchema = z.object({
  identifier: z
    .string({ message: "Email or user ID required" })
    .min(1, "Email or user ID required")
    .trim(),
});

export type forgotPasswordType = z.infer<typeof forgotPasswordSchema>;

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(6, "Password must contain at least 6 characters")
      .max(20, "Password must not exceed 20 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[0-9]/, "Password must contain at least one number"),

    confirmPassword: z.string().min(6, "Confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
export type resetPasswordType = z.infer<typeof resetPasswordSchema>;
