import { useEffect, useState } from 'react'
import { Page } from '@/components/layout/page'
import { Skeleton } from '@/components/primitives/skeleton'
import { useNavigate } from 'react-router'

export default function AboutPage() {
    const navigate = useNavigate()
    const [index, setIndex] = useState(0)

    // Each step has its own delay (in ms)f
    const timeline = [
        { message: '', delay: 5_000 },
        { message: "JK, I haven't finished this page yet.", delay: 10_000 },
        { message: 'You can go somewhere else now...', delay: 10_000 },
        { message: "I guess I'll just take you home then.", delay: 2_000 }, // 👈 shorter delay before navigate
        { navigateTo: '/' },
    ]

    useEffect(() => {
        if (index >= timeline.length) return

        const step = timeline[index]
        let timer: ReturnType<typeof setTimeout>

        if ('navigateTo' in step) {
            navigate(step.navigateTo as string)
        } else {
            timer = setTimeout(() => setIndex(index + 1), step.delay)
        }

        return () => clearTimeout(timer)
    }, [index, navigate, timeline])

    return (
        <Page className="w-screen h-[calc(100vh-64px)] relative bg-card p-10 md:p-20">
            <div className="flex flex-col space-y-10">
                <div className="flex md:flex-row flex-col space-x-0 md:space-x-5 space-y-5 justify-between">
                    <Skeleton className="w-[85vw] h-[20vh] md:block md:h-[50vh] md:w-[500px] rounded-xl" />
                    <Skeleton className="w-[85vw] h-[20vh] md:hidden rounded-xl" />
                    <Skeleton className="hidden md:block md:md:h-[50vh] md:w-[500px]  rounded-xl" />
                    <Skeleton className="hidden md:block md:md:h-[50vh] md:w-[500px]  rounded-xl" />
                </div>

                <div className="absolute inset-0 m-auto w-[300px] md:w-fit h-fit">
                    <h2 className="text-2xl md:text-5xl text-center font-aldri">
                        {'message' in timeline[index] ? timeline[index].message : ''}
                    </h2>
                </div>

                <div className="space-y-2">
                    <Skeleton className="h-6 w-full" />
                    <Skeleton className="h-6 w-full" />
                    <Skeleton className="h-6 w-full" />
                    <Skeleton className="h-6 w-[300px] md:w-[500px]" />
                    <Skeleton className="h-6 w-[250px]" />
                </div>
            </div>
        </Page>
    )
}
