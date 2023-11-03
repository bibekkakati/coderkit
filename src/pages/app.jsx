import { useEffect, useRef, useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import useDocumentTitle from "../hooks/useDocumentTitle";

export default function AppPage() {
    useDocumentTitle("Kit View");

    const sidebarRef = useRef("");
    const [screenSize, setScreenSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });
    const [outletWidth, setOutletWidth] = useState(0);

    useEffect(() => {
        if (sidebarRef.current) {
            const consumedWidth = sidebarRef.current.clientWidth;
            const bodyWidth = screenSize.width;
            // Set remaining width percentage
            setOutletWidth(100 - (consumedWidth / bodyWidth) * 100);
        }
    }, [screenSize.width]);

    useEffect(() => {
        const handleResize = () => {
            setScreenSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        window.addEventListener("resize", handleResize);

        // Clean up the event listener when the component unmounts
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    if (screenSize.width < 1024) {
        return (
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col text-center">
                    <img
                        src="/screen-size.png"
                        className="h-[200px] w-[200px]"
                        alt="Screen Size"
                    />
                    <div>
                        <p className="py-6">
                            Oops! We are not supporting smaller screen sizes.
                            Please use a bigger screen.
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-row divide-x divide-ck-primary">
            <div ref={sidebarRef} className="w-fit">
                <Sidebar />
            </div>
            {outletWidth ? (
                <div className="h-screen" style={{ width: outletWidth + "%" }}>
                    <Outlet />
                </div>
            ) : null}
        </div>
    );
}
