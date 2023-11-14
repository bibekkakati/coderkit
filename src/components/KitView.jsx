import PropTypes from "prop-types";
import { Suspense, lazy } from "react";
import KitsList from "../constants/kitslist.json";
import ScreenLoader from "./ScreenLoader";

const kitcomponents = {};
for (let i = 0; i < KitsList.length; i++) {
    const { component } = KitsList[i];
    kitcomponents[component] = lazy(() => import(`./kits/${component}.jsx`)); // extension is required in dynamic imports
}

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
