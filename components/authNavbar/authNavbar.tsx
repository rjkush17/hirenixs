"use client";

import Link from "next/link";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { LogIn, UserPlus, Home, LogOut } from "lucide-react";

import ThemeSwitch from "@/components/theme-switcher";

function AuthNavbar() {
    const { data: session } = useSession();

    return (
        <header className="absolute top-0 w-full border-b bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="mx-auto flex h-16 max-w-6xl items-center px-6">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 mr-auto">
                    <Image
                        src="/logos/textlogo-transperent-bg.png"
                        width={100}
                        height={10}
                        alt="Logo"
                    />
                </Link>

                {/* Right Side */}
                <div className="flex items-center gap-4">
                    <Link
                        href="/"
                        className="flex items-center gap-2 text-sm hover:text-primary transition"
                    >
                        <Home className="h-4 w-4" />
                        <span className="hidden md:block">Home</span>
                    </Link>

                    {!session && (
                        <>
                            <Link
                                href="/auth/login"
                                className="flex items-center gap-2 text-sm hover:text-primary transition"
                            >
                                <LogIn className="h-4 w-4" />

                                <span className="hidden md:block">Sign In</span>
                            </Link>

                            <Link
                                href="/auth/register"
                                className="flex items-center gap-2 text-sm hover:text-primary transition"
                            >
                                <UserPlus className="h-4 w-4" />
                                <span className="hidden md:block">Sign Up</span>
                            </Link>
                        </>
                    )}

                    {session && (
                        <button
                            onClick={() => signOut()}
                            className="flex items-center gap-2 text-sm text-destructive hover:opacity-80 transition"
                        >
                            <LogOut className="h-4 w-4" />
                                                            <span className="hidden md:block">Sign Out</span>

                        </button>
                    )}

                    <ThemeSwitch />
                </div>
            </div>
        </header>
    );
}

export default AuthNavbar;
