import PropTypes from "prop-types";
import { lazy, useState } from "react";
import { Link } from "react-router-dom";
import KitsList from "../constants/kitslist.json";
import debounce from "../utils/debounce";
import Logo from "./Logo";

const iconcomponents = {};
for (let i = 0; i < KitsList.length; i++) {
    const { component, icon } = KitsList[i];
    iconcomponents[component] = lazy(() => import(`../assets/${icon}.jsx`)); // extension is required in dynamic imports
}

export default function Sidebar({ kitname }) {
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
        <div className="drawer drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-side">
                <ul className="menu px-4 w-72 min-h-full text-base-content">
                    <Logo />
                    <span className="divider lg:divider-vertical"></span>
                    <input
                        type="text"
                        placeholder="Search here"
                        className="input bg-base-100 input-sm rounded mb-4 mt-2"
                        onChange={debounce(handleSearch)}
                    />
                    {kitItems.map(({ label, link, component }, index) => {
                        const Icon = iconcomponents[component];
                        const linkClass =
                            kitname == link
                                ? "active rounded font-medium"
                                : "font-medium";
                        return (
                            <li key={index}>
                                <Link
                                    to={`/app/${link}`}
                                    aria-label={label}
                                    className={linkClass}
                                >
                                    <Icon />
                                    {label}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </div>
            <button className="btn btn-xs btn-primary rounded fixed pb-1 bottom-[-3px] left-[25px]">
                <Link to="/feedback" target="__blank" aria-label="Feedback">
                    Feedback
                </Link>
            </button>
            {/* <button className="btn btn-xs bg-ck-secondary hover:bg-ck-secondary rounded fixed text-black pb-1 bottom-[-3px] left-[110px]">
                <Link
                    to="https://www.buymeacoffee.com/bibekkakati"
                    target="__blank"
                    aria-label="Donate"
                >
                    Donate
                </Link>
            </button> */}
        </div>
    );
}

Sidebar.propTypes = {
    kitname: PropTypes.string,
};
