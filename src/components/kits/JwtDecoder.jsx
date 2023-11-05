import { useEffect, useState } from "react";
import decodeJwt from "../../utils/decodeJwt";
import CopyBtn from "../CopyBtn";
import Output from "../Output";
import TextBox from "../TextBox";

export default function JwtDecoder() {
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

            const { header, payload } = decodeJwt(iv);

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
        <div className="flex flex-col md:flex-row h-full w-full ">
            <div className="form-control p-4 h-1/2 w-full md:h-full md:w-1/2">
                <TextBox
                    value={inputV}
                    onChange={onInput}
                    placeholder="Paste your token"
                />
            </div>
            <div className="form-control p-4 h-1/2 w-full md:h-full md:w-1/2">
                <Output
                    label="Header"
                    value={output.header}
                    error={output.error}
                    prettify={true}
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
