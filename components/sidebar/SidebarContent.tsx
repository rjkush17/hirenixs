"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home } from "lucide-react";
import {
    SidebarContent as SidebarContainer,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
} from "@/components/ui/sidebar";

function SidebarContent() {
    const navLinks = [
        {
            title: "Home",
            href: "/feed",
            icon: Home,
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
