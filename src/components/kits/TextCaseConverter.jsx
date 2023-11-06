import { useEffect, useState } from "react";
import textCaseConverters from "../../utils/textCaseConverters";
import CopyBtn from "../CopyBtn";
import Output from "../Output";
import Select from "../Select";
import TextBox from "../TextBox";
import useKitStorage from "../../hooks/useKitStorage";

const sampleInput = "THE QUICK brown fox";
const caseOptions = [
    {
        value: "lowercase",
        label: "lowercase",
        convert: textCaseConverters.toLowerCase,
    },
    {
        value: "uppercase",
        label: "UPPERCASE",
        convert: textCaseConverters.toUpperCase,
    },
    {
        value: "sentencecase",
        label: "Sentence case",
        convert: textCaseConverters.toSentenceCase,
    },
    {
        value: "titlecase",
        label: "Title Case",
        convert: textCaseConverters.toTitleCase,
    },
    {
        value: "camelcase",
        label: "camelCase",
        convert: textCaseConverters.toCamelCase,
    },
    {
        value: "pascalcase",
        label: "PascalCase",
        convert: textCaseConverters.toPascalCase,
    },
    {
        value: "snakecase",
        label: "snake_case",
        convert: textCaseConverters.toSnakeCase,
    },
    {
        value: "kebabcase",
        label: "kebab-case",
        convert: textCaseConverters.toKebabCase,
    },
    {
        value: "togglecase",
        label: "ToGgLe CaSe",
        convert: textCaseConverters.toToggleCase,
    },
];

export default function TextCaseConverter() {
    const kitStorage = useKitStorage();
    const localData = {
        textCase: kitStorage.get("textCase"),
        inputV: kitStorage.get("inputV"),
    };

    const [textCase, setTextCase] = useState(
        localData.textCase || caseOptions[0].value
    );
    const [inputV, setInputV] = useState(localData.inputV || sampleInput);
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

            const ov = caseOptions
                .find(({ value }) => value === textCase)
                .convert(iv);

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
    }, [inputV, textCase]);

    const updateTextCase = (e) => {
        const tc = e.target.value;
        setTextCase(tc);
        kitStorage.set(tc, "textCase");
    };

    const onInput = (e) => {
        const iv = e.target.value || "";
        setInputV(iv);
        kitStorage.set(iv, "inputV");
    };

    return (
        <div className="flex flex-col md:flex-row h-full w-full ">
            <div className="form-control p-4 h-1/2 w-full md:h-full md:w-1/2">
                <TextBox
                    value={inputV}
                    onChange={onInput}
                    placeholder="Paste your text here"
                />
            </div>
            <div className="form-control p-4 h-1/2 w-full md:h-full md:w-1/2">
                <Output
                    value={output.value}
                    error={output.error}
                    prettify={true}
                    wrap={true}
                    actions={
                        <>
                            <Select
                                value={textCase}
                                onChange={updateTextCase}
                                options={caseOptions.map(
                                    ({ value, label }) => ({ value, label })
                                )}
                            />
                            <CopyBtn value={output.value} />
                        </>
                    }
                />
            </div>
        </div>
    );
}
