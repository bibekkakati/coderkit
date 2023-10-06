import { useEffect, useState } from "react";
import generateLoremIpsum from "../../utils/generateLoremIpsum";
import Output from "../Output";
import CopyBtn from "../CopyBtn";
import useDocumentTitle from "../../hooks/useDocumentTitle";

const defaultWordsCOunt = 100;
const maxWordsCount = 10000;

export default function LoremIpsumGenerator() {
    useDocumentTitle("Lorem Ipsum Generator");

    const [wordsCount, setWordsCount] = useState(defaultWordsCOunt);
    const [output, setOutput] = useState({
        value: "",
        error: "",
    });

    useEffect(() => {
        try {
            const ov = wordsCount ? generateLoremIpsum(wordsCount) : "";

            return setOutput({
                value: ov,
                error: "",
            });
        } catch (error) {
            return setOutput({
                value: "",
                error: "Unknown error",
            });
        }
    }, [wordsCount]);

    const onCountChange = (e) => {
        const v = e.target.value;
        if (v > 0 && v <= maxWordsCount) {
            return setWordsCount(Number(v));
        }
        if (v > maxWordsCount) {
            return setWordsCount(maxWordsCount);
        }
        if (v <= 0) {
            return setWordsCount("");
        }
    };

    return (
        <div className="flex flex-row h-full w-full divide-x divide-neutral">
            <div className="form-control p-4 h-full w-full">
                <Output
                    value={output.value}
                    error={output.error}
                    actions={
                        <>
                            <span className="label flex flex-row gap-2">
                                <span className="label-text">
                                    Number of words
                                </span>
                                <input
                                    type="number"
                                    className="input input-xs w-[80px] rounded font-bold"
                                    placeholder="number"
                                    value={wordsCount}
                                    onChange={onCountChange}
                                    min={3}
                                    max={maxWordsCount}
                                />
                            </span>
                            <CopyBtn value={output.value} />
                        </>
                    }
                />
            </div>
        </div>
    );
}
