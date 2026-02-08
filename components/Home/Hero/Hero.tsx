import { ArrowRight } from "lucide-react";
import Link from "next/link";

function Hero() {
    return (
        <section className="max-w-7xl mx-auto px-6 py-8 md:py-24">
            <div className="max-w-3xl">
                <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight mb-2 md:mb-6">
                    Hire based on skills, not credentials
                </h1>
                <p className="md:text-xl text-gray-600 mb-10 leading-relaxed">
                    We connect skilled professionals with companies that care more about
                    what you can do than where you studied.
                </p>
                <div className="flex flex-col md:flex-row gap-4 max-w-8/12 md:max-w-full">
                    <button className="bg-gray-900 text-white px-3 md:px-7 py-4 rounded-lg hover:bg-gray-800 font-medium text-base md:text-lg flex items-center justify-center gap-2">
                        <Link href="/auth/login">Create Profile</Link>
                        <ArrowRight className="w-5 h-5" />
                    </button>
                    <button className="border-2 border-gray-300 text-gray-900 px-3 md:px-7 py-2 md:py-4 rounded-lg hover:border-gray-400 font-medium text-lg">
                        <Link href={"/jobs"}>Explore Jobs</Link>
                    </button>
                </div>
            </div>
        </section>
    );
}

export default Hero;
