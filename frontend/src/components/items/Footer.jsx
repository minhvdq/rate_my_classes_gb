import { frontendBase } from "../../utils/homeUrl";

export default function FooterPage() {
    return (
        <div>
            <footer className="bg-white text-black pt-4 pb-3 border-top shadow-sm">
                <div className="container d-flex flex-column align-items-center text-center">
                    {/* Social Media Links */}
                    <div className="d-flex gap-4 mt-3 mb-2">
                        <a href="https://github.com/minhvdq/rate_my_classes_gb" target="_blank" rel="noopener noreferrer">
                            <img
                                src={`${frontendBase}/github.png`}
                                alt="GitHub logo"
                                width="40"
                                height="40"
                                className="social-icon"
                            />
                        </a>
                        <a href="https://www.linkedin.com/in/minh-vu-a0617225a/" target="_blank" rel="noopener noreferrer">
                            <img
                                src={`${frontendBase}/linkedin.png`}
                                alt="LinkedIn logo"
                                width="40"
                                height="40"
                                className="social-icon"
                            />
                        </a>
                        <a href="mailto:minhvud3008@gmail.com" target="_blank" rel="noopener noreferrer">
                            <img
                                src={`${frontendBase}/gmail.png`}
                                alt="Gmail logo"
                                width="40"
                                height="40"
                                className="social-icon"
                            />
                        </a>
                    </div>

                    {/* Copyright */}
                    <p className="small text-muted mt-2 mb-0">
                        © 2025 <span className="text-primary fw-semibold">Rate_My_Classes_GB</span>. All rights reserved.
                    </p>
                </div>
            </footer>

            {/* Optional Custom CSS */}
            <style jsx>{`
                .social-icon {
                    transition: transform 0.2s ease, filter 0.2s ease;
                    filter: grayscale(100%);
                }
                .social-icon:hover {
                    transform: scale(1.1);
                    filter: none;
                }
            `}</style>
        </div>
    )
}
