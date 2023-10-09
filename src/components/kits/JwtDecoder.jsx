import TextBox from "../TextBox";
import Output from "../Output";
import { useEffect, useState } from "react";
import CopyBtn from "../CopyBtn";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import transformers from "../../utils/transformers";

export default function JwtDecoder() {
    useDocumentTitle(
        "JWT Decoder",
        "Decode JWT Tokens with Our JWT Decoder Tool"
    );

    const [inputV, setInputV] = useState(
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
    );
    const [output, setOutput] = useState({
        header: "",
        payload: "",
        error: "",
    });

    useEffect(() => {
        try {
            const iv = inputV.trim();

            if (!iv.length) {
                return setOutput({
                    header: "",
                    payload: "",
                    error: "",
                });
            }

            const { header, payload } = transformers.decodeJwt(iv);

            return setOutput({
                header: JSON.stringify(header, null, 2),
                payload: JSON.stringify(payload, null, 2),
                error: "",
            });
        } catch (error) {
            return setOutput({
                header: "",
                payload: "",
                error: error.message,
            });
        }
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
                    placeholder="Paste your token"
                />
            </div>
            <div className="form-control p-4 h-full w-1/2">
                <Output
                    label="Header"
                    value={output.header}
                    error={output.error}
                    prettify={true}
                    language="json"
                    actions={
                        <>
                            <CopyBtn value={output.header} />
                        </>
                    }
                />
                <Output
                    label="Payload"
                    value={output.payload}
                    error={output.error}
                    prettify={true}
                    language="json"
                    actions={
                        <>
                            <CopyBtn value={output.payload} />
                        </>
                    }
                />
            </div>
        </div>
    );
}