import { lazy } from "react";

export const HomePage = lazy(() => import("./HomePage"));
export const AppPage = lazy(() => import("./AppPage"));
export const FeedbackPage = lazy(() => import("./FeedbackPage"));
export const ErrorPage = lazy(() => import("./ErrorPage"));
export const TermsOfServicePage = lazy(() => import("./TermsOfServicePage"));
export const PrivacyPolicyPage = lazy(() => import("./PrivacyPolicyPage"));
