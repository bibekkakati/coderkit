/* eslint-disable react-refresh/only-export-components */
import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ScreenLoader from "./components/ScreenLoader";
import "./highlightjs.css";
import "./index.css";

const HomePage = lazy(() => import("./pages/home"));
const AppPage = lazy(() => import("./pages/app"));
const KitView = lazy(() => import("./components/KitView"));

const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <Suspense fallback={<ScreenLoader />}>
                <HomePage />
            </Suspense>
        ),
    },
    {
        path: "/app",
        element: (
            <Suspense fallback={<ScreenLoader />}>
                <AppPage />
            </Suspense>
        ),
        children: [
            {
                path: "/app/:kitname",
                element: (
                    <Suspense fallback={<ScreenLoader />}>
                        <KitView />
                    </Suspense>
                ),
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
