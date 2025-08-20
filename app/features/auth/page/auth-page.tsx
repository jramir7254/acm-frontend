// features/auth/auth-page.tsx
import React from "react";
import Page from "@/components/layout/page";
import { Outlet } from "react-router";

export default function AuthPage() {
    return (
        <Page className="flex">
            <aside className="w-2/5 h-full bg-atom-bg-secondary flex flex-col items-center justify-center">
                <h2 className="monts auth-sidebar__header">Welcome to the ACM Club at EPCC</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse, necessitatibus.</p>
            </aside>

            <div className="w-3/5 h-full flex items-center justify-center bg-[#1c1d20]">
                <Outlet />
            </div>
        </Page>
    );
}
