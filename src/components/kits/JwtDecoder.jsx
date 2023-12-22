import { useState } from "react";
import useKitStorage from "../../hooks/useKitStorage";
import decodeJwt from "../../utils/decodeJwt";
import CopyBtn from "../CopyBtn";
import Output from "../Output";
import TextBox from "../TextBox";

const sample =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";

export default function JwtDecoder() {
    const kitStorage = useKitStorage();
    const localData = {
        inputV: kitStorage.get("inputV"),
    };

    const [inputV, setInputV] = useState(localData.inputV || sample);

    let header = "";
    let payload = "";
    let error = "";

    try {
        const iv = inputV.trim();

        if (iv.length) {
            const d = decodeJwt(iv);
            header = JSON.stringify(d.header, null, 2);
            payload = JSON.stringify(d.payload, null, 2);
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
                    placeholder="Paste your token"
                />
            </div>
            <div className="form-control p-4 h-1/2 w-full md:h-full md:w-1/2">
                <Output
                    label="Header"
                    value={header}
                    error={error}
                    prettify={true}
                    actions={
                        <>
                            <CopyBtn value={header} />
                        </>
                    }
                />
                <Output
                    label="Payload"
                    value={payload}
                    error={error}
                    prettify={true}
                    actions={
                        <>
                            <CopyBtn value={payload} />
                        </>
                    }
                />
            </div>
        </div>
    );
}
