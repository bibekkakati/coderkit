import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export default function Logo({ showLogoText = true }) {
    return (
        <div className="w-fit indicator ml-3">
            {/* {showLogoText ? (
                <span className="indicator-item indicator-middle badge badge-xs badge-neutral rounded font-bold mr-[-24px]">
                    beta
                </span>
            ) : null} */}
            <Link to="/" aria-label="Home">
                <div className="inline-flex items-center">
                    <img
                        src="/android-chrome-192x192.png"
                        className="h-[32px] w-[32px]"
                        alt="Logo"
                    />
                    {showLogoText ? (
                        <span className="ml-2 text-lg font-bold">CoderKit</span>
                    ) : null}
                </div>
            </Link>
        </div>
    );
}

Logo.propTypes = {
    showLogoText: PropTypes.bool,
};
