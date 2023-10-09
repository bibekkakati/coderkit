import hljs from "highlight.js/lib/core";
import css from "highlight.js/lib/languages/css";
import javascript from "highlight.js/lib/languages/javascript";
import json from "highlight.js/lib/languages/json";
import xml from "highlight.js/lib/languages/xml";
import PropTypes from "prop-types";
import { useEffect, useRef } from "react";

const hljs_languages = {
    json: json,
    javascript: javascript,
    css: css,
    xml: xml,
};

export default function Output({
    label = "Output",
    value,
    error,
    actions,
    prettify = false,
    language,
}) {
    const outputRef = useRef("");

    useEffect(() => {
        if (outputRef.current && prettify) {
            try {
                // Check if value is in JSON format
                JSON.parse(value);
                hljs.registerLanguage("json", hljs_languages.json);
                outputRef.current.innerHTML = hljs.highlight(value, {
                    language: "json",
                }).value;
            } catch (error) {
                // Value can be Javascript, CSS, HTML etc
                if (language) {
                    hljs.registerLanguage(language, hljs_languages[language]);
                    outputRef.current.innerHTML = hljs.highlight(value, {
                        language: language,
                    }).value;
                } else {
                    outputRef.current.innerHTML = value || "";
                }
            }
        }
    }, [value, prettify, language]);

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
                    <code ref={outputRef}>{!prettify ? value : ""}</code>
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
    prettify: PropTypes.bool,
    language: PropTypes.string,
};
