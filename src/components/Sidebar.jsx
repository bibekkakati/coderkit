import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import BeautifyIcon from "../assets/BeautifyIcon";
import JsonIcon from "../assets/JsonIcon";
import JwtIcon from "../assets/JwtIcon";
import LoremIcon from "../assets/LoremIcon";
import MinifyIcon from "../assets/MinifyIcon";
import TextCaseIcon from "../assets/TextCaseIcon";
import TransformIcon from "../assets/TransformIcon";
import Config from "../constants/config.json";
import KitsList from "../constants/kitslist.json";
import debounce from "../utils/debounce";

const iconcomponents = {
    JSONFormatter: <JsonIcon />,
    TextCaseConverter: <TextCaseIcon />,
    JavascriptMinifier: <MinifyIcon />,
    HtmlMinifier: <MinifyIcon />,
    CssMinifier: <MinifyIcon />,
    JavascriptBeautifier: <BeautifyIcon />,
    HtmlBeautifier: <BeautifyIcon />,
    CssBeautifier: <BeautifyIcon />,
    Base64Transformer: <TransformIcon />,
    JwtDecoder: <JwtIcon />,
    LoremIpsumGenerator: <LoremIcon />,
};

const FeedbackURL = Config.feedback_url;

export default function Sidebar() {
    const params = useParams();
    const activeLink = params?.kitname;
    const [kitItems, setKitItems] = useState(
        KitsList.filter((ki) => ki.active)
    );

    const handleSearch = (e) => {
        const v = e.target.value || "";
        if (!v) {
            return setKitItems(KitsList);
        }

        return setKitItems(
            KitsList.filter((i) =>
                i.label.toLowerCase().includes(v.toLowerCase())
            )
        );
    };

    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-side">
                <ul className="menu px-4 w-80 min-h-full text-base-content">
                    <div className="indicator">
                        <span className="indicator-item badge badge-xs badge-warning mt-1">
                            beta
                        </span>
                        <Link to="/" aria-label="CoderKit App">
                            <img
                                src="/text-logo.png"
                                className="h-9 w-32 mt-1"
                                alt="CoderKit"
                                loading="lazy"
                            />
                        </Link>
                    </div>
                    <span className="divider lg:divider-vertical"></span>
                    <input
                        type="text"
                        placeholder="Search here"
                        className="input bg-base-100 input-sm rounded mb-4 mt-2"
                        onChange={debounce(handleSearch)}
                    />
                    {kitItems.map(({ label, link, component }, index) => {
                        const linkClass = activeLink == link ? "active" : "";
                        return (
                            <li key={index}>
                                <Link
                                    to={`/app/${link}`}
                                    aria-label={label}
                                    className={linkClass}
                                >
                                    {iconcomponents[component]}
                                    {label}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </div>
            {FeedbackURL && (
                <button className="btn btn-xs btn-primary rounded fixed pb-1 bottom-[-3px] left-10">
                    <Link
                        to={FeedbackURL}
                        target="__blank"
                        aria-label="Feedback URL"
                    >
                        Feedback
                    </Link>
                </button>
            )}
        </div>
    );
}
