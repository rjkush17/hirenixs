import { CheckCircle } from "lucide-react";
import Link from "next/link";
function States() {
    return (
        <section className="bg-gray-50 py-8 md:py-24">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid md:grid-cols-2 gap-16 items-center">
                    <div className="bg-white p-12 rounded-2xl border border-gray-200">
                        <div className="space-y-6">
                            <div className="border-b border-gray-200 pb-6">
                                <div className="text-sm text-gray-600 mb-2">Time to hire</div>
                                <div className="text-3xl font-bold text-gray-900">14 days</div>
                                <div className="text-sm text-gray-600 mt-1">
                                    vs. industry average of 42 days
                                </div>
                            </div>
                            <div className="border-b border-gray-200 pb-6">
                                <div className="text-sm text-gray-600 mb-2">Match accuracy</div>
                                <div className="text-3xl font-bold text-gray-900">94%</div>
                                <div className="text-sm text-gray-600 mt-1">
                                    based on skill alignment
                                </div>
                            </div>
                            <div>
                                <div className="text-sm text-gray-600 mb-2">
                                    Candidate satisfaction
                                </div>
                                <div className="text-3xl font-bold text-gray-900">4.8/5</div>
                                <div className="text-sm text-gray-600 mt-1">
                                    from post-hire surveys
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h2 className="text-4xl font-bold text-gray-900 mb-6">
                            Hire the right people
                        </h2>
                        <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                            Fast, transparent, skill-based hiring. Find qualified candidates
                            who can contribute from day one.
                        </p>
                        <ul className="space-y-4 mb-8">
                            <li className="flex items-start gap-3">
                                <CheckCircle className="w-6 h-6 text-gray-900 flex-shrink-0 mt-0.5" />
                                <span className="text-gray-700">
                                    Search by specific technical skills and experience level
                                </span>
                            </li>
                            <li className="flex items-start gap-3">
                                <CheckCircle className="w-6 h-6 text-gray-900 flex-shrink-0 mt-0.5" />
                                <span className="text-gray-700">
                                    Review portfolios and real work samples
                                </span>
                            </li>
                            <li className="flex items-start gap-3">
                                <CheckCircle className="w-6 h-6 text-gray-900 flex-shrink-0 mt-0.5" />
                                <span className="text-gray-700">
                                    Connect directly without intermediaries
                                </span>
                            </li>
                        </ul>
                        <button className="bg-gray-900 text-white px-7 py-4 rounded-lg hover:bg-gray-800 font-medium text-lg">
                            <Link href="/feed">Start Hiring</Link>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default States;
