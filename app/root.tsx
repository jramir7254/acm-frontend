import "./app.css";

import type { Route } from "./+types/root";

import {
    isRouteErrorResponse,
    Links,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
    useLocation,
} from "react-router";

import AppProviders from "./providers/app-providers";

import Header from "./components/navigation/header";
import Circuit from "./components/primitives/circuit";
import Footer from "./components/navigation/footer";



export const links: Route.LinksFunction = () => [
    { rel: "preconnect", href: "https://fonts.googleapis.com" },
    {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
    },
    {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
    },
    {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Aldrich&family=Bebas+Neue&family=Funnel+Sans:ital,wght@0,300..800;1,300..800&family=Julius+Sans+One&family=Montserrat:ital,wght@0,100..900;1,100..900&family=Nunito:ital,wght@0,200..1000;1,200..1000&family=Open+Sans:ital,wght@0,300..800;1,300..800&family=Quicksand:wght@300..700&family=Roboto:ital,wght@0,100..900;1,100..900&family=Rubik:ital,wght@0,300..900;1,300..900&family=Share+Tech+Mono&family=Source+Code+Pro:ital,wght@0,200..900;1,200..900&family=Tektur:wght@400..900&family=Tomorrow:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
    }
];

export function Layout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className="dark">
            <head>
                <title>EPCC ACM Club</title>
                <meta charSet="utf-8" />
                <link rel="icon" type="image/x-icon" href="/epcc.png" />

                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <Meta />
                <Links />
            </head>
            <body>
                {children}
                <ScrollRestoration />
                <Scripts />
            </body>
        </html>
    );
}


export default function App() {

    return (
        <AppProviders>
            <div className="flex flex-col min-h-screen " >
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
                <main className="relative" id="main-layout">
                    <Outlet />
                </main>
                <Footer />
            </div>
        </AppProviders>
    );
}







export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
    let message = "Oops!";
    let details = "An unexpected error occurred.";
    let stack: string | undefined;

    if (isRouteErrorResponse(error)) {
        message = error.status === 404 ? "404" : "Error";
        details =
            error.status === 404
                ? "The requested page could not be found."
                : error.statusText || details;
    } else if (import.meta.env.DEV && error && error instanceof Error) {
        details = error.message;
        stack = error.stack;
    }

    return (
        <main className="pt-16 p-4 container mx-auto">
            <h1>{message}</h1>
            <p>{details}</p>
            {stack && (
                <pre className="w-full p-4 overflow-x-auto">
                    <code>{stack}</code>
                </pre>
            )}
        </main>
    );
}
