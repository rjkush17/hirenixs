import { Suspense } from "react";
import ResetPasswordClient from "@/components/forgot-password/forgot-password";

export default function Page() {
    return (
        <Suspense fallback={<div className="p-6">Loading...</div>}>
            <ResetPasswordClient />
        </Suspense>
    );
}
