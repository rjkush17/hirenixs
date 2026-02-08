import { CheckCircle } from "lucide-react";

function connect() {
    return (
        <section className="py-8 md:py-24">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid md:grid-cols-2 gap-4 md:gap-16 items-center">
                    <div>
                        <h2 className="text-4xl font-bold text-gray-900 mb-6">
                            Connect with the right people
                        </h2>
                        <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                            Real candidates. Real recruiters. No spam, no noise, no artificial
                            engagement. Every connection matters.
                        </p>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <CheckCircle className="w-6 h-6 text-gray-900 flex-shrink-0 mt-0.5" />
                                <span className="text-gray-700">
                                    Verified company accounts and authenticated users
                                </span>
                            </li>
                            <li className="flex items-start gap-3">
                                <CheckCircle className="w-6 h-6 text-gray-900 flex-shrink-0 mt-0.5" />
                                <span className="text-gray-700">
                                    Direct messaging with hiring managers
                                </span>
                            </li>
                            <li className="flex items-start gap-3">
                                <CheckCircle className="w-6 h-6 text-gray-900 flex-shrink-0 mt-0.5" />
                                <span className="text-gray-700">
                                    Transparent hiring process and clear expectations
                                </span>
                            </li>
                        </ul>
                    </div>
                    <div className="bg-gray-50 p-4 md:p-12 rounded-2xl border border-gray-200">
                        <div className="space-y-6">
                            <div className="bg-white p-6 rounded-lg border border-gray-200">
                                <div className="flex items-center gap-4 mb-3">
                                    <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                                    <div>
                                        <div className="font-semibold text-gray-900">
                                            Sarah Chen
                                        </div>
                                        <div className="text-sm text-gray-600">
                                            Senior Backend Engineer
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-2 flex-wrap">
                                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
                                        Node.js
                                    </span>
                                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
                                        PostgreSQL
                                    </span>
                                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
                                        AWS
                                    </span>
                                </div>
                            </div>
                            <div className="bg-white p-6 rounded-lg border border-gray-200">
                                <div className="flex items-center gap-4 mb-3">
                                    <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                                    <div>
                                        <div className="font-semibold text-gray-900">
                                            Marcus Rivera
                                        </div>
                                        <div className="text-sm text-gray-600">
                                            Product Designer
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-2 flex-wrap">
                                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
                                        Figma
                                    </span>
                                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
                                        Design Systems
                                    </span>
                                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
                                        UX Research
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default connect;
