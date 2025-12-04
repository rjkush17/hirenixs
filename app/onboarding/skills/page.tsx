"use client";
import { useForm } from "react-hook-form";
import { SkillsSchema, SkillsSchemaType } from "@/lib/zod/onboardingSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { addskills, removeSkills } from "@/store/slices/onboardingSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { useRouter } from "next/navigation";

export default function Page() {
    const dispatch = useAppDispatch();
    const skillsData: string[] | undefined = useAppSelector(
        (state) => state.onboarding.skills,
    );
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<SkillsSchemaType>({
        resolver: zodResolver(SkillsSchema),
        defaultValues: {
            skills: "",
        },
    });

    // ----------------- SUBMIT -----------------
    const onSubmit = (data: SkillsSchemaType) => {
        const arrayOfSkills: string[] = data.skills.split(" ");

        arrayOfSkills.forEach((value: string) => {
            const finalValue =
                value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
            dispatch(addskills(finalValue));
        });
        reset();
    };

    return (
        <div className="p-4 mt-8 max-w-xl mx-auto text-center">
            <p className="text-3xl font-extrabold mt-8">What skills do you have?</p>
            <p className="text-ring my-4">
                Tell us what skills you have. Add multiple skills by separating them
                with commas.
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="flex gap-2">
                    <Input
                        placeholder="React, Next.js, Node.js"
                        {...register("skills", { required: "Please Inter a skills" })}
                    />
                    <Button type="submit" className="px-6">
                        Add
                    </Button>
                </div>

                {errors.skills && (
                    <p className="text-red-500 text-sm">
                        {errors.skills.message as string}
                    </p>
                )}

                {/* Display skills */}
                <div className="flex flex-wrap gap-2 mt-4 justify-center">
                    {skillsData ? (
                        skillsData.map((value: string, index: number) => {
                            return (
                                <div
                                    key={index}
                                    className="bg-primary gap-1 rounded-4xl flex justify-center items-center px-2 py-1 text-sm"
                                >
                                    <p className="font-semibold">{value}</p>
                                    <X size={16} onClick={() => dispatch(removeSkills(index))} />
                                </div>
                            );
                        })
                    ) : (
                        <p>Your added skills will shown here</p>
                    )}
                </div>

                <div className="mt-6 flex gap-4 justify-evenly">
                    <Button
                        variant="outline"
                        onClick={() => router.push("/onboarding/education")}
                        className="w-3/12"
                    >
                        Back
                    </Button>
                    <Button
                        variant="outline"
                        onClick={() => router.push("/onboarding/socalLinks")}
                        className="w-3/12"
                    >
                        Skill
                    </Button>
                    <Button
                        variant="outline"
                        onClick={() => router.push("/onboarding/socalLinks")}
                        className="w-3/12"
                    >
                        Back
                    </Button>
                </div>
            </form>
        </div>
    );
}
