"use client";

import {
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
} from "@/components/ui/sidebar";

import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSub,
    DropdownMenuSubTrigger,
    DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

import {
    ChevronsUpDown,
    LogOut,
    Palette,
    Sun,
    Moon,
    MonitorCog,
} from "lucide-react";

import { useSidebar } from "@/components/ui/sidebar";
import { useTheme } from "next-themes";
import { signOut } from "next-auth/react";

type NavUserProps = {
    user: {
        name: string;
        email: string;
        avatar: string;
    };
};

export default function NavUser({ user }: NavUserProps) {
    const { isMobile } = useSidebar();
    const { setTheme } = useTheme();

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton
                            size="lg"
                            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                        >
                            <Avatar className="h-8 w-8 rounded-lg">
                                <AvatarImage src={user.avatar} alt={user.name} />
                                <AvatarFallback className="rounded-lg">
                                    {user.name?.slice(0, 2).toUpperCase()}
                                </AvatarFallback>
                            </Avatar>

                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="truncate font-medium">{user.name}</span>
                                <span className="truncate text-xs">{user.email}</span>
                            </div>

                            <ChevronsUpDown className="ml-auto size-4" />
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent
                        className=" min-w-32 rounded-lg w-36"
                        side={isMobile ? "bottom" : "right"}
                        align="end"
                        sideOffset={4}
                    >
                        <DropdownMenuSub>
                            <DropdownMenuSubTrigger className="">
                                <Palette className="mr-2 h-4 w-4" />
                                Appearance
                            </DropdownMenuSubTrigger>

                            <DropdownMenuSubContent>
                                <DropdownMenuItem onClick={() => setTheme("light")}>
                                    <Sun className="mr-2 h-4 w-4" />
                                    Light
                                </DropdownMenuItem>

                                <DropdownMenuItem onClick={() => setTheme("dark")}>
                                    <Moon className="mr-2 h-4 w-4" />
                                    Dark
                                </DropdownMenuItem>

                                <DropdownMenuItem onClick={() => setTheme("system")}>
                                    <MonitorCog className="mr-2 h-4 w-4" />
                                    System
                                </DropdownMenuItem>
                            </DropdownMenuSubContent>
                        </DropdownMenuSub>

                        <DropdownMenuItem
                            onClick={() => signOut()}
                            className="justify-center"
                        >
                            <LogOut className="mr-2 h-4 w-4" />
                            Logout
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    );
}
