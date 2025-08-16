import { useContext } from 'react';
import { Link } from "react-router"

import { useAuth } from '@/features/auth/context/AuthContext';

export default function Header() {
    const { user } = useAuth()


    return (
        <header className="fixed top-0 z-30 w-full h-16 flex items-center justify-between bg-black/15 text-white/90 backdrop-blur-sm">
            <div className="flex items-center ml-40">
                <img src="/epcc.png" width={50} alt="ACM EPCC logo" />
                <h1 className="font-bold font-aldri text-[clamp(1rem,2vw,2rem)] ml-8">ACM EPCC</h1>
            </div>

            <nav>
                <ul className="flex font-quick items-center mr-40 gap-5">
                    <Link to="/" className=" py-0 text-white no-underline hover:underline transition-all duration-500">
                        Home
                    </Link>
                    <Link to="/events" className="  py-0 text-white no-underline hover:underline transition-all duration-500">
                        Events
                    </Link>
                    <Link to="/about" className=" py-0 text-white no-underline hover:underline transition-all duration-500">
                        About
                    </Link>

                    {user ? (
                        <Link
                            to={`/profile/${user.epccId}`}
                            className=" py-0 text-white no-underline hover:underline transition-all duration-500"
                        >
                            <p className="px-4 py-1 border-2 border-purple-600 rounded-lg hover:bg-purple-600 transition-all">
                                Profile
                            </p>
                        </Link>
                    ) : (
                        <Link
                            to="/auth"
                            className=" py-0 text-white no-underline hover:underline transition-all duration-500"
                        >
                            <p className="px-4 py-1 border-2 border-purple-600 rounded-lg hover:bg-purple-600 transition-all">
                                Join
                            </p>
                        </Link>
                    )}


                </ul>
            </nav>
        </header>

    );
}