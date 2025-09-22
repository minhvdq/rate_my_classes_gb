import { frontendBase } from "../../utils/homeUrl";

export default function FooterPage() {
  return (
    <footer className="bg-white text-black pt-4 pb-3 border-top shadow-sm">
      <div className="container d-flex flex-column align-items-center text-center">
        <div className="d-flex gap-4 mt-2 mb-2">
          <a href="https://github.com/minhvdq/rate_my_classes_gb" target="_blank" rel="noopener noreferrer">
            <img
              src={`${frontendBase}/github.png`}
              alt="GitHub"
              width="32"
              height="32"
              className="social-icon"
            />
          </a>
          <a href="https://www.linkedin.com/in/minh-vu-a0617225a/" target="_blank" rel="noopener noreferrer">
            <img
              src={`${frontendBase}/linkedin.png`}
              alt="LinkedIn"
              width="32"
              height="32"
              className="social-icon"
            />
          </a>
          <a href="mailto:minhvud3008@gmail.com" target="_blank" rel="noopener noreferrer">
            <img
              src={`${frontendBase}/gmail.png`}
              alt="Gmail"
              width="32"
              height="32"
              className="social-icon"
            />
          </a>
        </div>
        <p className="small text-muted mt-1 mb-0">
          © 2025 <span className="text-primary fw-semibold">Rate_My_Classes_GB</span>. All rights reserved.
        </p>
      </div>

      <style>{`
        .social-icon {
          transition: transform 0.2s ease, filter 0.2s ease;
          filter: grayscale(100%);
        }
        .social-icon:hover {
          transform: scale(1.05);
          filter: none;
        }
      `}</style>
    </footer>
  );
}
