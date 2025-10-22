"use client";
import { useForm } from "react-hook-form";
import { loginSchema, LoginFormValues } from "@/lib/zod/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import {
    Card,
    CardHeader,
    CardContent,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { toast } from "sonner";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { Spinner } from "@/components/ui/spinner";

const Login = () => {
    const form = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            identifier: "",
            password: "",
        },
    });

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const onSubmit = async (values: LoginFormValues) => {
        toast.promise(
            (async () => {
                setIsLoading(true);
                try {
                    const result = await signIn("credentials", {
                        ...values,
                        redirect: false,
                    });

                    if (result?.error) throw new Error(result.error || "Login failed");

                    toast.success("Logged in successfully!");

                    // optional safe redirect
                    if (result?.ok) window.location.href = "/";
                } finally {
                    setIsLoading(false);
                }
            })(),
            {
                loading: "Logging in...",
                success: "Logged in!",
                error:"Invalid Credentials",
            },
        );
    };

    return (
        <div className=" w-screen h-full flex justify-center items-center">
            <Card className="w-[400px] mx-auto mt-10">
                <CardHeader>
                    <CardTitle className="text-center text-xl font-semibold">
                        Welcome Back 👋
                    </CardTitle>
                    <CardDescription>
                        Access your account to manage your profile, explore new updates, and
                        stay connected.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                                        <Link href="/auth/register" className="text-xs underline">
                                            Don't have Account ? Register Now
                                        </Link>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter Passsword" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                        <Link
                                            href="/auth/forgot-password"
                                            className="text-xs underline"
                                        >
                                            Forgot Password ?
                                        </Link>
                                    </FormItem>
                                )}
                            />
                            {!isLoading ? (
                                <Button className="w-full">Login</Button>
                            ) : (
                                <Button className="w-full" disabled>
                                    <Spinner /> Logging...
                                </Button>
                            )}
                        </form>
                    </Form>
                    <div className="flex items-center my-4">
                        <div className="flex-grow h-px bg-muted" /> {/* left line */}
                        <span className="mx-2 text-sm text-muted-foreground">OR</span>{" "}
                        {/* OR text */}
                        <div className="flex-grow h-px bg-muted" /> {/* right line */}
                    </div>
                    <Button variant="outline" className="w-full mb-2">
                        {" "}
                        <FaGoogle /> Login with Google
                    </Button>
                    <Button variant="outline" className="w-full">
                        {" "}
                        <FaGithub /> Login with Github
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
};

export default Login;
