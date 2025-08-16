
import { Link } from "react-router"


export default function Footer() {
    return (
        <footer className="font-monts backdrop-blur-[10px] bg-gradient-to-r from-[rgba(99,110,155,0.15)] via-[rgba(255,255,255,0.15)] to-[rgba(62,93,161,0.15)] rounded-[12px] shadow-lg p-6 w-full text-white flex flex-col items-center justify-center">
            <nav >
                <ul className="flex flex-col items-center justify-center">
                    <Link to='/' className="list-item">Home</Link>
                    <Link to='/Events' className="list-item">Events</Link>
                    <Link to='/Leadership' className="list-item">About</Link>
                    {/* <Link to='/profile:userID' className="list-item">Join</Link> */}
                </ul>
            </nav>
            <p className="epcc-disclaimer">
                The El Paso County Community College District does not discriminate on the basis of race, color, national
                origin, religion, sex, age, disability and veteran status.
            </p>
        </footer>
    );
}