"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, UserRoundPen } from "lucide-react";
import {
    SidebarContent as SidebarContainer,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
} from "@/components/ui/sidebar";
import { useSession } from "next-auth/react";

function SidebarContent() {
    const { data: session } = useSession();

    const navLinks = [
        {
            title: "Home",
            href: "/feed",
            icon: Home,
        },
        {
            title: "My Profile",
            href: `/profile/${session?.user?.username}`,
            icon: UserRoundPen,
        },
    ];

    const pathname = usePathname();

    return (
        <SidebarContainer>
            <SidebarMenu className="">
                {navLinks.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;

                    return (
                        <SidebarMenuItem key={item.href}>
                            <SidebarMenuButton
                                className="justify-center"
                                asChild
                                isActive={isActive}
                            >
                                <Link href={item.href}>
                                    <Icon className="h-4 w-4 mr-2" />
                                    {item.title}
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    );
                })}
            </SidebarMenu>
        </SidebarContainer>
    );
}

export default SidebarContent;
