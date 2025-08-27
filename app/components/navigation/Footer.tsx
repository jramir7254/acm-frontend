import { Link } from "react-router"

export default function Footer() {
    return (
        <footer className="p-6 w-full h-full text-white flex flex-col items-center justify-center bg-matte-black z-10">

            <nav >
                <ul className="flex flex-col items-center justify-center">
                    <Link to='/' className="list-item">Home</Link>
                    <Link to='/events' className="list-item">Events</Link>
                    <Link to='/about' className="list-item">About</Link>
                </ul>
            </nav>
            <p className="">
                The El Paso County Community College District does not discriminate on the basis of race, color, national
                origin, religion, sex, age, disability and veteran status.
            </p>

        </footer>
    );
}