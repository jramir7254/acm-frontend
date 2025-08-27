import { NavLink } from "react-router"
import { cn } from "@/lib/utils"
import { useMe } from "@/features/auth/hooks/use-me"
import { useIsMobile } from "@/hooks/use-mobile"
export default function Header() {
    const { data: user } = useMe()
    const isMobile = useIsMobile()


    const pages = [
        { to: "/", text: "Home" },
        { to: "/events", text: "Events" },
        { to: "/about", text: "About" },
        { to: user ? `/${user.epccId}` : "/auth", text: user ? "Profile" : "Join Now" },
    ]

    if (isMobile) return null

    return (
        <header className="fixed top-0 z-50 w-full h-16 flex items-center justify-between bg-matte-black text-white/90">
            <div className="flex items-center ml-40">
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
            </nav>
        </header>
    )
}

const MobileNav = () => {

}
