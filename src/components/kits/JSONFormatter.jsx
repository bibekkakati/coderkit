import { useEffect, useState } from "react";
import useDocumentTitle from "../../hooks/useDocumentTitle.js";
import CopyBtn from "../CopyBtn.jsx";
import Output from "../Output.jsx";
import Select from "../Select.jsx";
import TextBox from "../TextBox.jsx";

const sampleInput =
    '{"kit": "JSON Formatter", "app": "Coder Kit", "version": 1, "isLive": true}';
const indentingSpaceOptions = [
    { value: 2, label: "2 spaces" },
    { value: 3, label: "3 spaces" },
    { value: 4, label: "4 spaces" },
];

export default function JSONFormatter() {
    useDocumentTitle(
        "JSON Formatter/Validator",
        "Refine Your JSON Data with Our JSON Formatter/Validator Tool. Ensure Well-Structured and Error-Free Data for Seamless Integration."
    );

    const [indentingSpace, setIndentingSpace] = useState(
        indentingSpaceOptions[0].value
    );
    const [inputV, setInputV] = useState(sampleInput);
    const [output, setOutput] = useState({
        value: "",
        error: "",
    });

    useEffect(() => {
        try {
            const iv = inputV.trim();

            if (!iv.length) {
                return setOutput({
                    value: "",
                    error: "",
                });
            }

            const ov = JSON.parse(
                iv
                    .replaceAll("'", '"')
                    .replace(/(['"])?([a-zA-Z0-9_]+)(['"])?:([^/])/g, '"$2":$4')
            );

            return setOutput({
                value: JSON.stringify(ov, null, indentingSpace),
                error: "",
            });
        } catch (error) {
            return setOutput({
                value: "",
                error: error.message,
            });
        }
    }, [inputV, indentingSpace]);

    const updateIndentingSpace = (e) => {
        setIndentingSpace(Number(e.target.value));
    };

    const onInput = (e) => {
        const iv = e.target.value || "";
        return setInputV(iv);
    };

    return (
        <div className="flex flex-row h-full w-full ">
            <div className="form-control p-4 h-full w-1/2">
                <TextBox
                    value={inputV}
                    onChange={onInput}
                    placeholder="Paste your JSON object"
                />
            </div>
            <div className="form-control p-4 h-full w-1/2">
                <Output
                    value={output.value}
                    error={output.error}
                    prettify={true}
                    actions={
                        <>
                            <Select
                                value={indentingSpace}
                                onChange={updateIndentingSpace}
                                options={indentingSpaceOptions}
                            />
                            <CopyBtn value={output.value} />
                        </>
                    }
                />
            </div>
        </div>
    );
}
