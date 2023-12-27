import { Link } from "react-router-dom";
import useDocumentTitle from "../hooks/useDocumentTitle";
import KitsList from "../constants/kitslist.json";

export default function HomePage() {
    useDocumentTitle(
        "Streamlining Development with Essential Tools",
        "Empower your coding journey with our all-in-one Developer Toolkit, designed to boost your productivity and streamline essential tasks"
    );
    return (
        <div className="w-full px-4 lg:py-14">
            <div className="mx-auto max-w-7xl lg:grid lg:grid-cols-12 lg:gap-x-8 py-4 md:py-8 lg:py-12">
                <Hero />
            </div>
            <div
                id="tools"
                className="mx-auto mt-14 lg:mt-28 max-w-7xl lg:grid lg:grid-cols-12"
            >
                <KitsTable />
            </div>
            <div className="mx-auto mt-14 lg:mt-28 max-w-7xl lg:grid lg:grid-cols-12">
                <Features />
            </div>
            <div className="mx-auto mt-14 lg:mt-28 max-w-7xl lg:grid lg:grid-cols-12">
                <Footer />
            </div>
        </div>
    );
}

const Hero = () => (
    <>
        <div className="flex flex-col justify-center col-span-5 gap-y-6">
            <img
                src="/android-chrome-192x192.png"
                className="h-[42px] w-[42px]"
                alt="CoderKit"
            />
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
                Unleash Your Coding Superpowers with
                <span className="text-ck-primary"> CoderKit</span>
            </h1>
            <p className="text-lg">
                Empower your coding journey with all-in-one Developer Toolkit,
                designed to boost your productivity and streamline essential
                tasks 🚀
            </p>
            <div action="" className="flex items-start space-x-2">
                <Link to="/app" aria-label="View Tools">
                    <button className="btn btn-outline">View Tools</button>
                </Link>
                <Link
                    to="https://www.producthunt.com/posts/coderkit?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-coderkit"
                    target="_blank"
                >
                    <img
                        src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=431706&theme=light"
                        alt="CoderKit - Unleash Your Coding Superpowers | Product Hunt"
                        className="btn"
                    />
                </Link>
            </div>
        </div>
        <div className="flex flex-col justify-center col-span-7 lg:mt-0 md:mt-10 sm:mt-10 mt-10">
            <div className="mockup-browser border h-fit rounded-xl">
                <img className="w-full" src="/preview.png" alt="Preview" />
            </div>
        </div>
    </>
);

const KitsTable = () => (
    <div className="col-span-12 max-w-7xl">
        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
            <h1 className="text-2xl lg:text-3xl font-bold">
                🛠️ &nbsp;Meet the Tools
            </h1>
        </div>
        <div className="mt-6 flex flex-col">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle px-4 md:px-6 lg:px-8">
                    <div className="overflow-hidden border border-neutral rounded-md">
                        <table className="min-w-full">
                            <tbody className="divide-y divide-neutral">
                                {KitsList.map((kit) => (
                                    <tr
                                        key={kit.link}
                                        className="hover:bg-base-100"
                                    >
                                        <td className="whitespace-nowrap px-4 py-4 text-sm">
                                            <Link
                                                to={`/app/${kit.link}`}
                                                aria-label={kit.label}
                                                className="font-bold hover:text-ck-primary"
                                            >
                                                {kit.label}
                                            </Link>
                                            <p className="lg:hidden mt-2 whitespace-pre-wrap">
                                                {kit.short_desc}
                                            </p>
                                        </td>
                                        <td className="hidden lg:table-cell whitespace-nowrap px-4 py-4 text-sm">
                                            {kit.short_desc}
                                        </td>
                                        <td className="hidden md:block whitespace-nowrap px-4 py-4">
                                            <Link
                                                to={`/app/${kit.link}`}
                                                aria-label={kit.label}
                                            >
                                                <button className="btn btn-xs btn-outline rounded">
                                                    &gt;
                                                </button>
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

const Features = () => (
    <div className="col-span-12 max-w-7xl">
        <div className="grid grid-cols-1 gap-y-8 text-center sm:grid-cols-1 sm:gap-12 md:grid-cols-3 lg:grid-cols-3">
            <div>
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-base-100">
                    <svg
                        className="h-7 w-7"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                            d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
                        />
                    </svg>
                </div>
                <h3 className="mt-8 text-lg font-semibold">Data Security</h3>
                <p className="mt-4 text-sm">
                    Your data stays right where it belongs - on your website.
                    Our tools process data locally, ensuring maximum security.
                </p>
            </div>
            <div>
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-base-100">
                    <svg
                        className="h-7 w-7"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                            d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                    </svg>
                </div>
                <h3 className="mt-8 text-lg font-semibold">Fast and Easy</h3>
                <p className="mt-4 text-sm">
                    Brings all your essential tools together in a web
                    application for a seamless and efficient coding experience.
                </p>
            </div>
            <div>
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-base-100">
                    <svg
                        className="h-7 w-7"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                            d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                        />
                    </svg>
                </div>
                <h3 className="mt-8 text-lg font-semibold">
                    Toolbox of Possibilities
                </h3>
                <p className="mt-4 text-sm">
                    Offers a diverse range of tools, all in one window, to
                    tackle multiple tasks effortlessly.
                </p>
            </div>
        </div>
    </div>
);

const Footer = () => (
    <div className="col-span-12 max-w-7xl overflow-hidden py-8">
        <div className="mx-auto">
            <div className="flex flex-wrap items-center justify-between w-full">
                <div className="w-fit py-2 mx-auto md:mx-0">
                    <Link to="/" aria-label="Home">
                        <div className="inline-flex items-center">
                            <img
                                src="/android-chrome-192x192.png"
                                className="h-[42px] w-[42px]"
                                alt="CoderKit"
                            />
                            <span className="ml-4 text-lg font-bold">
                                CoderKit
                            </span>
                        </div>
                    </Link>
                </div>
                <div className="-mt-2 w-fit py-2 mx-auto md:mx-0">
                    <ul className="flex flex-wrap items-center">
                        <li className="px-5">
                            <Link
                                className="font-medium text-gray-600 hover:text-gray-700"
                                to="/privacy-policy"
                                aria-label="Privacy Policy"
                            >
                                Privacy Policy
                            </Link>
                        </li>
                        <li className="px-5">
                            <Link
                                className="font-medium text-gray-600 hover:text-gray-700"
                                to="/terms-of-service"
                                aria-label="Terms of Service"
                            >
                                Terms of Service
                            </Link>
                        </li>
                        <li className="px-5">
                            <Link
                                className="font-medium text-gray-600 hover:text-gray-700"
                                to="/feedback"
                                aria-label="Feedback"
                            >
                                Feedback
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
);
