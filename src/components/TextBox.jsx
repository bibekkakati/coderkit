import PropTypes from "prop-types";

export default function TextBox({
    label = "Input",
    value,
    onChange,
    placeholder,
    actions,
}) {
    return (
        <>
            <div className="flex flex-row justify-between">
                {label && (
                    <span className="label">
                        <span className="label-text font-bold">{label}</span>
                    </span>
                )}
                <div className="flex flex-row gap-1 items-center">
                    {actions}
                </div>
            </div>
            <textarea
                className="flex-1 textarea h-full w-full rounded resize-none"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            ></textarea>
        </>
    );
}

TextBox.propTypes = {
    label: PropTypes.string,
    value: PropTypes.string,
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
    actions: PropTypes.element,
};
