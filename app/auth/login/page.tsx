"use client";
import { useForm } from "react-hook-form";
import { loginSchema, LoginFormValues } from "@/lib/zod/Schema";
import { zodResolver } from "@hookform/resolvers/zod";
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

const Login = () => {
    const form = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            identifier: "",
            password: "",
        },
    });

    function onSubmit(value: LoginFormValues) {
        console.log(value);
    }
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
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                                    </FormItem>
                                )}
                            />
                            <Button type="submit">Submit</Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
};

export default Login;
