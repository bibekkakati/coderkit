import { useEffect, useState } from "react";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import CopyBtn from "../CopyBtn";
import Output from "../Output";
import Select from "../Select";
import TextBox from "../TextBox";

const modes = [
    { value: 0, label: "Encode" },
    { value: 1, label: "Decode" },
];

export default function Base64Transformer() {
    useDocumentTitle(
        "Base64 Encoder/Decoder",
        "Effortlessly Encode and Decode Data with Our Base64 Encoder/Decoder Tool. Secure and Efficient Data Conversion for Developers."
    );

    const [mode, setMode] = useState(modes[0].value);
    const [inputV, setInputV] = useState("");
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

            let ov = "";
            if (mode == 0) {
                ov = window.btoa(iv);
            } else {
                ov = window.atob(iv);
            }

            return setOutput({
                value: ov,
                error: "",
            });
        } catch (error) {
            return setOutput({
                value: "",
                error:
                    mode == 0
                        ? `String is not valid for encoding`
                        : `String is not encoded correctly`,
            });
        }
    }, [inputV, mode]);

    const onModeChange = (e) => {
        setMode(e.target.value);
    };

    const onInput = (e) => {
        const iv = e.target.value || "";
        return setInputV(iv);
    };

    return (
        <div className="flex flex-row h-full w-full">
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
                    prettify={true}
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
