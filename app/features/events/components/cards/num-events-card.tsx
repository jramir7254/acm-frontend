import { AnimatedNumber } from '@/components/other';
import { Plus, TrendingUp } from 'lucide-react'
import { MdOutlineTrendingFlat } from "react-icons/md";
import { useAdminEvents, useEvents, useStats } from '@/features/events/hooks/queries'
import { SemestersName } from '@/components/text/semester-name';
import React from 'react'
import { Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
export function EventsNumberCard({ semesterId = 'current' }) {
    const { data: allEvents } = useEvents()
    const { data } = useStats()

    if (!data) return <></>


    return (
        <Card className='w-full'>
            <CardHeader>
                <CardDescription>Total Events</CardDescription>
                <CardTitle className=" font-semibold tabular-nums @[250px]/card:text-3xl grid place-items-center">
                    <AnimatedNumber
                        num={data.totalEvents}
                        className="font-rubik"
                    />
                </CardTitle>

            </CardHeader>
            <CardFooter className="flex-col items-start gap-1.5 text-sm mb-">
                <div className=" font-medium">
                    {data.numSemEvents} Events this semester
                </div>
                <div className="text-muted-foreground">
                    <SemestersName semesterId={semesterId} />
                </div>
            </CardFooter>
        </Card>
    )
}
