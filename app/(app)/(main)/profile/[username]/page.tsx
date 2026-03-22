"use client";
import ProfileComponent from "@/components/Profile/fetchProfileDetails";
import { use } from "react";
import { useModal } from "@/components/Profile/useModel";
export default function Page({
    params,
}: {
    params: Promise<{ username: string }>;
}) {
    const { username } = use(params);
    const { openModal, closeModal } = useModal();
    return (
        <main>
            <button onClick={() => openModal("ProfileImages")}>Open Model</button>
            <ProfileComponent para={username} />
        </main>
    );
}
