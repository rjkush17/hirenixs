"use client";
import SocialLink from "@/components/onboarding/socialLinks/SocialLinks";
import StepperUI from "@/components/onboarding/stepperUI";
import { useOnboardingRedirect } from "@/hooks/useOnboardingRedirect";

function Page() {
    useOnboardingRedirect(5);
    return (
        <div>
            <StepperUI current={4} total={4} />
            <SocialLink />
        </div>
    );
}

export default Page;
