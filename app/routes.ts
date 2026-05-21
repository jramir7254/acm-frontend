// app/routes.ts

import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
    layout("pages/public-layout.tsx", [

        index("pages/home/page.tsx"),
        route("events", "pages/events/page.tsx"),
        route("about", "pages/about/page.tsx"),
        route("auth", "pages/auth/page.tsx", [
            index("pages/auth/outlets/form-view.tsx"),
            route("verify", "pages/auth/outlets/verify-view.tsx"),
        ]),
        route("*", "pages/not-found.tsx")


    ]),
    route("dashboard", "pages/dashboard/page.tsx", [
        index("pages/dashboard/outlets/base/home-view.tsx"),
        route("settings", "pages/dashboard/outlets/base/profile-view.tsx"),
        route("help", "pages/dashboard/outlets/base/help-view.tsx"),

        route("instructor", "pages/dashboard/outlets/admin/instructor-view.tsx"),

        route("users", "pages/dashboard/outlets/admin/users/users-view.tsx"),
        route("users/:userId", "pages/dashboard/outlets/admin/users/user/user-view.tsx"),

        route("events", "pages/dashboard/outlets/admin/events/events-view.tsx"),
        route("events/:eventId", "pages/dashboard/outlets/admin/events/event/event-view.tsx"),

        route("dev", "pages/dashboard/outlets/admin/dev-view.tsx"),
        route("auth", "pages/dashboard/outlets/admin/auth-view.tsx"),


    ]),

] satisfies RouteConfig;
