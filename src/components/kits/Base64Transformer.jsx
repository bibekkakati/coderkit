import { useState } from "react";
import useKitStorage from "../../hooks/useKitStorage";
import CopyBtn from "../CopyBtn";
import Output from "../Output";
import Select from "../Select";
import TextBox from "../TextBox";

const modes = [
    { value: "encode", label: "Encode" },
    { value: "decode", label: "Decode" },
];

export default function Base64Transformer() {
    const kitStorage = useKitStorage();
    const localData = {
        mode: kitStorage.get("mode"),
        inputV: kitStorage.get("inputV"),
    };

    const [mode, setMode] = useState(localData.mode || modes[0].value);
    const [inputV, setInputV] = useState(localData.inputV || "");

    let value = "";
    let error = "";

    try {
        const iv = inputV.trim();

        if (iv.length) {
            if (mode == "encode") {
                value = window.btoa(iv);
            } else {
                value = window.atob(iv);
            }
        }
    } catch (e) {
        error =
            mode == "encode"
                ? `String is not valid for encoding`
                : `String is not encoded correctly`;
    }

    const onModeChange = (e) => {
        const mode = e.target.value;
        setMode(mode);
        kitStorage.set(mode, "mode");
    };

    const onInput = (e) => {
        const iv = e.target.value || "";
        setInputV(iv);
        kitStorage.set(iv, "inputV");
    };

    return (
        <div className="flex flex-col md:flex-row h-full w-full">
            <div className="form-control p-4 h-1/2 w-full md:h-full md:w-1/2">
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
            <div className="form-control p-4 h-1/2 w-full md:h-full md:w-1/2">
                <Output
                    value={value}
                    error={error}
                    prettify={true}
                    wrap={true}
                    actions={
                        <>
                            <CopyBtn value={value} />
                        </>
                    }
                />
            </div>
        </div>
    );
}
