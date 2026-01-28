import SocialLink from "@/components/onboarding/socialLinks/SocialLinks";
import StepperUI from "@/components/onboarding/stepperUI";

function Page() {
    return (
        <div>
            <StepperUI current={4} total={4}/>
            <SocialLink />
        </div>
    );
}

export default Page;
