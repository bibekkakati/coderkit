import { Link } from "react-router-dom";
import useDocumentTitle from "../hooks/useDocumentTitle";

export default function HomePage() {
    useDocumentTitle("Home Page");
    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content text-center">
                <div className="max-w-md">
                    <h1 className="text-5xl font-bold">Hello, Coders!</h1>
                    <p className="py-6">
                        Empower your coding journey with our all-in-one
                        Developer Toolkit, designed to boost your productivity
                        and streamline essential tasks. 🚀
                    </p>
                    <button className="btn btn-primary">
                        <Link to="/app">Get Started</Link>
                    </button>
                </div>
            </div>
        </div>
    );
}
