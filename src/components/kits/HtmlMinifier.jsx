import { useEffect, useState } from "react";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import minifyHtml from "../../utils/minifyHtml";
import CopyBtn from "../CopyBtn";
import Output from "../Output";
import TextBox from "../TextBox";

export default function HtmlMinifier() {
    useDocumentTitle(
        "HTML Minifier",
        "Optimize Your Website's HTML with Our HTML Minifier Tool. Reduce File Size and Boost Loading Speed for Improved Web Performance."
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

                const ov = minifyHtml(iv);

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
    }, [inputV]);

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
                    language="xml"
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
