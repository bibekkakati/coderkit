import PropTypes from "prop-types";

const CheckBox = ({ label, checked = false, onChange, disabled = false }) => {
    return (
        <label className="label">
            <span className="label-text">{label}</span>
            <input
                type="checkbox"
                checked={checked}
                className="checkbox checkbox-xs rounded"
                onChange={onChange}
                disabled={disabled}
            />
        </label>
    );
};

CheckBox.propTypes = {
    label: PropTypes.string,
    checked: PropTypes.bool,
    onChange: PropTypes.func,
    disabled: PropTypes.bool,
};

export default CheckBox;
