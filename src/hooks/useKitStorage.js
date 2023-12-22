import { useParams } from "react-router-dom";

// hook for local storage of kit state
export default function useKitStorage() {
    const params = useParams();
    const kitname = params.kitname || "";

    return {
        get: (identifier = "") => {
            const key = kitname ? `${kitname}:${identifier}` : identifier;
            return window?.localStorage?.getItem(key) || "";
        },
        set: (str, identifier = "") => {
            const key = kitname ? `${kitname}:${identifier}` : identifier;
            return window?.localStorage?.setItem(key, str);
        },
    };
}
