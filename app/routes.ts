// app/routes.ts

import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("features/home/Home.tsx"),
    route("events", "features/events/page/events-page.tsx"),
    route("auth", "features/auth/page/auth-page.tsx", [
        index("features/auth/page/views/index-view.tsx"),
        route("verify", "features/auth/page/views/verify-view.tsx"),
    ]),
    route("about", "features/about/AboutPage.tsx"),
    route("profile/:userId/", "features/dashboard/page/dashboard-page.tsx", [
        index("features/dashboard/page/views/profile-view.tsx"),
        route("settings", "features/dashboard/page/views/settings-view.tsx"),
        route("admin", "features/dashboard/page/views/admin-view.tsx"),
    ]),
] satisfies RouteConfig;
