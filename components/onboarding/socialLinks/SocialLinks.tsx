"use client";
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
    FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { SocialLinks, SocialLinksType } from "@/lib/zod/onboardingSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import {
    removeSocialLinks,
    addSocialLinks,
    OnboardingType,
} from "@/store/slices/onboardingSlice";
import { Trash } from "lucide-react";
import { FieldDescription } from "@/components/ui/field";
import usePOST from "@/hooks/usePOST";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

function SocialLink() {
    const dispatch = useAppDispatch();
    const socialLinksData = useAppSelector((state) => state.onboarding.social);
    const finalData: OnboardingType = useAppSelector((state) => state.onboarding);
    const { apiCall, isLoading } = usePOST();
    const router = useRouter();

    const { data: session, update } = useSession();
    console.log("session token in last pages", session);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<SocialLinksType>({
        resolver: zodResolver(SocialLinks),
        defaultValues: {
            platform: "",
            url: "",
        },
    });

    const onSubmit = (value: SocialLinksType) => {
        dispatch(addSocialLinks(value));
        reset();
    };

    const handleDelete = (value: number) => {
        dispatch(removeSocialLinks(value));
    };

    const handleFinalSubmit = async (value: OnboardingType) => {
        const payload = {
            email: session?.user?.email,
            data: value,
        };
        console.log(payload);
        toast.promise(apiCall("/api/onboarding/individual/", payload), {
            loading: "Sending data to server..",
            success: (res) => {
                router.push("/");
                update({})
                return res;
            },
            error: (err) => err?.message,
        });
    };
    return (
        <>
            <div className="w-6/12 mx-auto text-center">
                <h1 className="text-3xl">Add Your Social Links</h1>
                <FieldDescription className="my-4 text-lg">
                    Help recruiters and collaborators know you better by sharing your
                    professional profiles.
                </FieldDescription>
                {socialLinksData &&
                    socialLinksData.length !== 0 &&
                    socialLinksData.map((val, ind) => (
                        <div key={ind} className="mb-4">
                            <div className="flex justify-between">
                                <p className="mx-2">{val.platform}</p>
                                <Button
                                    variant="outline"
                                    className="m-1"
                                    onClick={() => handleDelete(ind)}
                                >
                                    <Trash className="text-red-400" />
                                </Button>
                            </div>
                            <Input value={val.url} disabled />
                        </div>
                    ))}
                <form onSubmit={handleSubmit(onSubmit)}>
                    <FieldSet>
                        <FieldGroup>
                            <Field>
                                <FieldLabel>Plateform Name</FieldLabel>
                                <Input
                                    id="plateform"
                                    type="text"
                                    placeholder="Please Enter Platefomr Name"
                                    {...register("platform", {
                                        required: "Plateform is Required",
                                    })}
                                />

                                <FieldError>{errors.platform?.message}</FieldError>
                            </Field>
                            <Field>
                                <FieldLabel>Profile Links</FieldLabel>
                                <Input
                                    id="url"
                                    type="text"
                                    placeholder="Please Enter Links of proflile"
                                    {...register("url", {
                                        required: "Links is Required",
                                    })}
                                />
                                <FieldError>{errors.url?.message}</FieldError>
                            </Field>
                            <div className="flex flex-col w-8/12 mx-auto gap-4">
                                <Button type="submit" className="flex-1">
                                    Add Platefrom
                                </Button>
                                {isLoading ? (
                                    <Button className="flex-1" type="button" disabled>
                                        {" "}
                                        Sending Request
                                    </Button>
                                ) : (
                                    <Button
                                        className="flex-1"
                                        type="button"
                                        onClick={() => handleFinalSubmit(finalData)}
                                    >
                                        Complete profile
                                    </Button>
                                )}
                            </div>
                        </FieldGroup>
                    </FieldSet>
                </form>
            </div>
        </>
    );
}

export default SocialLink;
