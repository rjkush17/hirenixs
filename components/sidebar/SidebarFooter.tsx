"use client";
import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Moon, Sun, MonitorCog, Palette } from "lucide-react";
import { useTheme } from "next-themes";
import {
    SidebarFooter,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";

export default function Footer() {
    const { setTheme } = useTheme();

    return (
        <SidebarFooter>
            <SidebarMenu>
                <SidebarMenuItem>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <SidebarMenuButton className="justify-center">
                                <Palette className="mr-2 h-4 w-4" />
                                Appearance
                            </SidebarMenuButton>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="end" side="right">
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
                        </DropdownMenuContent>
                    </DropdownMenu>
                </SidebarMenuItem>
            </SidebarMenu>
            <SidebarMenu>
                <SidebarMenuItem>
                    <SidebarMenuButton
                        onClick={() => signOut()}
                        className="justify-center"
                    >
                        <LogOut className="h-4 w-4 mr-2" />
                        Logout
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarFooter>
    );
}
