"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn, useSession } from "next-auth/react";
import { useState } from "react";
import usePOST from "@/hooks/usePOST";
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
import { Input } from "@/components/ui/input";
import {
    registerSchema,
    registerFormSchema,
    OTPSchema,
    OTPSchemaType,
} from "@/lib/zod/authSchema";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const Register = () => {
    const router = useRouter();
    const { data: session } = useSession();

    if (session?.user) router.push("/");
    const form = useForm<registerFormSchema>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            email: "",
            password: "",
            username: "",
            role: "individual",
            confirmPassword: "",
            name: "",
        },
    });

    const otpForm = useForm<OTPSchemaType>({
        resolver: zodResolver(OTPSchema),
        defaultValues: {
            pin: "",
        },
    });

    const { isLoading, apiCall } = usePOST();
    const [showOTPForm, setShowOTPForm] = useState<boolean>(false);
    const [OTPEmail, setOTPEmail] = useState<string | null>(null);

    const onSubmit = async (value: registerFormSchema) => {
        toast.promise(apiCall("/api/registration/", value), {
            loading: "Registering usere...",
            success: (res: any) => {
                setOTPEmail(value.email);
                setShowOTPForm(true);
                return res;
            },
            error: (err: any) => err.message || "Registration failed!",
        });
    };

    const onOTPSubmit = async (value: OTPSchemaType) => {

    };

    return (
        <div className="w-screen h-full flex justify-center items-center">
            <Card className="w-[500px] mx-auto mt-10">
                <CardHeader>
                    <CardTitle>Create Your Account</CardTitle>
                    <CardDescription>
                        Join us today and start your journey. Fill in the details below to
                        register as a user or company.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {!showOTPForm && (
                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className="space-y-4"
                            >
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Full name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Your Full Name" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="username"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Username</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Username or Email" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Email ID" {...field} />
                                            </FormControl>
                                            <FormMessage />
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
                                                <Input
                                                    type="password"
                                                    placeholder="Enter Password"
                                                    {...field}
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
                                            <FormLabel>Confirm Password</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="password"
                                                    placeholder="Re-enter Password"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="role"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Choose Your Profile Type</FormLabel>
                                            <Select onValueChange={field.onChange}>
                                                <FormControl>
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder="Select a role" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="individual">
                                                        Individual (Looking for Jobs)
                                                    </SelectItem>
                                                    <SelectItem value="organization">
                                                        Organization (Looking for Job Seekers)
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />{" "}
                                {isLoading ? (
                                    <Button className="w-full" disabled>
                                        <Spinner />
                                        Creating Account...
                                    </Button>
                                ) : (
                                    <Button className="w-full">Create Account</Button>
                                )}
                            </form>
                            <Link href="/auth/login" className="text-xs underline">
                                Alreadty have an Account ? Login Here
                            </Link>
                        </Form>
                    )}

                    {showOTPForm && (
                        <Form {...otpForm}>
                            <form
                                onSubmit={otpForm.handleSubmit(onOTPSubmit)}
                                className="w-2/3 space-y-6"
                            >
                                <FormField
                                    control={otpForm.control}
                                    name="pin"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>One-Time Password</FormLabel>
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
                                            <FormDescription>
                                                Please enter the one-time password sent to your phone.
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <Button type="submit">Submit</Button>
                            </form>
                        </Form>
                    )}

                    <div className="flex items-center my-4">
                        <div className="flex-grow h-px bg-muted" /> {/* left line */}
                        <span className="mx-2 text-sm text-muted-foreground">OR</span>{" "}
                        {/* OR text */}
                        <div className="flex-grow h-px bg-muted" /> {/* right line */}
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

export default Register;
