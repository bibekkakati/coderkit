import { Link } from "react-router-dom";
import useDocumentTitle from "../hooks/useDocumentTitle";

export default function ErrorPage() {
    useDocumentTitle("Page not found");

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col w-1/2 text-center">
                <img
                    src="/error-page.png"
                    className="h-[160px] w-[160px]"
                    alt="Page Not Found"
                />
                <p className="text-base font-semibold">404</p>
                <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-5xl">
                    Page not found
                </h1>
                <p className="mt-4 leading-7 text-base-content">
                    Sorry, we couldn&apos;t find the page you&apos;re looking
                    for.
                </p>
                <div className="mt-4 flex items-center justify-center gap-x-3">
                    <Link to="/" aria-label="Home">
                        <button
                            type="button"
                            className="btn btn-outline btn-sm rounded"
                        >
                            Home
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
