"use client";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
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
import { forgotPasswordSchema, forgotPasswordType } from "@/lib/zod/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import usePOST from "@/hooks/usePOST";
import { useState } from "react";
import { CheckCircle } from "lucide-react";
import maskEmail from "@/utils/maskEmail";
import maskUsername from "@/utils/maskUsername";

function Page() {
    const { isLoading, apiCall } = usePOST();

    const [showSuccessScreen, setShowSucessScreen] = useState<boolean>(false);
    const [identifier, setIdentifer] = useState<string>("");

    const form = useForm<forgotPasswordType>({
        resolver: zodResolver(forgotPasswordSchema),
        defaultValues: {
            identifier: "",
        },
    });

    const onSubmit = (data: forgotPasswordType) => {
        toast.promise(apiCall("/api/auth/forgotpassword", data), {
            loading: "Generatings reset Link",
            success: (res) => {
                setShowSucessScreen(true);
                setIdentifer(data.identifier);
                return res;
            },
            error: (err: Error) => err.message || "Fail to Generate forgot Link|",
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
                                    name="identifier"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Username or Email</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Username or Email" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                {!isLoading ? (
                                    <Button type="submit" className="w-full">
                                        Send Reset Link
                                    </Button>
                                ) : (
                                    <Button className="w-full" disabled>
                                        Sending Reset Link
                                    </Button>
                                )}
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            )}
            {showSuccessScreen && (
                <Card className="max-w-md mx-auto mt-10 border-green-500">
                    <CardHeader className="flex flex-col items-center">
                        <CheckCircle className="w-12 h-12 text-green-500 mb-2" />
                        <CardTitle className="text-lg font-semibold text-center">
                            Success!
                        </CardTitle>
                        <CardDescription className="text-center text-sm text-gray-600">
                            {identifier.includes("@")
                                ? `A password reset link has been sent to ${maskEmail(identifier)}.`
                                : `If an account exists to ${maskUsername(identifier)}, a reset link has been sent Mail Address`}
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="text-center">
                        <p className="text-sm text-gray-500">
                            If you don’t see the email, check your spam folder or try
                            resending the link.
                        </p>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}

export default Page;
