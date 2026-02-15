import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { Heart } from "lucide-react";

export default function AppFooter() {
    return (
        <footer className="w-full border-t bg-background">
            <div className="container mx-auto flex flex-col items-center gap-4 py-6 text-sm text-muted-foreground">
                <div className="flex flex-wrap items-center justify-center gap-4 text-xs">
                    <span className="hover:text-foreground">Privacy Policy</span>
                    <span>•</span>
                    <span className="hover:text-foreground">Terms</span>
                    <span>•</span>
                    <span className="hover:text-foreground">Report Issue</span>
                    <span>•</span>
                    <span className="hover:text-foreground">Contact</span>
                </div>
                <p className="flex items-center gap-2 text-center text-xs">
                    <span className="">
                        © {new Date().getFullYear()} All rights reserved.
                    </span>
                    Handcrafted with
                    <Heart className="h-4 w-4 fill-red-500 text-red-500" />
                    by{" "}
                    <Link
                        href="https://your-portfolio-link.com"
                        target="_blank"
                        className="font-medium text-foreground underline-offset-4 hover:underline"
                    >
                        Rishabh Kushwah
                    </Link>
                </p>
            </div>
        </footer>
    );
}
