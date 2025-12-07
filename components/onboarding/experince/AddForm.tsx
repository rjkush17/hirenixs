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
    ExperienceSchema,
    ExperienceSchemaType,
} from "@/lib/zod/onboardingSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { FUTURE_YEAR_LIMIT, MAX_YEAR, MIN_YEAR, month } from "@/lib/datetime";
import { useAppDispatch } from "@/hooks/useRedux";
import { addExperience } from "@/store/slices/onboardingSlice";

const page = () => {
    const dispatch = useAppDispatch();

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
        reset,
    } = useForm<ExperienceSchemaType>({
        resolver: zodResolver(ExperienceSchema),
        defaultValues: {
            company: "",
            title: "",
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

    const onSubmit = (value: ExperienceSchemaType) => {
        dispatch(addExperience(value))
        reset();
    };
    return (
        <>
            <main className="w-8/12 mx-auto mt-4">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <FieldSet>
                        <FieldGroup className="gap-4">
                            <Field>
                                <FieldLabel htmlFor="institute">Company Name</FieldLabel>
                                <Input
                                    id="company"
                                    type="text"
                                    placeholder="Enter your College / School / Institute name"
                                    {...register("company", {
                                        required: "company name is required",
                                    })}
                                />
                                <FieldError>{errors.company?.message}</FieldError>
                            </Field>

                            <Field>
                                <FieldLabel htmlFor="course">Title Name</FieldLabel>
                                <Input
                                    id="title"
                                    type="text"
                                    placeholder="Enter your course name"
                                    {...register("title")}
                                />
                                <FieldError>{errors.title?.message}</FieldError>
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

                            {/* SUBMIT BUTTON */}
                            <Button type="submit">Submit</Button>
                        </FieldGroup>
                    </FieldSet>
                </form>
            </main>
        </>
    );
};
export default page;
