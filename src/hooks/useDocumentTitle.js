import { useRef, useEffect } from "react";

function useDocumentTitle(title, description, prevailOnUnmount = false) {
    const defaultTitle = useRef(document.title);

    useEffect(() => {
        document.title = `CoderKit - ${title}`;
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

export default useDocumentTitle;
