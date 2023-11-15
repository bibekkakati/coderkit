import PropTypes from "prop-types";
import { Suspense, lazy, useEffect, useRef, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import ScreenLoader from "../components/ScreenLoader";
import Topbar from "../components/Topbar";
import KitsList from "../constants/kitslist.json";
import useDocumentTitle from "../hooks/useDocumentTitle";

const KitView = lazy(() => import("../components/KitView"));
const Sidebar = lazy(() => import("../components/Sidebar"));
const ErrorPage = lazy(() => import("./ErrorPage"));

export default function AppPage() {
    const params = useParams();
    const kitname = params.kitname;

    if (!kitname) {
        const { link } = KitsList[0];
        return <Navigate to={`/app/${link}`} replace={true} />;
    }

    const kitdata = KitsList.find((kit) => kit.link === kitname && kit.active);
    if (!kitdata) {
        return (
            <Suspense fallback={<ScreenLoader />}>
                <ErrorPage />
            </Suspense>
        );
    }

    return <AppView kitdata={kitdata} />;
}

const AppView = ({ kitdata }) => {
    const { label, link: kitname, short_desc, meta_desc } = kitdata;
    useDocumentTitle(`${label} - ${short_desc}`, meta_desc);

    const navref = useRef(null);
    const [screenSize, setScreenSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });
    const [outletSize, setOutletSize] = useState({
        width: 0,
        height: 0,
    });

    useEffect(() => {
        if (navref.current) {
            const consumedWidth = navref.current.clientWidth;
            const consumedHeight = navref.current.clientHeight;
            const bodyWidth = screenSize.width;
            const bodyHeight = screenSize.height;

            // Set remaining dimension percentage
            setOutletSize({
                width: 100 - (consumedWidth / bodyWidth) * 100,
                height: 100 - (consumedHeight / bodyHeight) * 100,
            });
        }
    }, [screenSize]);

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
            <div className="flex flex-col divide-y divide-ck-primary w-screen h-screen">
                <div ref={navref}>
                    <Suspense>
                        <Topbar
                            kitname={kitname}
                            showLogoText={screenSize.width > 380}
                        />
                    </Suspense>
                </div>
                {outletSize.height ? (
                    <div
                        className="w-full"
                        style={{ height: outletSize.height + "%" }}
                    >
                        <Suspense fallback={<ScreenLoader />}>
                            <KitView kitname={kitname} />
                        </Suspense>
                    </div>
                ) : null}
            </div>
        );
    }

    return (
        <div className="flex flex-row divide-x divide-ck-primary">
            <div ref={navref} className="w-fit">
                <Suspense>
                    <Sidebar kitname={kitname} />
                </Suspense>
            </div>
            {outletSize.width ? (
                <div
                    className="h-screen"
                    style={{ width: outletSize.width + "%" }}
                >
                    <Suspense fallback={<ScreenLoader />}>
                        <KitView kitname={kitname} />
                    </Suspense>
                </div>
            ) : null}
        </div>
    );
};

AppView.propTypes = {
    kitdata: PropTypes.object,
};
