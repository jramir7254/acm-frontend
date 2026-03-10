import { Link, useLocation } from "react-router"


import { useIsMobile } from "@/hooks/use-mobile";
import { Bold, Paragraph, Text } from "../text/typography";


export default function Footer() {
    const isMobile = useIsMobile()
    const location = useLocation();

    const hideFooter = ['/auth', '/admin', '/8'].some(str => location.pathname.includes(str)) || isMobile


    if (hideFooter) return null
    return (
        <footer className="relative p-6 w-full h-[500px] text-white flex flex-col gap-5 items-center justify-center bg-matte-black z-10">
            <nav >
                <ul className="flex items-center justify-center gap-5">
                    <Link to='/' className="list-item"><Bold>Home</Bold></Link>
                    <Link to='/events' className="list-item"><Bold>Events</Bold></Link>
                    <Link to='/about' className="list-item"><Bold>About</Bold></Link>
                </ul>
            </nav>
            <Text className=" text-center">
                The EPCCCD does not discriminate on the basis of race, color, national
                origin, religion, sex, age, disability and veteran status.
            </Text>


            <div className="absolute bottom-5 left-5">
                <a href="https://www.jesusramirez.dev/">
                    <Paragraph >Created by: Jesus Ramirez</Paragraph>

                </a>
            </div>


            <div className="absolute bottom-5 right-5">
                <Paragraph>V 2.1.2</Paragraph>
            </div>

        </footer>
    );
}