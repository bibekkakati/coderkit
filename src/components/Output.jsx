import PropTypes from "prop-types";
import { useEffect, useRef } from "react";
import jsonPretty from "../utils/jsonPretty";

export default function Output({
    label = "Output",
    value,
    error,
    actions,
    jsonPrettyCheck = false,
}) {
    const outputRef = useRef("");

    useEffect(() => {
        if (outputRef.current) {
            try {
                if (jsonPrettyCheck) {
                    JSON.parse(value);
                    outputRef.current.innerHTML = jsonPretty(value) || "";
                } else {
                    outputRef.current.innerHTML = value || "";
                }
            } catch (error) {
                outputRef.current.innerHTML = value || "";
            }
        }
    }, [value, jsonPrettyCheck]);

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
            <pre className="flex-1 textarea rounded h-full">
                {error ? (
                    <p className="p-1 text-error">{error}</p>
                ) : (
                    <code ref={outputRef}></code>
                )}
            </pre>
        </>
    );
}

Output.propTypes = {
    label: PropTypes.string,
    value: PropTypes.string,
    error: PropTypes.string,
    actions: PropTypes.element,
    jsonPrettyCheck: PropTypes.bool,
};
