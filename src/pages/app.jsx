import { Suspense, lazy, useEffect, useRef, useState } from "react";
import { Outlet } from "react-router-dom";
import Loader from "../components/Loader";
import useDocumentTitle from "../hooks/useDocumentTitle";

const Sidebar = lazy(() => import("../components/Sidebar"));

export default function AppPage() {
    useDocumentTitle("Kit View");

    const sidebarRef = useRef("");
    const [outletWidth, setOutletWidth] = useState(0);

    useEffect(() => {
        if (sidebarRef.current) {
            const consumedWidth = sidebarRef.current.clientWidth;
            const bodyWidth = window.innerWidth;
            // Set remaining width percentage
            setOutletWidth(100 - (consumedWidth / bodyWidth) * 100);
        }
    }, []);

    return (
        <div className="flex flex-row divide-x divide-ck-primary">
            <div ref={sidebarRef} className="w-fit">
                <Suspense fallback={<Loader />}>
                    <Sidebar />
                </Suspense>
            </div>
            {outletWidth && (
                <div className="h-screen" style={{ width: outletWidth + "%" }}>
                    <Outlet />
                </div>
            )}
        </div>
    );
}
