import { Link, useParams } from "react-router-dom";
import BeautifyIcon from "../assets/BeautifyIcon";
import JsonIcon from "../assets/JsonIcon";
import JwtIcon from "../assets/JwtIcon";
import LoremIcon from "../assets/LoremIcon";
import MinifyIcon from "../assets/MinifyIcon";
import TextCaseIcon from "../assets/TextCaseIcon";
import TransformIcon from "../assets/TransformIcon";
import KitsList from "../constants/kitslist.json";
import debounce from "../utils/debounce";
import { useState } from "react";

const iconcomponents = {
    JSONFormatter: <JsonIcon />,
    TextCaseConverter: <TextCaseIcon />,
    JavascriptMinifier: <MinifyIcon />,
    JavascriptBeautifier: <BeautifyIcon />,
    Base64Transformer: <TransformIcon />,
    JWTDecoder: <JwtIcon />,
    LoremIpsumGenerator: <LoremIcon />,
};

export default function Sidebar() {
    const params = useParams();
    const activeLink = params?.kitname;
    const [kitItems, setKitItems] = useState(KitsList);

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
                <ul className="menu p-4 w-80 min-h-full text-base-content">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="input input-ghost input-sm rounded"
                        onChange={debounce(handleSearch)}
                    />
                    <div className="divider lg:divider-vertical"></div>
                    {kitItems.map(({ label, link, component }, index) => {
                        const linkClass = activeLink == link ? "active" : "";
                        return (
                            <li key={index}>
                                <Link to={`/app/${link}`} className={linkClass}>
                                    {iconcomponents[component]}
                                    {label}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
}
