// app/routes.ts

import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("pages/home/page.tsx"),
    route("events", "features/events/page/events-page.tsx"),
    route("auth", "pages/auth/page.tsx", [
        index("pages/auth/outlets/form-view.tsx"),
        route("verify", "pages/auth/outlets/verify-view.tsx"),
    ]),
    route("about", "pages/about/page.tsx"),
    route(":userId/", "features/dashboard/page/dashboard-page.tsx", [
        index("features/dashboard/page/views/main-view.tsx"),
        route("profile", "features/dashboard/page/views/profile-view.tsx"),
        route("admin", "features/dashboard/page/views/admin-view.tsx"),
        route("admin/users", "features/dashboard/page/views/admin/users/users-view.tsx"),
        route("admin/users/:reqUserId", "features/dashboard/page/views/admin/users/user-view.tsx"),
        route("admin/events", "features/dashboard/page/views/admin/events/events-view.tsx"),
        route("admin/events/report", "features/dashboard/page/views/admin/events/report-view.tsx"),
        route("admin/events/:eventId", "features/dashboard/page/views/admin/events/event-view.tsx"),
        route("admin/developer", "features/dashboard/page/views/developer-view.tsx"),
        route("instructor", "features/dashboard/page/views/instructors/instructor-view.tsx"),
        route("help", "features/dashboard/page/views/help-view.tsx"),
    ]),
] satisfies RouteConfig;
