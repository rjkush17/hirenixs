"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/hooks/useRedux";

export function useOnboardingRedirect(requiredStep: number) {
    const currentStep = useAppSelector(
        (state) => state.onboardingStepChecker.step,
    );

    const router = useRouter();

    useEffect(() => {
        if (currentStep !== requiredStep) {
            router.replace("/onboarding/individual/profile");
        }
    },[router]);
}
