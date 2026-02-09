export const Footer = () => {
    return (
        <footer className="border-t border-gray-200 bg-black text-white">
            <div className="max-w-7xl mx-auto px-6 pt-16">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
                    <div>
                        <h4 className="font-semibold  mb-4">Product</h4>
                        <ul className="space-y-3">
                            <li>
                                <a href="#" className="">
                                    Features
                                </a>
                            </li>
                            <li>
                                <a href="#" className="">
                                    Pricing
                                </a>
                            </li>
                            <li>
                                <a href="#" className="">
                                    For Companies
                                </a>
                            </li>
                            <li>
                                <a href="#" className="">
                                    For Candidates
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4">Resources</h4>
                        <ul className="space-y-3">
                            <li>
                                <a href="#" className="">
                                    Documentation
                                </a>
                            </li>
                            <li>
                                <a href="#" className="">
                                    API
                                </a>
                            </li>
                            <li>
                                <a href="#" className="">
                                    Support
                                </a>
                            </li>
                            <li>
                                <a href="#" className="">
                                    Status
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4">Company</h4>
                        <ul className="space-y-3">
                            <li>
                                <a href="#" className="">
                                    About
                                </a>
                            </li>
                            <li>
                                <a href="#" className="">
                                    Blog
                                </a>
                            </li>
                            <li>
                                <a href="#" className="">
                                    Careers
                                </a>
                            </li>
                            <li>
                                <a href="#" className="">
                                    Contact
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4">Legal</h4>
                        <ul className="space-y-3">
                            <li>
                                <a href="#" className="">
                                    Privacy
                                </a>
                            </li>
                            <li>
                                <a href="#" className="">
                                    Terms
                                </a>
                            </li>
                            <li>
                                <a href="#" className="">
                                    Security
                                </a>
                            </li>
                            <li>
                                <a href="#" className="">
                                    Compliance
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="py-8 text-center">
                    Handcraft by{" "}
                    <span className="underline">
                        <a href="https://rishabhkushwah.netlify.app/" target="_blank">
                            Rishabh Kushwah
                        </a>
                    </span>{" "}
                    · Personal Practice Project
                </div>
            </div>
        </footer>
    );
};

export default Footer;
