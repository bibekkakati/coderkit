import { useState } from "react";
import useKitStorage from "../../hooks/useKitStorage";
import minifyHtml from "../../utils/minifyHtml";
import CopyBtn from "../CopyBtn";
import Output from "../Output";
import TextBox from "../TextBox";

export default function HtmlMinifier() {
    const kitStorage = useKitStorage();
    const localData = {
        inputV: kitStorage.get("inputV"),
    };

    const [inputV, setInputV] = useState(localData.inputV || "");

    let value = "";
    let error = "";

    try {
        const iv = inputV.trim();
        if (iv.length) {
            value = minifyHtml(iv);
        }
    } catch (e) {
        error = e.message;
    }

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
                    placeholder="Paste your code"
                />
            </div>
            <div className="form-control p-4 h-1/2 w-full md:h-full md:w-1/2">
                <Output
                    value={value}
                    error={error}
                    prettify={true}
                    language="xml"
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
