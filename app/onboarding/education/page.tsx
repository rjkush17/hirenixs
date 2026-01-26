"use client";
import AddForm from "@/components/onboarding/education/AddForm";
import ListForm from "@/components/onboarding/education/ListForm";
import { useAppSelector } from "@/hooks/useRedux";

//FIX: Need to fix ui and make it better

//TODO: Add last stage button

export function Page() {
    const data = useAppSelector((state) => state.onboarding.education);

    return (
        <>
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
