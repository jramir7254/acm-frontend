import React, { useEffect, useState } from 'react'
import { Unfinished } from '@/components/layout/'
import Page from '@/components/layout/page'
import { Skeleton } from '@/components/primitives/skeleton'
import { useNavigate } from 'react-router'

export default function AboutPage() {
    const navigate = useNavigate()
    const [index, setIndex] = useState(0)

    // Each step has its own delay (in ms)
    const timeline = [
        { message: '', delay: 5_000 },
        { message: "JK, I haven't finished this page yet.", delay: 10_000 },
        { message: 'You can go somewhere else now...', delay: 10_000 },
        { message: "I guess I'll just take you home.", delay: 2_000 }, // 👈 shorter delay before navigate
        { navigateTo: '/' },
    ]

    useEffect(() => {
        if (index >= timeline.length) return

        const step = timeline[index]
        let timer: ReturnType<typeof setTimeout>

        if ('navigateTo' in step) {
            navigate(step.navigateTo)
        } else {
            timer = setTimeout(() => setIndex(index + 1), step.delay)
        }

        return () => clearTimeout(timer)
    }, [index, navigate, timeline])

    return (
        <Unfinished className=" w-screen relative">
            <Page className="size-full bg-card p-20">
                <div className="flex flex-col space-y-10">
                    <div className="flex space-x-5 justify-between">
                        <Skeleton className="h-[500px] w-[500px] rounded-xl" />
                        <Skeleton className="h-[500px] w-[500px] rounded-xl" />
                        <Skeleton className="h-[500px] w-[500px] rounded-xl" />
                    </div>

                    <div className="absolute inset-0 m-auto w-fit h-fit">
                        <h2 className="text-2xl md:text-5xl text-center font-aldri">
                            {'message' in timeline[index] ? timeline[index].message : ''}
                        </h2>
                    </div>

                    <div className="space-y-2">
                        <Skeleton className="h-6 w-full" />
                        <Skeleton className="h-6 w-full" />
                        <Skeleton className="h-6 w-full" />
                        <Skeleton className="h-6 w-[500px]" />
                        <Skeleton className="h-6 w-[250px]" />
                    </div>
                </div>
            </Page>
        </Unfinished>
    )
}
