import { useEffect, useState } from "react";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import TextBox from "../TextBox";
import Select from "../Select";
import Output from "../Output";
import CopyBtn from "../CopyBtn";
import codeMinifier from "../../utils/codeMinifier";

const modes = [{ value: "javascript", label: "Javascript" }];

export default function JavascriptMinifier() {
    useDocumentTitle("Code Minifier");

    const [mode, setMode] = useState(modes[0].value);
    const [options, setOptions] = useState({
        mangle: true,
        keep_classnames: false,
        keep_fnames: false,
    });
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

                const ov = await codeMinifier.javascript(iv, options);

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
    }, [inputV, mode]);

    const onModeChange = (e) => {
        setMode(e.target.value);
    };

    const onInput = (e) => {
        const iv = e.target.value || "";
        return setInputV(iv);
    };

    return (
        <div className="flex flex-row h-full w-full divide-x divide-neutral">
            <div className="form-control p-4 h-full w-1/2">
                <TextBox
                    value={inputV}
                    onChange={onInput}
                    placeholder="Paste your string"
                    actions={
                        <>
                            <Select
                                value={mode}
                                onChange={onModeChange}
                                options={modes}
                            />
                        </>
                    }
                />
            </div>
            <div className="form-control p-4 h-full w-1/2">
                <Output
                    value={output.value}
                    error={output.error}
                    actions={
                        <>
                            <CopyBtn value={output.value} />
                        </>
                    }
                />
            </div>
        </div>
    );
}
