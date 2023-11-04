import { useEffect, useState } from "react";
import beautifyJavascript from "../../utils/beautifyJavascript";
import CopyBtn from "../CopyBtn";
import Output from "../Output";
import Select from "../Select";
import TextBox from "../TextBox";

const indentingSpaceOptions = [
    { value: 2, label: "2 spaces" },
    { value: 3, label: "3 spaces" },
    { value: 4, label: "4 spaces" },
];

export default function JavascriptBeautifier() {
    const [indentingSpace, setIndentingSpace] = useState(
        indentingSpaceOptions[0].value
    );
    const [inputV, setInputV] = useState("");
    const [output, setOutput] = useState({
        value: "",
        error: "",
    });

    useEffect(() => {
        async function processInput() {
            try {
                const iv = inputV.trim();

                if (!iv.length) {
                    return setOutput({
                        value: "",
                        error: "",
                    });
                }

                const ov = beautifyJavascript(iv, indentingSpace);

                return setOutput({
                    value: ov,
                    error: "",
                });
            } catch (error) {
                return setOutput({
                    value: "",
                    error: error.message,
                });
            }
        }
        processInput();
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
                    placeholder="Paste your code"
                />
            </div>
            <div className="form-control p-4 h-full w-1/2">
                <Output
                    value={output.value}
                    error={output.error}
                    prettify={true}
                    language="javascript"
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
