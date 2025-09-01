// features/auth/auth-page.tsx
import React from "react";
import Page from "@/components/layout/page";
import { Outlet } from "react-router";

export default function AuthPage() {
    return (
        <Page className="flex bg-[#232325]">
            <aside className="w-1/2 h-full p-10  flex-col items-center justify-center hidden lg:flex">
                <div className="bg-matte-black rounded-2xl size-full p-10 shadow-lg shadow-black/50 ">
                    <h2 className="monts auth-sidebar__header">Welcome to the ACM Club at EPCC</h2>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse, necessitatibus.</p>
                </div>
            </aside>

            <div className="w-full lg:w-1/2 h-full flex items-center justify-center bg-matte-black md:rounded-2xl lg:bg-inherit">
                <Outlet />
            </div>
        </Page>
    );
}
