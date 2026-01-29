"use client";
import AddForm from "@/components/onboarding/experince/AddForm";
import ListForm from "@/components/onboarding/experince/ListForm";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/hooks/useRedux";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";
import { OnboardingType } from "@/store/slices/onboardingSlice";

export function Page() {
    const data: OnboardingType["experience"] = useAppSelector(
        (state) => state.onboarding.experience,
    );
    const router: AppRouterInstance = useRouter();
    return (
        <>
            <main className="max-w-8/12 mx-auto">
                <h1 className="text-center mx-auto text-xl font-bolder">
                    Tell Us About Your Work Experince
                </h1>
                <p className="text-center mx-auto">
                    Add details about your Work experince and duration. This helps
                    complete your profile and improves your visibility.
                </p>
                {data.length !== 0 && <ListForm items={data} />}
                <AddForm />
                <div className="w-8/12 mx-auto mt-4">
                    <Button
                        className="w-full"
                        onClick={(): void => router.push("/onboarding/individual/skills")}
                    >
                        Next Step / Skip
                    </Button>
                </div>
            </main>
        </>
    );
}

export default Page;
