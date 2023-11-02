import { Link } from "react-router-dom";
import useDocumentTitle from "../hooks/useDocumentTitle";

export default function HomePage() {
    useDocumentTitle(
        "Home Page",
        "Empower your coding journey with our all-in-one Developer Toolkit, designed to boost your productivity and streamline essential tasks"
    );

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row">
                <img
                    src="/logo-icon.png"
                    className="max-w-sm rounded-lg shadow-2xl"
                    loading="lazy"
                />
                <div>
                    <h1 className="text-5xl font-bold">Hello, Coders!</h1>
                    <p className="py-6">
                        Empower your coding journey with all-in-one Developer
                        Toolkit, designed to boost your productivity and
                        streamline essential tasks. 🚀
                    </p>
                    <Link to="/app" aria-label="CoderKit App">
                        <button className="btn btn-primary">Get Started</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
