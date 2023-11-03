import { Link } from "react-router-dom";

export default function Error() {
    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col w-1/2 text-center">
                <img
                    src="/error-page.png"
                    className="h-[200px] w-[200px]"
                    alt="Page Not Found"
                />
                <div>
                    <p className="py-6">
                        Oops! It seems you have taken a wrong turn. Our digital
                        map must be experiencing a glitch, or the page you are
                        looking for is off on a coffee break. Either way, do not
                        worry, you are not lost in cyberspace.
                    </p>
                    <Link to="/app" aria-label="CoderKit App">
                        <button className="btn btn-primary btn-sm">
                            Let&apos;s get back on track
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
