import { lazy } from "react";

export const HomePage = lazy(() => import("./Home"));
export const AppPage = lazy(() => import("./App"));
export const FeedbackPage = lazy(() => import("./Feedback"));
export const ErrorPage = lazy(() => import("./Error"));
export const TermsOfServicePage = lazy(() => import("./TermsOfService"));
export const PrivacyPolicyPage = lazy(() => import("./PrivacyPolicy"));
