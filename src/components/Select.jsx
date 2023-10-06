import PropTypes from "prop-types";

export default function Select({ onChange, value, options }) {
    return (
        <select
            className="select select-xs btn-bordered rounded"
            onChange={onChange}
            value={value}
        >
            {options.map(({ value, label }, i) => (
                <option key={i} value={value}>
                    {label}
                </option>
            ))}
        </select>
    );
}

Select.propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    options: PropTypes.arrayOf(
        PropTypes.shape({
            value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
            label: PropTypes.string,
        })
    ),
};
