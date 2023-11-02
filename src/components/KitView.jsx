import { Suspense, lazy } from "react";
import { Link, useParams } from "react-router-dom";
import kitslist from "../constants/kitslist.json";
import Loader from "./Loader";

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

    for (let i = 0; i < kitslist.length; i++) {
        const { component, link, active } = kitslist[i];
        if (
            active &&
            link === params.kitname &&
            component &&
            kitcomponents[component]
        ) {
            // Main render - Kit
            const Kit = kitcomponents[component];
            return (
                <Suspense fallback={<Loader />}>
                    <Kit />
                </Suspense>
            );
        }
    }

    // Error block
    return (
        <div className="hero min-h-screen">
            <div className="hero-content text-center">
                <div className="max-w-lg">
                    <p className="py-6 text-l">
                        Oh no! Seems like our intern is cooking something here
                        &nbsp;🍳
                    </p>

                    <Link to="/app" aria-label="CoderKit App">
                        <button className="btn btn-primary btn-sm">Home</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
