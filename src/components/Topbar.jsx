import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import KitsList from "../constants/kitslist.json";
import Select from "./Select";
import Logo from "./Logo";

export default function Topbar({ kitname, showLogoText }) {
    const navigate = useNavigate();
    const kitItems = [];
    for (let i = 0; i < KitsList.length; i++) {
        const kit = KitsList[i];
        kitItems.push({ value: kit.link, label: kit.label });
    }

    const onChange = (e) => {
        navigate(`/app/${e.target.value}`);
    };

    return (
        <div className="navbar">
            <div className="flex-1">
                <Logo showLogoText={showLogoText} />
            </div>
            <div className="flex-none h-[20px]">
                <Select
                    value={kitname}
                    onChange={onChange}
                    options={kitItems}
                />
            </div>
        </div>
    );
}

Topbar.propTypes = {
    kitname: PropTypes.string,
    showLogoText: PropTypes.bool,
};
