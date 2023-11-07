import ScreenLoader from "../components/ScreenLoader";
import useDocumentTitle from "../hooks/useDocumentTitle";

export default function Feedback() {
    useDocumentTitle("Feedback");

    return (
        <iframe
            src="https://docs.google.com/forms/d/e/1FAIpQLSedKjfgFz9UYVlSqNjLv6AmAcQZTIH4pKxgITcFxtE1dd_h8w/viewform?embedded=true"
            width="100%"
            height="100%"
            className="w-screen h-screen"
        >
            <ScreenLoader />
        </iframe>
    );
}
