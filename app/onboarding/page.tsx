"use client";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Building2, User } from "lucide-react";
import { updateState } from "@/store/slices/onboardingSlice";
import { useDispatch } from 'react-redux'
import { useRouter } from "next/navigation";


export default function SelectRole() {
    const [selected, setSelected] = useState<string>("");
    const dispatch = useDispatch()
    const router = useRouter()

    const roles = [
        {
            id: "organization",
            title: "Organization",
            desc: "Companies and recruiters looking to hire new talent",
            icon: <Building2 className="w-5 h-5 text-muted-foreground" />,
        },
        {
            id: "individual",
            title: "Individual",
            desc: "Single persons searching and applying for jobs",
            icon: <User className="w-5 h-5 text-muted-foreground" />,
        },
    ];

    const onSubmit = () => {
        dispatch(updateState({ role: selected }))
        router.push(`/onboarding/${selected}/profile`)
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-background px-4">
            <div className="w-full max-w-md space-y-6">
                <h1 className="text-2xl font-semibold text-center">
                    Choose Your Profile Type
                </h1>

                {/* Cards stacked vertically */}
                <div className="flex flex-col gap-4">
                    {roles.map((role) => (
                        <Card
                            key={role.id}
                            onClick={() => setSelected(role.id)}
                            className={`cursor-pointer border-2 transition-all duration-200 hover:border-primary rounded-xl ${selected === role.id
                                ? "border-primary bg-primary/5 shadow-sm"
                                : "border-muted"
                                }`}
                        >
                            <CardContent className="flex items-center justify-between p-4">
                                <div className="flex items-start gap-3">
                                    {role.icon}
                                    <div>
                                        <p className="font-medium">{role.title}</p>
                                        <p className="text-sm text-muted-foreground">{role.desc}</p>
                                    </div>
                                </div>

                                {selected === role.id && (
                                    <CheckCircle2 className="text-primary w-5 h-5" />
                                )}
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Continue button */}
                <Button
                    className="w-full mt-2"
                    disabled={!selected}
                    onClick={onSubmit}
                >
                    Continue
                </Button>
            </div>
        </div>
    );
}
