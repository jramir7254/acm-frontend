import { Link, useLocation } from "react-router"
import { useIsMobile } from "@/hooks/use-mobile";
export default function Footer() {
    const isMobile = useIsMobile()
    const location = useLocation();

    const hideFooter = ['/auth', '/admin', '/888'].some(str => location.pathname.includes(str)) || isMobile


    if (hideFooter) return null
    return (
        <footer className="p-6 w-full h-fit text-white flex flex-col items-center justify-center bg-matte-black z-10">

            <nav >
                <ul className="flex flex-col items-center justify-center">
                    <Link to='/' className="list-item">Home</Link>
                    <Link to='/events' className="list-item">Events</Link>
                    <Link to='/about' className="list-item">About</Link>
                </ul>
            </nav>
            <p className="text-sm text-center">
                The EPCCCD does not discriminate on the basis of race, color, national
                origin, religion, sex, age, disability and veteran status.
            </p>

        </footer>
    );
}