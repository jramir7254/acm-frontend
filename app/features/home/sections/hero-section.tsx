import { Page } from "@/components/layout/page"

export default function HeroSection() {
    return (
        <Page className="flex flex-col items-center justify-center h-[calc(100vh-64px)] w-screen select-none">
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
        </Page>
    )
}
