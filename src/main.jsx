import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import KitView from "./components/KitView";
import "./highlightjs.css";
import "./index.css";
import AppPage from "./pages/app.jsx";
import HomePage from "./pages/home.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <HomePage />,
    },
    {
        path: "/app",
        element: <AppPage />,
        children: [
            {
                path: "/app/:kitname",
                element: <KitView />,
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
