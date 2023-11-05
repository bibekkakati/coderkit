import { useEffect, useState } from "react";
import generateLoremIpsum from "../../utils/generateLoremIpsum";
import CopyBtn from "../CopyBtn";
import Output from "../Output";

const defaultWordsCOunt = 100;
const maxWordsCount = 10000;

export default function LoremIpsumGenerator() {
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
        <div className="flex flex-col md:flex-row h-full w-full ">
            <div className="form-control p-4 h-full w-full">
                <Output
                    value={output.value}
                    error={output.error}
                    wrap={true}
                    actions={
                        <>
                            <span className="label flex flex-row gap-2">
                                <span className="label-text">
                                    Number of words
                                </span>
                                <input
                                    type="number"
                                    className="input input-xs w-[80px] bg-base-100 rounded font-bold"
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
