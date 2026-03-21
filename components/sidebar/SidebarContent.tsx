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

function SidebarContent(props: { username: string }) {

    const navLinks = [
        {
            title: "Home",
            href: "/feed",
            icon: Home,
        },
        {
            title: "My Profile",
            href: `/profile/${props?.username}`,
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
                                className="justify-center w-11/12 mx-auto"
                                asChild
                                isActive={isActive}
                            >
                                <Link href={item.href}>
                                    <Icon className="h-4 w-4" />
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
