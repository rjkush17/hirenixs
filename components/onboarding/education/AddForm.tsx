"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
    FieldSet,
} from "@/components/ui/field";
import { useForm } from "react-hook-form";
import {
    EducationSchema,
    EducationSchemaType,
} from "@/lib/zod/onboardingSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { FUTURE_YEAR_LIMIT, MAX_YEAR, MIN_YEAR, month } from "@/lib/datetime";
import { useAppDispatch } from "@/hooks/useRedux";
import { addEducation } from "@/store/slices/onboardingSlice";
import { useRouter } from "next/navigation";

const Page = () => {
    const dispatch = useAppDispatch();
    const router = useRouter();

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
        reset,
    } = useForm<EducationSchemaType>({
        resolver: zodResolver(EducationSchema),
        defaultValues: {
            institute: "",
            course: "",
            description: undefined,
            startDate: {
                month: undefined,
                year: undefined,
            },
            endDate: {
                month: undefined,
                year: undefined,
            },
        },
    });

    const onSubmit = (value: EducationSchemaType) => {
        dispatch(addEducation(value));
        reset();
    };
    return (
        <>
            <main className="w-full mx-auto mt-4">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <FieldSet>
                        <FieldGroup className="gap-4">
                            {/* INSTITUTE NAME */}
                            <Field>
                                <FieldLabel htmlFor="institute">Institute Name</FieldLabel>
                                <Input
                                    id="institute"
                                    type="text"
                                    placeholder="Enter your College / School / Institute name"
                                    {...register("institute", {
                                        required: "Instutue name is required",
                                    })}
                                />
                                <FieldError>{errors.institute?.message}</FieldError>
                            </Field>

                            {/* COURSE NAME */}
                            <Field>
                                <FieldLabel htmlFor="course">Course Name</FieldLabel>
                                <Input
                                    id="course"
                                    type="text"
                                    placeholder="Enter your course name"
                                    {...register("course")}
                                />
                                <FieldError>{errors.course?.message}</FieldError>
                            </Field>

                            {/* DATE FIELDS */}
                            <div className="grid grid-cols-4 gap-4">
                                {/* START MONTH */}
                                <Field>
                                    <FieldLabel>Start Month</FieldLabel>
                                    <Select
                                        onValueChange={(value) =>
                                            setValue("startDate.month", Number(value))
                                        }
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Month" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {Array.from({ length: 12 }).map((_, i) => {
                                                const m = i.toString();
                                                return (
                                                    <SelectItem value={m} key={m}>
                                                        {month[i]}
                                                    </SelectItem>
                                                );
                                            })}
                                        </SelectContent>
                                    </Select>
                                    <FieldError>{errors.startDate?.month?.message}</FieldError>
                                </Field>

                                {/* START YEAR */}
                                <Field>
                                    <FieldLabel>Start Year</FieldLabel>
                                    <Select
                                        onValueChange={(value) =>
                                            setValue("startDate.year", Number(value))
                                        }
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="YYYY" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {Array.from(
                                                { length: MAX_YEAR - MIN_YEAR + 1 },
                                                (_, i) => {
                                                    const year = MAX_YEAR - i;
                                                    return (
                                                        <SelectItem key={year} value={String(year)}>
                                                            {year}
                                                        </SelectItem>
                                                    );
                                                },
                                            )}
                                        </SelectContent>
                                    </Select>
                                    <FieldError>{errors.startDate?.month?.message}</FieldError>
                                </Field>

                                {/* END MONTH */}
                                <Field>
                                    <FieldLabel>End Month</FieldLabel>
                                    <Select
                                        onValueChange={(v) => setValue("endDate.month", Number(v))}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Month" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {Array.from({ length: 12 }).map((_, i) => {
                                                const m = i.toString();
                                                return (
                                                    <SelectItem value={m} key={m}>
                                                        {month[i]}
                                                    </SelectItem>
                                                );
                                            })}
                                        </SelectContent>
                                    </Select>
                                    <FieldError>{errors.endDate?.month?.message}</FieldError>
                                </Field>

                                {/* END YEAR */}
                                <Field>
                                    <FieldLabel>End Year</FieldLabel>
                                    <Select
                                        onValueChange={(v) => setValue("endDate.year", Number(v))}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="YYYY" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {Array.from(
                                                { length: FUTURE_YEAR_LIMIT - MIN_YEAR + 1 },
                                                (_, i) => {
                                                    const year = FUTURE_YEAR_LIMIT - i;

                                                    return (
                                                        <SelectItem key={year} value={String(year)}>
                                                            {year}
                                                        </SelectItem>
                                                    );
                                                },
                                            )}
                                        </SelectContent>
                                    </Select>
                                    <FieldError>{errors?.endDate?.year?.message}</FieldError>
                                </Field>
                            </div>

                            {/* DESCRIPTION */}
                            <Field>
                                <FieldLabel>Description (Optional)</FieldLabel>
                                <Textarea
                                    id="description"
                                    placeholder="Write a short description about this course"
                                    {...register("description")}
                                    rows={3}
                                />
                                <FieldError>{errors?.description?.message}</FieldError>
                            </Field>

                            <div className="flex w-full mx-auto gap-2 justify-evenly mt-4">
                                <Button className="flex-1" type="submit">
                                    Add Education
                                </Button>
                                <Button
                                    className="flex-1"
                                    type="button"
                                    onClick={() => router.push("/onboarding/skills")}
                                >
                                   Next Step / Skip
                                </Button>
                            </div>
                        </FieldGroup>
                    </FieldSet>
                </form>
            </main>
        </>
    );
};
export default Page;
