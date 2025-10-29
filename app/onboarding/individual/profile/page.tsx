"use client";
import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import usePost from "@/hooks/usePOST";

export default function Page(){
    const inputRef = useRef<HTMLInputElement | null>(null);
    const { data: session } = useSession();
    const [profileLink, setProfileLink] = useState<string | null>(null);
    const { apiCall } = usePost();

    // click on input using ref
    const clickingInput = () => {
        inputRef.current?.click();
    };
    // updating profile by
    const updatingProfile = () => {
        if (session?.user?.avatar) setProfileLink(session?.user?.avatar);
    };

    const uploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file &&  session && session.user) {
            const formData = new FormData(); // formData to send file
            formData.append("file", file);
            formData.append("userID", session?.user.id || "")
            formData.append("email",session?.user?.email || "")
            await apiCall("/api/profile/upload", formData);
            console.log("upload image function ran");
        }
    };
    // updating profile using updateProfile
    useEffect(() => {
        updatingProfile();
    }, [session]);

    //session return user if not logged in
    if (!session?.user) {
        return <h1>Login to access this Pages</h1>;
    }

    return (
        <div>
            <Card>
                <CardHeader>
                    <CardTitle> Upload & Showcase Your Profile Card Easily</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="">
                        <Image
                            src={profileLink ?? "/defaultProfile/male.jpg"}
                            alt="profile picture"
                            width={500}
                            height={500}
                            className="rounded-xl"
                        />
                    </div>
                    <input
                        ref={inputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={uploadImage}
                    />

                    <Button onClick={clickingInput}>Update profile</Button>
                    {session?.user.avatar ? (
                        <Button
                            onClick={() =>
                                console.log("soon there will be a remove profile function")
                            }
                        >
                            Remove Profile
                        </Button>
                    ) : (
                        <Button disabled>Remove Profile</Button>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}

