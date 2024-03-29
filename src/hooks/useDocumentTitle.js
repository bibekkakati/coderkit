import { useRef, useEffect } from "react";

// hook to manipulate site title and description
export default function useDocumentTitle(
    title,
    description,
    prevailOnUnmount = false
) {
    const defaultTitle = useRef(document.title);

    useEffect(() => {
        document.title = title;
    }, [title]);

    useEffect(() => {
        if (description) {
            document
                .querySelector('meta[name="description"]')
                .setAttribute("content", description);
        }
    }, [description]);

    useEffect(
        () => () => {
            if (!prevailOnUnmount) {
                document.title = defaultTitle.current;
            }
        },
        [prevailOnUnmount]
    );
}
