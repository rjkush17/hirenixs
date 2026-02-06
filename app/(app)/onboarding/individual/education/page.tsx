"use client";
import AddForm from "@/components/onboarding/education/AddForm";
import ListForm from "@/components/onboarding/education/ListForm";
import { useAppSelector } from "@/hooks/useRedux";
import StepperUI from "@/components/onboarding/stepperUI";
import { useOnboardingRedirect } from "@/hooks/useOnboardingRedirect";
export function Page() {
    const data = useAppSelector((state) => state.onboarding.education);
    useOnboardingRedirect(2);

    return (
        <>
            <StepperUI current={2} total={4} />
            <main className="w-6/12 mt-6 mx-auto">
                <h1 className="text-center mx-auto text-xl font-bolder">
                    Tell Us About Your Education
                </h1>
                <p className="text-center mx-auto">
                    Add details about your institute, course, and study duration. This
                    helps complete your profile and improves your visibility.
                </p>
                {data.length !== 0 && <ListForm items={data} />}
                <AddForm />
            </main>
        </>
    );
}

export default Page;
