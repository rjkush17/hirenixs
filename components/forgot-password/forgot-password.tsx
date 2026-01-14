"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { resetPasswordSchema, resetPasswordType } from "@/lib/zod/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import usePOST from "@/hooks/usePOST";
import { useState } from "react";
import { CheckCircle } from "lucide-react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function ResetPasswordClient() {
  const { isLoading, apiCall } = usePOST();
  const searchParams = useSearchParams();

  const token = searchParams.get("token");
  const email = searchParams.get("mail");

  const [showSuccessScreen, setShowSucessScreen] = useState(false);

  const form = useForm<resetPasswordType>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data: resetPasswordType) => {
    if (!email || !token) {
      toast.error("Token And Email Not Found In URL");
      return;
    }

    toast.promise(
      apiCall("/api/auth/resetpassword", { ...data, email, token }),
      {
        loading: "Updating password...",
        success: (res: string) => {
          setShowSucessScreen(true);
          return res;
        },
        error: (err: Error) =>
          err.message || "Failed to update password",
      }
    );
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      {!showSuccessScreen ? (
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle>Reset Password</CardTitle>
            <CardDescription>
              Enter your new password below.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>New Password</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button className="w-full" disabled={isLoading}>
                  {isLoading ? "Updating..." : "Update Password"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      ) : (
        <Card className="max-w-md border border-green-500">
          <CardHeader className="items-center">
            <CheckCircle className="w-12 h-12 text-green-500" />
            <CardTitle>Password Reset Successful</CardTitle>
            <CardDescription className="text-center">
              You can now log in with your new password.
            </CardDescription>
          </CardHeader>
          <CardFooter className="justify-center">
            <Link href="/auth/login">
              <Button>Go to Login</Button>
            </Link>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
