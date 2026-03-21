"use client";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useForm, Controller } from "react-hook-form";
import {
    OrganizationSchema,
    OrganizationSchemaType,
} from "@/lib/zod/onboardingSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import ProfileImage from "@/components/onboarding/profileImage/ProfileImage";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import usePOST from "@/hooks/usePOST";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";

function Page() {
    const { data: session, update } = useSession();
    const router = useRouter();
    const { apiCall, isLoading } = usePOST();

    const EMPLOYEE_RANGES = [
        "0-10",
        "11-50",
        "51-100",
        "101-500",
        "501-2000",
        "2000+",
    ] as const;

    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm<OrganizationSchemaType>({
        resolver: zodResolver(OrganizationSchema),
        defaultValues: {
            name: "",
            description: "",
            location: {
                state: "",
                city: "",
            },
            industry_type: "",
            website: "",
            employee: undefined,
        },
    });

    const onSubmit = (value: OrganizationSchemaType): void => {
        const payload = {
            email: session?.user?.email,
            data: value,
        };
        console.log("value of onSubmit", payload);
        toast.promise(apiCall("/api/onboarding/organization", payload), {
            loading: "Sending Data",
            success: (res) => {
                reset();
                update({});
                router.push("/");
                return res;
            },
            error: (err) => err?.message,
        });

        // reset();
    };

    return (
        <main className="max-w-8/12 mx-auto mt-4">
            <Card className="bg-background border-none">
                <CardHeader className="text-center">
                    <CardTitle>Tell Us About Your Organization </CardTitle>
                    <CardDescription>
                        Share a few essential details about your organization—industry,
                        location, and website—to help us create your company profile and set
                        up your workspace properly.
                    </CardDescription>
                </CardHeader>
                <ProfileImage />
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <FieldGroup>
                            <Field>
                                <FieldLabel htmlFor="name">Organization Name</FieldLabel>
                                <Input
                                    placeholder="Enter your organization name"
                                    id="name"
                                    type="text"
                                    {...register("name", { required: "This Field is Required" })}
                                />
                                <FieldError>{errors?.name?.message}</FieldError>
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="description">Description</FieldLabel>
                                <Textarea
                                    id="description"
                                    placeholder="Description and details about your organization"
                                    {...register("description", {
                                        required: "This Field is Required",
                                    })}
                                />
                                <FieldError>{errors?.description?.message}</FieldError>
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="industry_type">
                                    Organization type
                                </FieldLabel>
                                <Input
                                    id="industry_type"
                                    type="text"
                                    placeholder="Please Enter Organization"
                                    {...register("industry_type", {
                                        required: "This Field is Required",
                                    })}
                                />
                                <FieldError>{errors?.industry_type?.message}</FieldError>
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="website">Website Link</FieldLabel>
                                <Input
                                    id="website"
                                    type="text"
                                    placeholder="Please Enter Website Link"
                                    {...register("website")}
                                />
                                <FieldError>{errors?.website?.message}</FieldError>
                            </Field>

                            <Controller
                                control={control}
                                name="employee"
                                render={({ field, fieldState }) => (
                                    <Field>
                                        <FieldLabel>
                                            How many people work in your organization?
                                        </FieldLabel>

                                        <Select value={field.value} onValueChange={field.onChange}>
                                            <SelectTrigger className="w-full max-w-48">
                                                <SelectValue placeholder="Select a range" />
                                            </SelectTrigger>

                                            <SelectContent>
                                                <SelectGroup>
                                                    {EMPLOYEE_RANGES.map((range) => (
                                                        <SelectItem key={range} value={range}>
                                                            {range}
                                                        </SelectItem>
                                                    ))}
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>

                                        <FieldError>{fieldState.error?.message}</FieldError>
                                    </Field>
                                )}
                            />

                            <div className="grid grid-cols-2 gap-3">
                                <Field>
                                    <FieldLabel htmlFor="location.city">City</FieldLabel>
                                    <Input
                                        id="location.city"
                                        placeholder="city"
                                        type="text"
                                        {...register("location.city", {
                                            required: "This Field is Required",
                                        })}
                                    />
                                    <FieldError>{errors.location?.city?.message}</FieldError>
                                </Field>
                                <Field>
                                    <FieldLabel htmlFor="location.state">State</FieldLabel>
                                    <Input
                                        id="location.state"
                                        placeholder="State"
                                        type="text"
                                        {...register("location.state", {
                                            required: "This Field is Required",
                                        })}
                                    />
                                    <FieldError>{errors.location?.state?.message}</FieldError>
                                </Field>
                            </div>
                            {isLoading ? (
                                <Button type="button" className="w-96 mx-auto" disabled>
                                    <Spinner /> Submitting{" "}
                                </Button>
                            ) : (
                                <Button type="submit" className="w-96 mx-auto">
                                    Submit
                                </Button>
                            )}
                        </FieldGroup>
                    </form>
                </CardContent>
            </Card>
        </main>
    );
}

export default Page;
