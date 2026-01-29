"use client";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
    FieldSet,
} from "@/components/ui/field";

import { useForm, Controller, SubmitHandler } from "react-hook-form";
import {
    ExperienceSchema,
    ExperienceSchemaType,
} from "@/lib/zod/onboardingSchema";
import { zodResolver } from "@hookform/resolvers/zod";

import { MAX_YEAR, MIN_YEAR, month } from "@/lib/datetime";
import { useAppDispatch } from "@/hooks/useRedux";
import { addExperience } from "@/store/slices/onboardingSlice";
import { Button } from "@/components/ui/button";

const ExperiencePage = () => {
    const dispatch = useAppDispatch();

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        control,
        formState: { errors },
        reset,
    } = useForm<ExperienceSchemaType>({
        resolver: zodResolver(ExperienceSchema),
        defaultValues: {
            company: "",
            title: "",
            description: "",
            isPresent: false,
            startDate: {
                month: 0,
                year: MIN_YEAR,
            },
            endDate: {
                month: undefined,
                year: undefined,
            },
        },
    });

    const isPresent = watch("isPresent");

    // When isPresent = true, clear endDate
    const handlePresentToggle = (checked: boolean) => {
        setValue("isPresent", checked);
        if (checked) setValue("endDate", undefined);
    };

    // -----------------
    // SUBMIT HANDLER
    // -----------------
    const onSubmit: SubmitHandler<ExperienceSchemaType> = (value) => {
        dispatch(addExperience(value));
        reset();
    };

    return (
        <main className="w-8/12 mx-auto mt-4">
            <form onSubmit={handleSubmit(onSubmit)}>
                <FieldSet>
                    <FieldGroup className="gap-4">
                        {/* Company */}
                        <Field>
                            <FieldLabel htmlFor="company">Company Name</FieldLabel>
                            <Input
                                id="company"
                                placeholder="Enter your company name"
                                {...register("company")}
                            />
                            <FieldError>{errors.company?.message}</FieldError>
                        </Field>

                        {/* Title */}
                        <Field>
                            <FieldLabel htmlFor="title">Title Name</FieldLabel>
                            <Input
                                id="title"
                                placeholder="Enter your job title"
                                {...register("title")}
                            />
                            <FieldError>{errors.title?.message}</FieldError>
                        </Field>

                        {/* CURRENTLY WORKING CHECKBOX */}
                        <FieldGroup>
                            <Field orientation="horizontal">
                                <Controller
                                    control={control}
                                    name="isPresent"
                                    render={({ field }) => (
                                        <Checkbox
                                            checked={field.value}
                                            onCheckedChange={(checked) =>
                                                handlePresentToggle(!!checked)
                                            }
                                        />
                                    )}
                                />

                                <FieldLabel className="font-normal">
                                    Currently working at this company
                                </FieldLabel>
                            </Field>
                        </FieldGroup>

                        {/* DATE GRID */}
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
                                        {Array.from({ length: 12 }).map((_, i) => (
                                            <SelectItem key={i} value={String(i)}>
                                                {month[i]}
                                            </SelectItem>
                                        ))}
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
                                        {Array.from({ length: MAX_YEAR - MIN_YEAR + 1 }, (_, i) => {
                                            const year = MAX_YEAR - i;
                                            return (
                                                <SelectItem key={year} value={String(year)}>
                                                    {year}
                                                </SelectItem>
                                            );
                                        })}
                                    </SelectContent>
                                </Select>
                                <FieldError>{errors.startDate?.year?.message}</FieldError>
                            </Field>

                            {/* END MONTH */}
                            {!isPresent && (
                                <Field>
                                    <FieldLabel>End Month</FieldLabel>
                                    <Select
                                        onValueChange={(v) => setValue("endDate.month", Number(v))}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Month" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {Array.from({ length: 12 }).map((_, i) => (
                                                <SelectItem key={i} value={String(i)}>
                                                    {month[i]}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FieldError>{errors.endDate?.month?.message}</FieldError>
                                </Field>
                            )}

                            {/* END YEAR */}
                            {!isPresent && (
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
                                    <FieldError>{errors.endDate?.year?.message}</FieldError>
                                </Field>
                            )}
                        </div>

                        {/* DESCRIPTION */}
                        <Field>
                            <FieldLabel>Description (Optional)</FieldLabel>
                            <Textarea
                                placeholder="Describe your role or experience"
                                rows={3}
                                {...register("description")}
                            />
                            <FieldError>{errors.description?.message}</FieldError>
                        </Field>

                        {/* SUBMIT */}
                        <Button type="submit">Add Education</Button>
                    </FieldGroup>
                </FieldSet>
            </form>
        </main>
    );
};

export default ExperiencePage;
