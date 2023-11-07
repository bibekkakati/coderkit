import PropTypes from "prop-types";
import { Suspense, lazy } from "react";
import KitsList from "../constants/kitslist.json";
import ScreenLoader from "./ScreenLoader";

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

export default function KitView({ kitname }) {
    const kititem = KitsList.find(
        (kit) =>
            kit.link === kitname &&
            kit.component &&
            kitcomponents[kit.component]
    );
    const { component } = kititem;

    // Main render - Kit
    const Kit = kitcomponents[component];
    return (
        <Suspense fallback={<ScreenLoader />}>
            <Kit />
        </Suspense>
    );
}

KitView.propTypes = {
    kitname: PropTypes.string,
};
