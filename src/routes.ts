// app/routes.ts

import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("pages/home/page.tsx"),
    route("events", "pages/events/page.tsx"),
    route("auth", "pages/auth/page.tsx", [
        index("pages/auth/outlets/form-view.tsx"),
        route("verify", "pages/auth/outlets/verify-view.tsx"),
    ]),
    route("about", "pages/about/page.tsx"),
    route(":userId/", "pages/dashboard/page.tsx", [
        index("pages/dashboard/outlets/base/home-view.tsx"),
        route("profile", "pages/dashboard/outlets/base/profile-view.tsx"),

        // route("admin", "features/dashboard/page/views/admin-view.tsx"),

        route("admin/users", "pages/dashboard/outlets/admin/users/users-view.tsx"),
        route("admin/users/:reqUserId", "pages/dashboard/outlets/admin/users/user/user-view.tsx"),

        route("admin/events", "pages/dashboard/outlets/admin/events/events-view.tsx"),
        // route("admin/events/report", "features/dashboard/page/views/admin/events/report-view.tsx"),
        route("admin/events/:eventId", "pages/dashboard/outlets/admin/events/event/event-view.tsx"),


        route("auth", "pages/dashboard/outlets/admin/auth-view.tsx"),
        route("instructor", "pages/dashboard/outlets/admin/instructor-view.tsx"),
        route("help", "pages/dashboard/outlets/base/help-view.tsx"),
    ]),
] satisfies RouteConfig;
