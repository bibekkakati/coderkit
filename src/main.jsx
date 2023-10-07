import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./highlightjs.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/home.jsx";
import AppPage from "./pages/app.jsx";
import KitView from "./components/KitView";

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
