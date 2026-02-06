import {
    Briefcase,
    Users,
    Building2,
    Target,
    CheckCircle,
    ArrowRight,
} from "lucide-react";
import Image from "next/image";

function Home() {
    return (
        <div className="min-h-screen bg-white font-[var(--font-playwrite)] ">
            <section className="max-w-7xl mx-auto px-6 py-24">
                <div className="max-w-3xl">
                    <h1 className="text-6xl font-bold text-gray-900 leading-tight mb-6">
                        Hire based on skills, not credentials
                    </h1>
                    <p className="text-xl text-gray-600 mb-10 leading-relaxed">
                        A professional platform connecting skilled candidates with companies
                        that value expertise over paperwork.
                    </p>
                    <div className="flex gap-4">
                        <button className="bg-gray-900 text-white px-7 py-4 rounded-lg hover:bg-gray-800 font-medium text-lg flex items-center gap-2">
                            Create Profile
                            <ArrowRight className="w-5 h-5" />
                        </button>
                        <button className="border-2 border-gray-300 text-gray-900 px-7 py-4 rounded-lg hover:border-gray-400 font-medium text-lg">
                            Explore Jobs
                        </button>
                    </div>
                </div>
            </section>

            <section className="bg-gray-50 py-24">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="max-w-2xl mb-16">
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

            <section className="py-24">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-4xl font-bold text-gray-900 mb-6">
                                Connect with the right people
                            </h2>
                            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                                Real candidates. Real recruiters. No spam, no noise, no
                                artificial engagement. Every connection matters.
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
                        <div className="bg-gray-50 p-12 rounded-2xl border border-gray-200">
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

            <section className="bg-gray-50 py-24">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <div className="bg-white p-12 rounded-2xl border border-gray-200">
                            <div className="space-y-6">
                                <div className="border-b border-gray-200 pb-6">
                                    <div className="text-sm text-gray-600 mb-2">Time to hire</div>
                                    <div className="text-3xl font-bold text-gray-900">
                                        14 days
                                    </div>
                                    <div className="text-sm text-gray-600 mt-1">
                                        vs. industry average of 42 days
                                    </div>
                                </div>
                                <div className="border-b border-gray-200 pb-6">
                                    <div className="text-sm text-gray-600 mb-2">
                                        Match accuracy
                                    </div>
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
                                Start Hiring
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-24">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="max-w-2xl mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">
                            Find the right company
                        </h2>
                        <p className="text-lg text-gray-600 leading-relaxed">
                            Discover companies with transparent cultures, clear role
                            expectations, and opportunities for growth.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white p-8 rounded-xl border border-gray-200 hover:border-gray-300 transition-colors">
                            <div className="flex items-start justify-between mb-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-14 h-14 bg-gray-100 rounded-lg flex items-center justify-center">
                                        <Building2 className="w-7 h-7 text-gray-900" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-900">
                                            TechFlow Systems
                                        </h3>
                                        <p className="text-gray-600">Cloud Infrastructure</p>
                                    </div>
                                </div>
                            </div>
                            <div className="mb-4">
                                <div className="font-medium text-gray-900 mb-2">
                                    Senior Platform Engineer
                                </div>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    Build and maintain distributed systems at scale. Work with
                                    Kubernetes, Terraform, and modern observability tools.
                                </p>
                            </div>
                            <div className="flex gap-2 flex-wrap">
                                <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1.5 rounded-full">
                                    Go
                                </span>
                                <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1.5 rounded-full">
                                    Kubernetes
                                </span>
                                <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1.5 rounded-full">
                                    AWS
                                </span>
                            </div>
                        </div>

                        <div className="bg-white p-8 rounded-xl border border-gray-200 hover:border-gray-300 transition-colors">
                            <div className="flex items-start justify-between mb-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-14 h-14 bg-gray-100 rounded-lg flex items-center justify-center">
                                        <Building2 className="w-7 h-7 text-gray-900" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-900">
                                            DataVerse Analytics
                                        </h3>
                                        <p className="text-gray-600">Business Intelligence</p>
                                    </div>
                                </div>
                            </div>
                            <div className="mb-4">
                                <div className="font-medium text-gray-900 mb-2">
                                    Lead Product Designer
                                </div>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    Shape the user experience of enterprise analytics tools. Lead
                                    design systems and mentor junior designers.
                                </p>
                            </div>
                            <div className="flex gap-2 flex-wrap">
                                <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1.5 rounded-full">
                                    Figma
                                </span>
                                <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1.5 rounded-full">
                                    Design Systems
                                </span>
                                <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1.5 rounded-full">
                                    Leadership
                                </span>
                            </div>
                        </div>

                        <div className="bg-white p-8 rounded-xl border border-gray-200 hover:border-gray-300 transition-colors">
                            <div className="flex items-start justify-between mb-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-14 h-14 bg-gray-100 rounded-lg flex items-center justify-center">
                                        <Building2 className="w-7 h-7 text-gray-900" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-900">
                                            Meridian Security
                                        </h3>
                                        <p className="text-gray-600">Cybersecurity</p>
                                    </div>
                                </div>
                            </div>
                            <div className="mb-4">
                                <div className="font-medium text-gray-900 mb-2">
                                    Security Engineer
                                </div>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    Develop security tools and conduct penetration testing.
                                    Protect critical infrastructure for enterprise clients.
                                </p>
                            </div>
                            <div className="flex gap-2 flex-wrap">
                                <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1.5 rounded-full">
                                    Python
                                </span>
                                <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1.5 rounded-full">
                                    Network Security
                                </span>
                                <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1.5 rounded-full">
                                    Penetration Testing
                                </span>
                            </div>
                        </div>

                        <div className="bg-white p-8 rounded-xl border border-gray-200 hover:border-gray-300 transition-colors">
                            <div className="flex items-start justify-between mb-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-14 h-14 bg-gray-100 rounded-lg flex items-center justify-center">
                                        <Building2 className="w-7 h-7 text-gray-900" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-900">
                                            Quantum Labs
                                        </h3>
                                        <p className="text-gray-600">Machine Learning</p>
                                    </div>
                                </div>
                            </div>
                            <div className="mb-4">
                                <div className="font-medium text-gray-900 mb-2">
                                    ML Research Engineer
                                </div>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    Research and implement novel machine learning algorithms.
                                    Publish findings and deploy production models.
                                </p>
                            </div>
                            <div className="flex gap-2 flex-wrap">
                                <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1.5 rounded-full">
                                    PyTorch
                                </span>
                                <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1.5 rounded-full">
                                    NLP
                                </span>
                                <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1.5 rounded-full">
                                    Research
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-gray-50 py-24">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-white p-12 rounded-2xl border border-gray-200">
                            <Briefcase className="w-10 h-10 text-gray-900 mb-6" />
                            <h3 className="text-3xl font-bold text-gray-900 mb-4">
                                Post a job
                            </h3>
                            <p className="text-gray-600 mb-8 leading-relaxed">
                                Reach qualified candidates actively looking for opportunities
                                that match their skills.
                            </p>
                            <button className="bg-gray-900 text-white px-7 py-4 rounded-lg hover:bg-gray-800 font-medium text-lg w-full">
                                Post a Job
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
                                View All Jobs
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-24">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-5xl font-bold text-gray-900 mb-6">
                        Ready to get started?
                    </h2>
                    <p className="text-xl text-gray-600 mb-10 leading-relaxed">
                        Join professionals who value skill-based hiring and transparent
                        career opportunities.
                    </p>
                    <div className="flex gap-4 justify-center">
                        <button className="bg-gray-900 text-white px-8 py-4 rounded-lg hover:bg-gray-800 font-medium text-lg">
                            Create Your Profile
                        </button>
                        <button className="border-2 border-gray-300 text-gray-900 px-8 py-4 rounded-lg hover:border-gray-400 font-medium text-lg">
                            Post Your First Job
                        </button>
                    </div>
                </div>
            </section>

            <footer className="border-t border-gray-200 bg-gray-50">
                <div className="max-w-7xl mx-auto px-6 py-16">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-12">
                        <div>
                            <h4 className="font-semibold text-gray-900 mb-4">Product</h4>
                            <ul className="space-y-3">
                                <li>
                                    <a href="#" className="text-gray-600 hover:text-gray-900">
                                        Features
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-gray-600 hover:text-gray-900">
                                        Pricing
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-gray-600 hover:text-gray-900">
                                        For Companies
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-gray-600 hover:text-gray-900">
                                        For Candidates
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold text-gray-900 mb-4">Resources</h4>
                            <ul className="space-y-3">
                                <li>
                                    <a href="#" className="text-gray-600 hover:text-gray-900">
                                        Documentation
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-gray-600 hover:text-gray-900">
                                        API
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-gray-600 hover:text-gray-900">
                                        Support
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-gray-600 hover:text-gray-900">
                                        Status
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold text-gray-900 mb-4">Company</h4>
                            <ul className="space-y-3">
                                <li>
                                    <a href="#" className="text-gray-600 hover:text-gray-900">
                                        About
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-gray-600 hover:text-gray-900">
                                        Blog
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-gray-600 hover:text-gray-900">
                                        Careers
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-gray-600 hover:text-gray-900">
                                        Contact
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold text-gray-900 mb-4">Legal</h4>
                            <ul className="space-y-3">
                                <li>
                                    <a href="#" className="text-gray-600 hover:text-gray-900">
                                        Privacy
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-gray-600 hover:text-gray-900">
                                        Terms
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-gray-600 hover:text-gray-900">
                                        Security
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-gray-600 hover:text-gray-900">
                                        Compliance
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="flex items-center gap-2">
                            <Briefcase className="w-5 h-5 text-gray-900" />
                            <span className="font-semibold text-gray-900">Skillbase</span>
                        </div>
                        <p className="text-gray-600 text-sm">
                            © 2026 Skillbase. Professional skill-based hiring platform.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default Home;
