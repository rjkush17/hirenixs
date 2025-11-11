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

function Page() {
    const { isLoading, apiCall } = usePOST();
    const searchParams = useSearchParams();

    const token = searchParams.get("token");
    const email = searchParams.get("mail");

    const [showSuccessScreen, setShowSucessScreen] = useState<boolean>(false);

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
        const payload = {
            ...data,
            email,
            token,
        };

        toast.promise(apiCall("/api/auth/resetpassword", payload), {
            loading: "Generatings reset Link",
            success: (res: string) => {
                setShowSucessScreen(true);
                return res;
            },
            error: (err: Error) => err.message || "Fail to Create new password",
        });
    };

    return (
        <div className="flex justify-center items-center min-h-screen">
            {!showSuccessScreen && (
                <Card className="w-full max-w-sm">
                    <CardHeader>
                        <CardTitle>Forgot Password</CardTitle>
                        <CardDescription>
                            Enter your email or username to receive a reset link.
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
                                                <Input
                                                    placeholder="Enter New Password"
                                                    {...field}
                                                    type="password"
                                                />
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
                                            <FormLabel>Retype New Password</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Re-type Password"
                                                    {...field}
                                                    type="password"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                {!isLoading ? (
                                    <Button type="submit" className="w-full">
                                        Update Password
                                    </Button>
                                ) : (
                                    <Button className="w-full" disabled>
                                        Updating Password
                                    </Button>
                                )}
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            )}
            {showSuccessScreen && (
                <Card className="max-w-md mx-auto mt-10 border border-green-500">
                    {/* Header */}
                    <CardHeader className="flex flex-col items-center">
                        <CheckCircle className="w-12 h-12 text-green-500 mb-2" />{" "}
                        {/* Success Icon */}
                        <CardTitle className="text-lg font-semibold text-center">
                            Password Reset Successful
                        </CardTitle>
                        <CardDescription className="text-center text-sm text-gray-600">
                            Your password has been updated successfully. You can now log in
                            with your new password.
                        </CardDescription>
                    </CardHeader>

                    {/* Content */}
                    <CardContent className="text-center">
                        <p className="text-sm text-gray-500">
                            Keep your password secure and do not share it with anyone.
                        </p>
                    </CardContent>

                    {/* Footer */}
                    <CardFooter className="flex justify-center">
                        <Link href="/auth/login">
                            <Button className="bg-green-600 hover:bg-green-700 text-white">
                                Go to Login
                            </Button>
                        </Link>
                    </CardFooter>
                </Card>
            )}
        </div>
    );
}

export default Page;
