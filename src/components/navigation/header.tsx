import { NavLink } from "react-router"
import { capitalize, cn } from "@/lib/utils"
import { useMe } from "@/features/users/hooks/me/queries"
import { useIsMobile } from "@/hooks/use-mobile"
import { MenuIcon } from "lucide-react"
import { Button } from "../primitives/button"
import { useAppNavigation } from "@/hooks"
import { useCurrentSemester } from '@/features/app/use-semester'

import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/primitives/sheet"
import { SemesterName } from "../text/semester-name"
import { Separator } from "../primitives/separator"


export default function Header() {
    const { toHome } = useAppNavigation()
    const isMobile = useIsMobile()
    const { data: semester } = useCurrentSemester()


    return (
        <header className="fixed top-0 z-50 w-full h-18 flex items-center justify-between bg-matte-black text-white/90 border-b-2 border-b-accent">
            <div className="flex items-center ml-5 md:ml-10 cursor-pointer" onClick={toHome}>
                <img src="/epcc.png" width={isMobile ? 35 : 50} alt="ACM EPCC logo" />
                <div className="ml-3 md:ml-5 flex h-full gap-2">
                    <h1 className="font-bold font-aldri text-xl md:text-3xl">
                        ACM EPCC
                    </h1>
                    <Separator orientation="vertical" className="h-full!" />
                    <SemesterName className="text-xl! md:text-3xl!" />
                </div>
            </div>

            <nav>
                {!isMobile ? <Links /> : <MobileNav />}
            </nav>
        </header>
    )
}


function Links() {
    const { data: user } = useMe()

    const pages = [
        { to: "/", text: "Home" },
        { to: "/events", text: "Events" },
        { to: "/about", text: "About" },
        { to: user ? `/${user.epccId}` : "/auth", text: user ? "Profile" : "Join Now" },
    ]

    return (
        <ul className="flex flex-col md:flex-row font-quick items-center mr-5 md:mr-40 gap-5">
            {pages.map((link, idx) => (
                <NavLink
                    key={link.text}
                    to={link.to}
                    className={({ isActive }) => cn("transition-all duration-300", isActive ? "underline" : "hover:underline")
                    }
                >
                    {link.text}
                </NavLink>
            ))}
        </ul>
    )
}




function MobileNav() {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline" size={'icon'} className="mr-5">
                    <MenuIcon />
                </Button>
            </SheetTrigger>
            <SheetContent className="max-w-[45vw]">
                <div className="mt-15">
                    <Links />
                </div>
                <SheetFooter>
                    <SheetClose asChild>
                        <Button variant="outline">Close</Button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}








