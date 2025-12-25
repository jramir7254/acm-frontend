import { AnimatedNumber } from '@/components/ui';
import { useUsers, useUsersStats } from '@/features/users/hooks/users/queries'
import { TrendingUp } from 'lucide-react'
import { MdOutlineTrendingFlat } from "react-icons/md";
import { useEvents } from '@/features/events/hooks/events/queries'

import React from 'react'
import { Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/primitives/card'
import { Badge } from '@/components/primitives/badge'

export function EventsNumberCard() {
    const { data } = useEvents()



    return (
        <Card className='w-[250px]  '>
            <CardHeader>
                <CardDescription>Total Events</CardDescription>
                <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl grid place-items-center">
                    <AnimatedNumber
                        num={data?.length || 0}
                        className="font-rubik"
                    />
                </CardTitle>

            </CardHeader>
            <CardFooter className="flex-col items-start gap-1.5 text-sm mb-0">
                <div className=" font-medium">
                    Events this semester
                </div>
                <div className="text-muted-foreground">
                    Spring 2026
                </div>
            </CardFooter>
        </Card>
    )
}
