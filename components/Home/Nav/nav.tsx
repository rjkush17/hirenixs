import Image from "next/image";
import Link from 'next/link'

function nav() {
    return (
        <nav className="border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 md:px-6  py-2 md:py-4 flex justify-between items-center">
                <div className="flex items-center max-w-24 md:max-w-96 gap-2">
                    <Image
                        src="/logos/textlogo-transperent-bg-black.png"
                        alt="Hirnixs"
                        width={150}
                        height={500}
                    />
                </div>
                <div className="flex items-center gap-4">
                    <button className="bg-gray-900 text-white px-5 py-2 rounded-lg hover:bg-gray-600 font-medium">
                        <Link href="/auth/login" >

                        Sign In
                        </Link>
                    </button>
                    <button className="bg-gray-900 text-white px-5 py-2 rounded-lg hover:bg-gray-600 font-medium">
                        <Link href="/auth/register">Sign Up</Link>
                    </button>
                </div>
            </div>
        </nav>
    );
}

export default nav;
