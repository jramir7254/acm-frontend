


import {

    Outlet,

} from "react-router";


import Header from "@/components/navigation/header";
import Footer from "@/components/navigation/footer";
import Circuit from "@/components/primitives/circuit";






export default function App() {

    return (
        <div className="flex flex-col size-full h-screen">
            <Circuit
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    zIndex: -1,
                    width: "100vw",
                    height: "100%",
                    pointerEvents: "none",
                }}
            />
            <Header />
            <main className="flex flex-col ">

                <Outlet />
            </main>
            <Footer />
        </div>
    );
}




