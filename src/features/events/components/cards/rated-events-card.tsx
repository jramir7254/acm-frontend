import { AnimatedNumber } from '@/components/ui';
import { useUsers, useUsersStats } from '@/features/users/hooks/users/queries'
import { TrendingUp } from 'lucide-react'
import { MdOutlineTrendingFlat } from "react-icons/md";
import { useEvents, useStats } from '@/features/events/hooks/events/queries'

import React from 'react'
import { Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/primitives/card'
import { Badge } from '@/components/primitives/badge'
import { Separator } from '@/components/primitives/separator';

export function RatedEventsCard() {
    const { data } = useStats()

    if (!data) return

    const { highestRated, lowestRated } = data


    return (
        <div className='flex  bg-card text-card-foreground  gap-5 rounded-xl border pb-0 overflow-hidden shadow-sm' >
            <Card className='rounded-none border-none w-[200px]'>

                <CardHeader>
                    <CardDescription>Highest Rated Event</CardDescription>
                    <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                        <AnimatedNumber
                            decimal
                            num={highestRated.avgRating}
                        // className="text-5xl font-rubik"
                        />
                    </CardTitle>

                </CardHeader>
                <CardFooter className="flex-col items-start gap-1.5 text-sm">
                    <div className="line-clamp-1 flex gap-2 font-medium">
                        {highestRated.title}
                    </div>

                </CardFooter>
            </Card>
            <Separator orientation='vertical' />
            <Card className='rounded-none border-none w-[200px]'>

                <CardHeader>
                    <CardDescription>Lowest Rated Event</CardDescription>
                    <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                        <AnimatedNumber
                            decimal
                            num={lowestRated.avgRating}
                            className="font-rubik"
                        />
                    </CardTitle>

                </CardHeader>
                <CardFooter className="flex-col items-start gap-1.5 text-sm">
                    <div className="line-clamp-1 flex gap-2 font-medium">
                        {lowestRated.title}
                    </div>

                </CardFooter>
            </Card>

        </div>
    )
}
