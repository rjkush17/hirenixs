"use client";
import { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useModal } from "@/components/Profile/useModel";

export default function ProfileImage() {
    const inputRef = useRef<HTMLInputElement | null>(null);
    // const { data: session, update } = useSession();
    const [profileLink, setProfileLink] = useState<string | null>(null);
    const [showBtn, setShowBtn] = useState<boolean>(true);

    const { session, update, closeModal } = useModal();

    useEffect(() => {
        if (session?.user?.avatar?.link) {
            setProfileLink(session.user?.avatar?.link);
        }
    }, [session]);

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
        toast.promise(
            fetch("/api/profile/upload", {
                method: "POST",
                body: formData,
            }).then(async (res) => {
                if (!res.ok) throw new Error("Upload failed");
                return res.json();
            }),
            {
                loading: "Uploading image...",
                success: async (res: { url?: string; message?: string }) => {
                    if (res?.url) setProfileLink(res.url);
                    update({});
                    setShowBtn(true);
                    closeModal();
                    return res?.message || "Upload successful!";
                },
                error: "Upload failed",
            },
        );
    };

    if (!session?.user) {
        //FIX: update the Ui fo access
        return <h1>Login to access this Page</h1>;
    }

    const handleRemoveProfile = () => {
        setShowBtn(false);

        toast.promise(
            fetch("/api/profile/delete", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: session?.user?.email,
                    publicID: session?.user?.avatar?.publicID,
                }),
            }).then(async (res) => {
                if (!res.ok) throw new Error("Delete failed");
                return res.json();
            }),
            {
                loading: "delete profile pic",
                success: (res: { message?: string }) => {
                    update({});
                    setShowBtn(true);
                    closeModal();
                    return res?.message || "Profile deleted";
                },
                error: (err: Error) => err?.message || "Error while deleting profile",
            },
        );
    };

    return (
        <div>
            <Card className="bg-background border-none outline-none shadow-none">
                <CardContent className="flex flex-col justify-center items-center">
                    {/* 👉 Profile Image */}
                    <div className="w-56 h-56 rounded-full overflow-hidden">
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

                    <div className="flex flex-col gap-4 justify-evenly w-full mt-8">
                        <Button onClick={clickingInput} disabled={!showBtn}>
                            Update Profile
                        </Button>

                        {session?.user.avatar?.link ? (
                            <Button
                                onClick={handleRemoveProfile}
                                variant={"destructive"}
                                disabled={!showBtn}
                            >
                                Remove Profile
                            </Button>
                        ) : (
                            <Button className="" variant={"outline"} disabled>
                                Remove Profile
                            </Button>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
