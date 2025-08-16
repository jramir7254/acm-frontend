export default function HeroSection() {
    return (
        <section className="flex flex-col items-center justify-center min-h-screen  select-none">
            <div className="flex flex-col items-center justify-center">
                <h1 className="text-slate-50 font-nunit text-3xl md:text-5xl font-semibold overflow-hidden whitespace-nowrap max-w-fit">
                    ACM Computer Science
                </h1>
                <h1 className="text-slate-50 font-nunit text-3xl md:text-5xl font-semibold overflow-hidden whitespace-nowrap max-w-fit delay-1000">
                    Club at EPCC
                </h1>
                <h2 className="mt-4 text-lg md:text-xl font-light tracking-wide text-slate-100">
                    Code. Create. Collaborate.
                </h2>
            </div>
        </section>
    )
}
