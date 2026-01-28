"use client";
import { useSession } from "next-auth/react";
import ProfileInput from "@/components/onboarding/profile/Inputs";
import ProfileImage from "@/components/onboarding/profileImage/ProfileImage";
import StepperUI from "@/components/onboarding/stepperUI";

export default function Page() {
    const { data: session } = useSession();

    if (!session?.user) {
        return <h1>Login to access this Page</h1>;
    }

    return (
        <div className="max-w-6/12 mx-auto">
            <StepperUI current={1} total={4}/>
            <ProfileImage />
            <ProfileInput />
        </div>
    );
}
