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
        route("admin/users", "features/dashboard/page/views/admin/users/users-view.tsx"),
        route("admin/users/:reqUserId", "features/dashboard/page/views/admin/users/user-view.tsx"),
        route("admin/events", "features/dashboard/page/views/admin/events/events-view.tsx"),
        route("admin/events/:eventId", "features/dashboard/page/views/admin/events/event-view.tsx"),
        route("admin/developer", "features/dashboard/page/views/developer-view.tsx"),
        route("instructor", "features/dashboard/page/views/instructors/instructor-view.tsx"),
        route("help", "features/dashboard/page/views/help-view.tsx"),
    ]),
] satisfies RouteConfig;
