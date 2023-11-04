import { Suspense, lazy } from "react";
import { useParams } from "react-router-dom";
import KitsList from "../constants/kitslist.json";
import ScreenLoader from "./ScreenLoader";
import useDocumentTitle from "../hooks/useDocumentTitle";

const kitcomponents = {
    JSONFormatter: lazy(() => import("./kits/JSONFormatter")),
    TextCaseConverter: lazy(() => import("./kits/TextCaseConverter")),
    Base64Transformer: lazy(() => import("./kits/Base64Transformer")),
    LoremIpsumGenerator: lazy(() => import("./kits/LoremIpsumGenerator")),
    JavascriptMinifier: lazy(() => import("./kits/JavascriptMinifier")),
    JavascriptBeautifier: lazy(() => import("./kits/JavascriptBeautifier")),
    CssBeautifier: lazy(() => import("./kits/CssBeautifier")),
    CssMinifier: lazy(() => import("./kits/CssMinifier")),
    HtmlMinifier: lazy(() => import("./kits/HtmlMinifier")),
    HtmlBeautifier: lazy(() => import("./kits/HtmlBeautifier")),
    JwtDecoder: lazy(() => import("./kits/JwtDecoder")),
};

export default function KitView() {
    const params = useParams();

    for (let i = 0; i < KitsList.length; i++) {
        const { label, meta_desc, short_desc, component, link, active } =
            KitsList[i];
        if (
            active &&
            link === params.kitname &&
            component &&
            kitcomponents[component]
        ) {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            useDocumentTitle(`${label} | ${short_desc}`, meta_desc);
            // Main render - Kit
            const Kit = kitcomponents[component];
            return (
                <Suspense fallback={<ScreenLoader />}>
                    <Kit />
                </Suspense>
            );
        }
    }

    // Error block
    return (
        <div className="hero min-h-screen">
            <div className="hero-content flex-col text-center">
                <img
                    src="/error-illustration.png"
                    className="h-[200px] w-[200px]"
                    alt="Error Illustration"
                />
                <div className="max-w-lg">
                    <p className="py-6 text-l">
                        Oh no! Seems like our intern is cooking something here
                        &nbsp;🍳
                    </p>
                </div>
            </div>
        </div>
    );
}
