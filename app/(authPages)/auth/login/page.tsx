"use client";
import { useForm } from "react-hook-form";
import {
    loginSchema,
    LoginFormValues,
    OTPLoginType,
    OTPLoginSchema,
    OTPSchema,
    OTPSchemaType,
} from "@/lib/zod/authSchema";
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
    FormDescription,
} from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { toast } from "sonner";
import { signIn } from "next-auth/react";
import { useState, useEffect } from "react";
import { Spinner } from "@/components/ui/spinner";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import usePost from "@/hooks/usePOST";
import maskEmail from "@/utils/maskEmail";
import maskUsername from "@/utils/maskUsername";

import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp";

const Login = () => {
    const router = useRouter();
    const { data: session } = useSession();
    const { apiCall, isLoading } = usePost();

    useEffect(() => {
        if (session) {
            router.push("/");
        }
    }, [session, router]);

    const form = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            identifier: "",
            password: "",
        },
    });

    const otpForm = useForm<OTPLoginType>({
        resolver: zodResolver(OTPLoginSchema),
        defaultValues: {
            identifier: "",
        },
    });

    const otpSubmitForm = useForm<OTPSchemaType>({
        resolver: zodResolver(OTPSchema),
        defaultValues: {
            pin: "",
        },
    });

    const [loading, setLoading] = useState<boolean>(false);
    const [otpSucessScreen, setOTPSucessScreen] = useState<boolean>(false);
    const [OTPEmail, setOTPEmail] = useState<string | null>(null);
    const [resendTimer, setResendTimer] = useState<number>(0);

    let interval: ReturnType<typeof setInterval>;
    const startResendTimer = (duration: number = 30) => {
        if (interval) clearInterval(interval);
        setResendTimer(duration);

        interval = setInterval(() => {
            setResendTimer((prev: number) => {
                if (prev <= 1) {
                    clearInterval(interval);
                    return 0;
                } else {
                    return prev - 1;
                }
            });
        }, 1000);
    };
    useEffect(() => {
        return () => clearInterval(interval);
    });

    const onSubmit = async (values: LoginFormValues) => {
        toast.promise(
            (async () => {
                setLoading(true);
                try {
                    const result = await signIn("credentials", {
                        ...values,
                        redirect: false,
                    });

                    if (result?.error) {
                        throw new Error(result.error || "Login failed");
                    }

                    toast.success("Logged in successfully!");
                } finally {
                    setLoading(false);
                }
            })(),
            {
                loading: "Logging in...",
                success: "Logged in!",
                error: "Invalid Credentials",
            },
        );
    };

    const onOTPSent = (value: OTPLoginType) => {
        setOTPEmail(value.identifier);
        toast.promise(apiCall("/api/auth/otplogin", value), {
            loading: "Requestin OTP",
            success: (res: string) => {
                setOTPSucessScreen(true);
                startResendTimer(60);
                return res;
            },
            error: (err: Error) => err.message || "OTP Request Failed",
        });
    };

    const onOTPSubmit = (value: OTPSchemaType) => {
        const payload = {
            ...value,
            identifier: OTPEmail,
        };
        toast.promise(
            (async () => {
                setLoading(true);
                try {
                    const result = await signIn("otp", {
                        ...payload,
                        redirect: false,
                    });

                    if (result?.error) {
                        throw new Error(result.error || "Login failed");
                    }

                    toast.success("Logged in successfully!");
                } finally {
                    setLoading(false);
                }
            })(),
            {
                loading: "Logging in...",
                success: "Logged in!",
                error: "Invalid OTP or Expired",
            },
        );
    };

    const resentOTP = () => {
        if (!OTPEmail)
            return toast.error(
                "Unable to Find Email or Username Please Refresh the Page and Login Again",
            );
        toast.promise(apiCall("/api/auth/otplogin", { identifier: OTPEmail }), {
            loading: "Requestin OTP",
            success: (res: string) => {
                setOTPSucessScreen(true);
                startResendTimer(60);
                return res;
            },
            error: (err: Error) => err.message || "OTP Request Failed",
        });
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
                    <Tabs defaultValue="credentials" className="w-full">
                        <h2 className="w-full text-center text-m">Login Method</h2>
                        <TabsList className="w-full">
                            <TabsTrigger value="credentials">Credntials</TabsTrigger>
                            <TabsTrigger value="otp">OTP</TabsTrigger>
                        </TabsList>
                        <br />
                        <TabsContent value="credentials">
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
                                                <Link
                                                    href="/auth/register"
                                                    className="text-xs underline"
                                                >
                                                    Don&#39;t have Account ? Register Now
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
                                    {!loading ? (
                                        <Button className="w-full">Login</Button>
                                    ) : (
                                        <Button className="w-full" disabled>
                                            <Spinner /> Logging...
                                        </Button>
                                    )}
                                </form>
                            </Form>
                        </TabsContent>
                        <TabsContent value="otp">
                            {!otpSucessScreen && (
                                <Form {...otpForm}>
                                    <form
                                        onSubmit={otpForm.handleSubmit(onOTPSent)}
                                        className="space-y-4"
                                    >
                                        <FormField
                                            control={otpForm.control}
                                            name="identifier"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Username or Email</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Username or Email" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                    <Link
                                                        href="/auth/register"
                                                        className="text-xs underline"
                                                    >
                                                        Don&apos;t have Account ? Register Now
                                                    </Link>
                                                </FormItem>
                                            )}
                                        />
                                        {!isLoading ? (
                                            <Button className="w-full">Sent OTP</Button>
                                        ) : (
                                            <Button className="w-full" disabled>
                                                <Spinner /> Sending OTP
                                            </Button>
                                        )}
                                    </form>
                                </Form>
                            )}

                            {otpSucessScreen && (
                                <>
                                    {" "}
                                    <Form {...otpSubmitForm}>
                                        <form
                                            onSubmit={otpSubmitForm.handleSubmit(onOTPSubmit)}
                                            className="w-full space-y-6"
                                        >
                                            <FormField
                                                control={otpSubmitForm.control}
                                                name="pin"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel className="justify-center">
                                                            One-Time Password
                                                        </FormLabel>
                                                        <FormControl>
                                                            <InputOTP maxLength={6} {...field}>
                                                                <InputOTPGroup>
                                                                    <InputOTPSlot index={0} />
                                                                    <InputOTPSlot index={1} />
                                                                    <InputOTPSlot index={2} />
                                                                    <InputOTPSlot index={3} />
                                                                    <InputOTPSlot index={4} />
                                                                    <InputOTPSlot index={5} />
                                                                </InputOTPGroup>
                                                            </InputOTP>
                                                        </FormControl>
                                                        <FormMessage className="text-center" />
                                                        <FormDescription className="text-center">
                                                            {OTPEmail && OTPEmail.includes("@") ? (
                                                                <>
                                                                    Please enter the one-time password sent to{" "}
                                                                    <b>{OTPEmail && maskEmail(OTPEmail)}</b>
                                                                </>
                                                            ) : (
                                                                <>
                                                                    Please enter the one-time password sent to{" "}
                                                                    <b>{OTPEmail && maskUsername(OTPEmail)}</b>
                                                                </>
                                                            )}
                                                        </FormDescription>
                                                    </FormItem>
                                                )}
                                            />

                                            <Button type="submit" className="w-full">
                                                Submit
                                            </Button>
                                        </form>
                                    </Form>
                                    {resendTimer > 0 ? (
                                        <Button className="w-full mt-4" disabled>
                                            {" "}
                                            {`Resend OTP in ${resendTimer}s`}
                                        </Button>
                                    ) : (
                                        <Button className="w-full mt-4" onClick={resentOTP}>
                                            {" "}
                                            Resend OTP
                                        </Button>
                                    )}
                                </>
                            )}
                        </TabsContent>
                    </Tabs>
                    <div className="flex items-center my-4">
                        <div className="flex-grow h-px bg-muted" />
                        <span className="mx-2 text-sm text-muted-foreground">OR</span>{" "}
                        {/* OR text */}
                        <div className="flex-grow h-px bg-muted" />
                    </div>
                    <Button
                        variant="outline"
                        className="w-full mb-2"
                        onClick={() => signIn("google")}
                    >
                        {" "}
                        <FaGoogle /> Login with Google
                    </Button>
                    <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => signIn("github")}
                    >
                        {" "}
                        <FaGithub /> Login with Github
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
};

export default Login;
