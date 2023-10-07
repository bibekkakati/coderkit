import PropTypes from "prop-types";
import { useState } from "react";
import CopyIcon from "../assets/CopyIcon";
import copyToClipboard from "../utils/copyToClipboard";

export default function CopyBtn({ value }) {
    const [tooltip, setTooltip] = useState({
        color: "neutral",
        text: "copy",
    });

    const copycontent = async () => {
        const ok = await copyToClipboard(value || "");
        setTooltip({
            color: ok ? "success" : "error",
            text: ok ? "copied" : "failed",
        });

        setTimeout(() => {
            setTooltip({
                color: "neutral",
                text: "copy",
            });
        }, 1500);
    };

    return (
        <div
            className={`tooltip tooltip-bottom tooltip-${tooltip.color}`}
            data-tip={tooltip.text}
        >
            <button
                className={`btn btn-xs btn-ghost rounded`}
                onClick={copycontent}
            >
                <CopyIcon />
            </button>
        </div>
    );
}

CopyBtn.propTypes = {
    value: PropTypes.string,
};
