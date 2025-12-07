"use client";
import AddForm from "@/components/onboarding/experince/AddForm";
import ListForm from "@/components/onboarding/experince/ListForm";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/hooks/useRedux";
import { useRouter } from "next/navigation";

//FIX: Need to fix ui and make it better

//TODO: Add last stage button

export function page() {
    const data = useAppSelector((state) => state.onboarding.experience);
    const router = useRouter();
    return (
        <>
            <main className="max-w-8/12 mx-auto">
                <h1 className="text-center mx-auto text-xl font-bolder">
                    Tell Us About Your Work Experince
                </h1>
                <p className="text-center mx-auto">
                    Add details about your Work experince and duration. This
                    helps complete your profile and improves your visibility.
                </p>
                {data.length !== 0 && <ListForm items={data} />}
                <AddForm />
                <div className="flex mx-8/12 justify-evenly mt-4">
                    <Button
                        className="w-32"
                        onClick={() => router.push("/onboarding/skills")}
                    >
                        Skip
                    </Button>
                    <Button
                        className="w-32"
                        onClick={() => router.push("/onboarding/skills")}
                    >
                        Skip
                    </Button>
                </div>
            </main>
        </>
    );
}

export default page;
