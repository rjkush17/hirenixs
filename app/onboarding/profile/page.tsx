"use client";
import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import usePost from "@/hooks/usePOST";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import ProfileInput from "@/components/onboarding/profile/Inputs";

export default function Page() {
    const router = useRouter();
    const inputRef = useRef<HTMLInputElement | null>(null);
    const { data: session, update } = useSession();
    const [profileLink, setProfileLink] = useState<string | null>(null);
    const { apiCall } = usePost();
    const [showBtn, setShowBtn] = useState<boolean>(true);

    useEffect(() => {
        if (session?.user?.avatar) {
            setProfileLink(session.user.avatar.link);
        }
    }, [session]);
    console.log(session);

    const clickingInput = () => {
        inputRef.current?.click();
    };

    const uploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file || !session?.user) return;

        const formData = new FormData();
        formData.append("file", file);
        formData.append("userID", session.user.id || "");
        formData.append("email", session.user.email || "");

        setShowBtn(false);
        toast.promise(apiCall("/api/profile/upload", formData), {
            loading: "Uploading image...",
            success: async (res) => {
                if (res?.url) setProfileLink(res.url);
                update({});
                setShowBtn(true);
                return res?.message || "Upload successful!";
            },
            error: (err) => err?.message || "Upload failed",
        });
    };

    const handleNext = () => {
        setShowBtn(false);
        router.push("/onboarding/education");
    };

    if (!session?.user) {
        return <h1>Login to access this Page</h1>;
    }

    const handleRemoveProfile = () => {
        setShowBtn(false);
        toast.promise(
            apiCall("/api/profile/delete", {
                email: session?.user?.email,
                publicID: session?.user?.avatar?.publicID,
            }),
            {
                loading: "delete profile pic",
                success: (res) => {
                    update({});
                    setShowBtn(true);
                    return res?.message;
                },
                error: (err: Error) => err?.message || "Error while deleting profiel",
            },
        );
    };

    return (
        <div>
            <Card className="bg-background border-none outline-none shadow-none">
                <CardHeader>
                    <CardTitle className="text-center text-2xl">
                        Upload & Showcase Your Profile Card Easily
                    </CardTitle>
                </CardHeader>

                <CardContent className="flex flex-col justify-center items-center">
                    {/* 👉 Profile Image */}
                    <div className="w-96 h-96 rounded-full overflow-hidden">
                        <Image
                            src={profileLink ?? "/defaultProfile/male.jpg"}
                            alt="profile picture"
                            width={500}
                            height={500}
                            className="rounded-xl"
                            loading="eager"
                        />
                    </div>

                    {/* 👉 Hidden Input */}
                    <input
                        ref={inputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={uploadImage}
                    />

                    <div className="flex justify-evenly w-96 mt-8">
                        <Button onClick={clickingInput} disabled={!showBtn}>
                            Update profile
                        </Button>

                        {session?.user.avatar?.link ? (
                            <Button onClick={handleRemoveProfile} disabled={!showBtn}>
                                Remove Profile
                            </Button>
                        ) : (
                            <Button disabled>Remove Profile</Button>
                        )}

                        <Button onClick={handleNext} disabled={!showBtn}>
                            Next / Skip
                        </Button>
                    </div>
                </CardContent>
            </Card>
            <ProfileInput />
        </div>
    );
}
