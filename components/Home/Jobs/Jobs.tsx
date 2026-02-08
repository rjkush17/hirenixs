import { Briefcase, Target } from "lucide-react";
import Link from "next/link";

function Jobs() {
    return (
        <section className="bg-gray-50 py-8 md:py-24">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-white p-12 rounded-2xl border border-gray-200">
                        <Briefcase className="w-10 h-10 text-gray-900 mb-6" />
                        <h3 className="text-3xl font-bold text-gray-900 mb-4">
                            Post a job
                        </h3>
                        <p className="text-gray-600 mb-8 leading-relaxed">
                            Reach qualified candidates actively looking for opportunities that
                            match their skills.
                        </p>
                        <button className="bg-gray-900 text-white px-7 py-4 rounded-lg hover:bg-gray-800 font-medium text-lg w-full">
                            <Link href={"/jobs"}>Post a Job</Link>
                        </button>
                    </div>

                    <div className="bg-white p-12 rounded-2xl border border-gray-200">
                        <Target className="w-10 h-10 text-gray-900 mb-6" />
                        <h3 className="text-3xl font-bold text-gray-900 mb-4">
                            Explore jobs
                        </h3>
                        <p className="text-gray-600 mb-8 leading-relaxed">
                            Browse open positions from companies looking for your specific
                            skill set and experience.
                        </p>
                        <button className="border-2 border-gray-300 text-gray-900 px-7 py-4 rounded-lg hover:border-gray-400 font-medium text-lg w-full">
                            <Link href={"/jobs"}>View All Jobs</Link>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Jobs;
