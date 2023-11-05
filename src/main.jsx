import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ScreenLoader from "./components/ScreenLoader";
import "./highlightjs.css";
import "./index.css";
import {
    AppPage,
    ErrorPage,
    FeedbackPage,
    HomePage,
    PrivacyPolicyPage,
    TermsOfServicePage,
} from "./pages";

const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <Suspense fallback={<ScreenLoader />}>
                <HomePage />
            </Suspense>
        ),
        errorElement: <ErrorPage />,
    },
    {
        path: "/app/:kitname?",
        element: (
            <Suspense fallback={<ScreenLoader />}>
                <AppPage />
            </Suspense>
        ),
    },
    {
        path: "/feedback",
        element: (
            <Suspense fallback={<ScreenLoader />}>
                <FeedbackPage />
            </Suspense>
        ),
    },
    {
        path: "/terms-of-service",
        element: (
            <Suspense fallback={<ScreenLoader />}>
                <TermsOfServicePage />
            </Suspense>
        ),
    },
    {
        path: "/privacy-policy",
        element: (
            <Suspense fallback={<ScreenLoader />}>
                <PrivacyPolicyPage />
            </Suspense>
        ),
    },
    {
        path: "/error",
        element: (
            <Suspense fallback={<ScreenLoader />}>
                <ErrorPage />
            </Suspense>
        ),
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
