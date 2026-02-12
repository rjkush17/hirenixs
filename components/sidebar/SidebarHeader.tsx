import Link from "next/link";
import Image from "next/image";
import { SidebarHeader } from "@/components/ui/sidebar";

function sidebarHeader() {
    return (
        <SidebarHeader className="">
            <div className="pt-2 px-2">
                <Link href="/feed">
                    <Image
                        src="/logos/textlogo-transperent-bg.png"
                        alt="Hirenixs Logo"
                        width={400}
                        height={200}
                    />
                </Link>
            </div>
        </SidebarHeader>
    );
}

export default sidebarHeader;
