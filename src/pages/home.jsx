import { Link } from "react-router-dom";
import useDocumentTitle from "../hooks/useDocumentTitle";

export default function HomePage() {
    useDocumentTitle(
        "Developer's Companion",
        "Empower your coding journey with our all-in-one Developer Toolkit, designed to boost your productivity and streamline essential tasks"
    );

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-row w-1/2 gap-10">
                <img
                    src="/android-chrome-512x512.png"
                    className="h-[220px] w-[220px]"
                    alt="CoderKit"
                />
                <div>
                    <h1 className="text-5xl font-bold">Hello, Coders!</h1>
                    <p className="py-6">
                        Empower your coding journey with all-in-one Developer
                        Toolkit, designed to boost your productivity and
                        streamline essential tasks. 🚀
                    </p>
                    <Link to="/app" aria-label="CoderKit App">
                        <button className="btn btn-outline">View Tools</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
