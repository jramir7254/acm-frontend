export default function PageLayout({ title, children }) {
    return (
        <div>
            <header>
                <h1>{title}</h1>
            </header>
            <main>{children}</main>
            <footer>© 2025</footer>
        </div>
    );
}
