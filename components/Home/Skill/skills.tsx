import { Target, CheckCircle, Users } from "lucide-react"

export default function skills() {
  return (
            <section className="bg-gray-50 py-8 md:py-24">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="max-w-2xl mb-4 md:mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">
                            Showcase your skills
                        </h2>
                        <p className="text-lg text-gray-600 leading-relaxed">
                            Build a profile that highlights what you can do. Skills matter
                            more than degrees.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white p-8 rounded-xl border border-gray-200">
                            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-6">
                                <Target className="w-6 h-6 text-gray-900" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                Skill-First Profiles
                            </h3>
                            <p className="text-gray-600 leading-relaxed">
                                Present your technical abilities and real work samples front and
                                center.
                            </p>
                        </div>

                        <div className="bg-white p-8 rounded-xl border border-gray-200">
                            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-6">
                                <CheckCircle className="w-6 h-6 text-gray-900" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                Verified Experience
                            </h3>
                            <p className="text-gray-600 leading-relaxed">
                                Demonstrate your expertise through projects, contributions, and
                                validations.
                            </p>
                        </div>

                        <div className="bg-white p-8 rounded-xl border border-gray-200">
                            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-6">
                                <Users className="w-6 h-6 text-gray-900" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                Direct Connections
                            </h3>
                            <p className="text-gray-600 leading-relaxed">
                                Get noticed by companies actively searching for your specific
                                skill set.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
    
  )
}

