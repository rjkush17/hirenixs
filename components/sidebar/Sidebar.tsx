"use client";
import Link from "next/link";
import ThemeSwitch from "@/components/theme-switcher";
import { signOut } from "next-auth/react";

function Sidebar() {
  return (
    <div className="flex justify-evenly w-full bg-red-500">
      <Link href="/auth/login">Logins page</Link>
      <Link href="/auth/register">Register pages</Link>
      <ThemeSwitch />
      <button onClick={() => signOut()}>Sign Out</button>
      <Link href="/onboarding/individual/profile"> onboard</Link>
    </div>
  );
}

export default Sidebar;
