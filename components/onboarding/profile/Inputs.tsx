"use client";
import { useAppSelector, useAppDispatch } from "@/hooks/useRedux";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Field,
    FieldGroup,
    FieldLabel,
    FieldError,
    FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { ProfileSchema, ProfileSchemaType } from "@/lib/zod/onboardingSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateState } from "@/store/slices/onboardingSlice";

function Inputs() {
    const dispatch = useAppDispatch();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ProfileSchemaType>({
        resolver: zodResolver(ProfileSchema),
        defaultValues: {
            title: "",
            bio: "",
        },
    });

    const onsubmit = (value: ProfileSchemaType) => {
        dispatch(updateState(value));
        
    };

    return (
        <div className="w-6/12 mx-auto">
            <form onSubmit={handleSubmit(onsubmit)}>
                <FieldGroup>
                    <FieldSet>
                        <Field>
                            <FieldLabel htmlFor="title">Profile Name</FieldLabel>
                            <Input
                                id="title"
                                type="text"
                                placeholder="Please Enter Your Profile Name"
                                required
                                {...register("title", {
                                    required: "Title name should required",
                                })}
                            />
                            <FieldError>{errors.title?.message}</FieldError>
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="bio">Profile Description</FieldLabel>
                            <Textarea
                                id="bio"
                                placeholder="Please Enter Your Description"
                                {...register("bio", {
                                    required: "description required should required",
                                })}
                            />
                            <FieldError>{errors.bio?.message}</FieldError>
                        </Field>
                    </FieldSet>
                    <Button type="submit">Submit</Button>
                </FieldGroup>
            </form>
        </div>
    );
}

export default Inputs;
