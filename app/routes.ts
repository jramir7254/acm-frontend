// app/routes.ts

import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("features/home/home-page.tsx"),
    route("events", "features/events/page/events-page.tsx"),
    route("auth", "features/auth/page/auth-page.tsx", [
        index("features/auth/page/views/index-view.tsx"),
        route("verify", "features/auth/page/views/verify-view.tsx"),
    ]),
    route("about", "features/about/about-page.tsx"),
    route(":userId/", "features/dashboard/page/dashboard-page.tsx", [
        index("features/dashboard/page/views/main-view.tsx"),
        route("profile", "features/dashboard/page/views/profile-view.tsx"),
        route("admin", "features/dashboard/page/views/admin-view.tsx"),
        route("instructor", "features/dashboard/page/views/instructor-view.tsx"),
        route("help", "features/dashboard/page/views/help-view.tsx"),
    ]),
] satisfies RouteConfig;
