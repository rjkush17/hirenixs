import Image from "next/image";
function nav() {
    return (
        <nav className="border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <Image
                        src="/logos/textlogo-transperent-bg.png"
                        alt="Hirnixs"
                        width={150}
                        height={500}
                    />
                </div>
                <div className="flex items-center gap-4">
                    <button className="text-gray-600 hover:text-gray-900 font-medium">
                        Sign In
                    </button>
                    <button className="bg-gray-900 text-white px-5 py-2 rounded-lg hover:bg-gray-800 font-medium">
                        Get Started
                    </button>
                </div>
            </div>
        </nav>
    );
}

export default nav;
