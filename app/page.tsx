import Link from "next/link";
import { auth } from "@/auth";

export default async function Home() {
    const session = await auth();
    console.log(session)

    if (!session?.user)
        return (
            <>
                <div className="mt-16 text-center">
                    <h3 className="text-lg">You have'nt Login yet Please Login First</h3>
                    <Link href="/auth/login">Click here for Logins</Link>
                    <br />
                    <Link href="/auth/register">Create an account</Link>
                </div>
            </>
        );
    return (
        <>
            <h1 className="text-center tex-lg">Hello, {session.user.name}</h1>
            <h2 className="text-center text-base">
                you login with this email - {session.user.email}
            </h2>
        </>
    );
}
