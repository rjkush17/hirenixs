"use client";
import { useAppDispatch } from "@/hooks/useRedux";
import { useRouter } from "next/navigation";
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
import { setStep } from "@/store/slices/onboardinhStepChecker";

function Inputs() {
    const dispatch = useAppDispatch();
    const router = useRouter();

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
        dispatch(setStep(2));
        router.push("/onboarding/individual/education");
    };

    const handleSkip = () => {
        dispatch(setStep(2));
        router.push("/onboarding/individual/education");
    };

    return (
        <div className="mx-auto">
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
                    <div className="flex justify-between w-full gap-4">
                        <Button type="submit" className="flex-1">
                            Submit
                        </Button>
                        <Button type="button" className="flex-1" onClick={handleSkip}>
                            Skip
                        </Button>
                    </div>
                </FieldGroup>
            </form>
        </div>
    );
}

export default Inputs;
