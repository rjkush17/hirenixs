"use client";
import ProfileComponent from "@/components/Profile/fetchProfileDetails";
import { use } from "react";
export default function Page({
    params,
}: {
    params: Promise<{ username: string }>;
}) {
    const { username } = use(params);
    return (
        <main>
            <ProfileComponent para={username} />
        </main>
    );
}
