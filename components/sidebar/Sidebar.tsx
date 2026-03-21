"use client";

import { Sidebar } from "@/components/ui/sidebar";
import Header from "@/components/sidebar/SidebarHeader";
import Footer from "@/components/sidebar/SidebarFooter";
import SidebarContent from "@/components/sidebar/SidebarContent";
import { useSession } from "next-auth/react";

interface User {
    name: string;
    avatar: string;
    email: string;
}

function SidePanel() {
    const { data: session } = useSession();

    if (!session?.user) return null;

    const user: User = {
        name: session.user.name ?? "Guest",
        avatar: session.user.avatar?.link ?? "/defaultProfile/male.jpg",
        email: session.user.email ?? "",
    };

    return (
        <Sidebar>
            <Header />
            <SidebarContent username={session.user.username || ""} />
            <Footer user={user} />
        </Sidebar>
    );
}

export default SidePanel;
