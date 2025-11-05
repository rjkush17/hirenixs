"use client";
import Link from "next/link";
import ThemeSwitch from "@/components/theme-switcher";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { useSession } from "next-auth/react";

function Sidebar() {
  const { data: session } = useSession();

  return (
    <div className="flex w-full items-center justify-center gap-5 px-5">
      <Link href="/" className="mr-auto">
        <Image
          src="/logos/logo-transperent-bg.png"
          width={50}
          height={50}
          alt="Logo"
        />
      </Link>
      {!session && (
        <>
          <Link href="/auth/login">SignIn</Link>
          <Link href="/auth/register">SignUp</Link>
        </>
      )}
      {session && (
        <>
          <button onClick={() => signOut()}>logout</button>
          <Link href="/onboarding/individual/profile"> onboard</Link>
        </>
      )}
      <ThemeSwitch />
    </div>
  );
}

export default Sidebar;
