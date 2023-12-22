import { useState } from "react";
import useKitStorage from "../../hooks/useKitStorage.js";
import xmlToJson from "../../utils/xmlToJson.js";
import CheckBox from "../CheckBox.jsx";
import CopyBtn from "../CopyBtn.jsx";
import Output from "../Output.jsx";
import Select from "../Select.jsx";
import TextBox from "../TextBox.jsx";

const IndentingSpaceOptions = [
    { value: 2, label: "2 spaces" },
    { value: 3, label: "3 spaces" },
    { value: 4, label: "4 spaces" },
];

const Options = [
    {
        label: "Ignore PI tags",
        key: "ignorePiTags",
        checked: true,
        disabled: false,
    },
    {
        label: "Ignore attributes",
        key: "ignoreAttributes",
        checked: true,
        disabled: false,
    },
    {
        label: "Allow boolean attributes",
        key: "allowBooleanAttributes",
        checked: false,
        disabled: false,
    },
    {
        label: "Create text node",
        key: "alwaysCreateTextNode",
        checked: false,
        disabled: false,
    },
    {
        label: "Parse comments",
        key: "commentPropName",
        checked: false,
        disabled: false,
    },
    {
        label: "Remove leading 0s",
        key: "numberParseOptions.leadingZeros",
        checked: false,
        disabled: false,
    },
    {
        label: "Preserve order",
        key: "preserveOrder",
        checked: false,
        disabled: false,
    },
];

export default function XmlToJson() {
    const kitStorage = useKitStorage();
    const localData = {
        options: JSON.parse(kitStorage.get("options") || null),
        space: Number(kitStorage.get("space")),
        inputV: kitStorage.get("inputV"),
    };

    const [options, setOptions] = useState(localData.options || Options);
    const [indentingSpace, setIndentingSpace] = useState(
        localData.space || IndentingSpaceOptions[0].value
    );
    const [inputV, setInputV] = useState(localData.inputV || "");

    let value = "";
    let error = "";

    try {
        const iv = inputV.trim();

        if (iv.length) {
            const parseOptions = {};
            for (let i = 0; i < options.length; i++) {
                const { key, checked } = options[i];

                const keys = key.split(".");
                if (keys.length > 1) {
                    parseOptions[keys[0]] = {};
                    parseOptions[keys[0]][keys[1]] = checked;
                    continue;
                }

                parseOptions[key] = checked;
            }
            const ov = xmlToJson(iv, parseOptions);
            value = JSON.stringify(ov, null, indentingSpace);
        }
    } catch (e) {
        error = e.message;
    }

    const updateOptions = (e, index) => {
        const _options = [...options];
        _options[index].checked = e.target.checked;

        setOptions(_options);
        kitStorage.set(JSON.stringify(_options), "options");
    };

    const updateIndentingSpace = (e) => {
        const space = Number(e.target.value);
        setIndentingSpace(space);
        kitStorage.set(space, "space");
    };

    const onInput = (e) => {
        const iv = e.target.value;
        setInputV(iv);
        kitStorage.set(iv, "inputV");
    };

    return (
        <div className="flex flex-col md:flex-row h-full w-full ">
            <div className="form-control p-4 h-1/2 w-full md:h-full md:w-1/2">
                <TextBox
                    value={inputV}
                    onChange={onInput}
                    placeholder="Paste your JSON object"
                />
            </div>
            <div className="form-control p-4 h-1/2 w-full md:h-full md:w-1/2">
                <Output
                    value={value}
                    error={error}
                    prettify={true}
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
                            <Select
                                value={indentingSpace}
                                onChange={updateIndentingSpace}
                                options={IndentingSpaceOptions}
                            />
                            <CopyBtn value={value} />
                        </>
                    }
                />
            </div>
        </div>
    );
}
