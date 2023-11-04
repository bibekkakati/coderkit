import { useEffect, useState } from "react";
import minifyJavascript from "../../utils/minifyJavascript";
import CheckBox from "../CheckBox";
import CopyBtn from "../CopyBtn";
import Output from "../Output";
import TextBox from "../TextBox";

export default function JavascriptMinifier() {
    const [options, setOptions] = useState([
        {
            label: "Mangle names",
            key: "mangle",
            checked: true,
            disabled: false,
        },
        {
            label: "Keep class names",
            key: "keep_classnames",
            checked: false,
            disabled: false,
        },
        {
            label: "Keep function names",
            key: "keep_fnames",
            checked: false,
            disabled: false,
        },
    ]);
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

                const minifyOptions = {};
                for (let i = 0; i < options.length; i++) {
                    const opt = options[i];
                    minifyOptions[opt.key] = opt.checked;
                }

                const ov = await minifyJavascript(iv, minifyOptions);

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
    }, [inputV, options]);

    const updateOptions = (e, index) => {
        const _options = [...options];
        _options[index].checked = e.target.checked;

        const isMangleFlag = _options[index].key === "mangle";
        const isFlagDeactived = !_options[index].checked;

        // Disable and unchecked other flags if mangle is unchecked
        if (isMangleFlag) {
            for (let i = 0; i < _options.length; i++) {
                const opt = _options[i];
                if (opt.key === "mangle") {
                    continue;
                }
                _options[i].disabled = isFlagDeactived;
                _options[i].checked = false;
            }
        }

        return setOptions(_options);
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
                    wrap={true}
                    actions={
                        <>
                            <div className="dropdown dropdown-end">
                                <select
                                    tabIndex={0}
                                    className="select select-xs rounded"
                                ></select>
                                <ul
                                    tabIndex={0}
                                    className="dropdown-content form-control z-[1] p-2 mt-2 shadow bg-base-200 rounded w-60"
                                >
                                    {options.map(
                                        (
                                            { key, label, checked, disabled },
                                            index
                                        ) => (
                                            <CheckBox
                                                key={key}
                                                label={label}
                                                onChange={(e) =>
                                                    updateOptions(e, index)
                                                }
                                                checked={checked}
                                                disabled={disabled}
                                            />
                                        )
                                    )}
                                </ul>
                            </div>
                            <CopyBtn value={output.value} />
                        </>
                    }
                />
            </div>
        </div>
    );
}
