// app/routes.ts

import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("features/home/Home.tsx"),
    route("events", "features/events/EventsPage.tsx"),
    route("auth", "features/auth/AuthPage.tsx"),
    route("about", "features/about/AboutPage.tsx"),
    route("profile/:userId", "features/dashboard/DashboardPage.tsx"),
] satisfies RouteConfig;
