"use client";
import ProfileInput from "@/components/onboarding/profile/Inputs";
import ProfileImage from "@/components/onboarding/profileImage/ProfileImage";
import StepperUI from "@/components/onboarding/stepperUI";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";

export default function Page() {
    return (
        <div className="max-w-6/12 mx-auto">
            <StepperUI current={1} total={4} />
            <Card className="bg-background border-none">
                <CardHeader className="text-center">
                    <CardTitle>Tell Us About You </CardTitle>
                    <CardDescription>
                        Share a few basic details about yourself to complete your profile
                        and personalize your experience.
                    </CardDescription>
                </CardHeader>
            </Card>
            <ProfileImage />
            <ProfileInput />
        </div>
    );
}
