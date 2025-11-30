import { NavLink } from "react-router"
import { cn } from "@/lib/utils"
import { useMe } from "@/features/auth/hooks/use-me"
import { useIsMobile } from "@/hooks/use-mobile"
import { MenuIcon } from "lucide-react"
import { useAppNavigation } from "@/hooks"


export default function Header() {
    const { data: user } = useMe()
    const { toHome } = useAppNavigation()
    const isMobile = useIsMobile()


    const pages = [
        { to: "/", text: "Home" },
        { to: "/events", text: "Events" },
        { to: "/about", text: "About" },
        { to: user ? `/${user.epccId}` : "/auth", text: user ? "Profile" : "Join Now" },
    ]

    if (isMobile) return <MobileNav />

    return (
        <header className="fixed top-0 z-50 w-full h-18 flex items-center justify-between bg-matte-black text-white/90 border-b-2 border-b-accent">
            <div className="flex items-center ml-40" onClick={toHome}>
                <img src="/epcc.png" width={50} alt="ACM EPCC logo" />
                <h1 className="font-bold font-aldri text-[clamp(1rem,2vw,2rem)] ml-8">
                    ACM EPCC
                </h1>
            </div>

            <nav>
                <ul className="flex font-quick items-center mr-40 gap-5">
                    {pages.map((link, idx) => {
                        const isLast = idx === pages.length - 1
                        return (
                            <NavLink
                                key={link.text}
                                to={link.to}
                                className={({ isActive }) =>
                                    cn(
                                        "transition-all duration-300",
                                        isActive
                                            ? "underline"
                                            : "hover:underline"
                                    )
                                }
                            >
                                {link.text}
                            </NavLink>
                        )
                    })}
                </ul>
            </nav>
        </header>
    )
}


import { createPortal } from 'react-dom';
// const mainLayout = document.getElementById('main-layout');


const MobileNav = () => {

    const [collapsed, setCollapsed] = useState(true)

    return (
        <header className="fixed top-0 z-50 w-full h-16 flex items-center justify-between bg-matte-black text-white/90 border-b-2 border-b-accent">
            <div className="flex items-center ml-5">
                <img src="/epcc.png" width={50} alt="ACM EPCC logo" />
                <h1 className="font-bold font-aldri text-[clamp(1rem,2vw,2rem)] ml-5">
                    ACM EPCC
                </h1>
            </div>

            <nav>
                <div className="mr-5">
                    <MenuIcon onClick={() => setCollapsed(!collapsed)} />
                    {!collapsed && createPortal(
                        <MobileNavSidabar />,
                        document.body
                    )}

                </div>
            </nav>
        </header>
    )
}

import { useState } from "react"

const MobileNavSidabar = () => {
    const { data: user } = useMe()
    const pages = [
        { to: "/", text: "Home" },
        { to: "/events", text: "Events" },
        { to: "/about", text: "About" },
        { to: user ? `/${user.epccId}` : "/auth", text: user ? "Profile" : "Join Now" },
    ]
    return (
        <aside className="w-[150px] fixed top-16 right-0 h-full bg-background border-l-2 border-l-accent z-50">
            <ul className="mt-5 flex flex-col font-quick items-center gap-5 size-full">
                {pages.map((link, idx) => {
                    const isLast = idx === pages.length - 1
                    return (
                        <NavLink
                            key={link.text}
                            to={link.to}
                            className={({ isActive }) =>
                                cn(
                                    "transition-all duration-300",
                                    isLast
                                        ? isActive
                                            ? "bg-white/70 text-white px-5 py-1 rounded-xl"
                                            : "bg-white text-black px-5 py-1 rounded-xl hover:bg-gray-200"
                                        : isActive
                                            ? "underline"
                                            : "hover:underline"
                                )
                            }
                        >
                            {link.text}
                        </NavLink>
                    )
                })}
            </ul>
        </aside>


    )
}
