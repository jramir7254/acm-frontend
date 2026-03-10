import { AnimatedNumber } from '@/components/ui';
import { useUsers, useUsersStats } from '@/features/users/hooks/users/queries'
import { Plus, TrendingUp } from 'lucide-react'
import { MdOutlineTrendingFlat } from "react-icons/md";
import { useAdminEvents, useEvents } from '@/features/events/hooks/events/queries'
import { SemestersName } from '@/components/text/semester-name';
import React from 'react'
import { Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/primitives/card'
import { Badge } from '@/components/primitives/badge'
export function EventsNumberCard({ semesterId = 'current' }) {
    const { data: allEvents } = useEvents()
    const { data, isLoading } = useAdminEvents(semesterId)


    console.log(data?.eventsData?.length)

    return (
        <Card className='w-[350px]  '>
            <CardHeader>
                <CardDescription>Total Events</CardDescription>
                <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl grid place-items-center">
                    <AnimatedNumber
                        num={allEvents?.length || 0}
                        className="font-rubik"
                    />
                </CardTitle>

            </CardHeader>
            <CardFooter className="flex-col items-start gap-1.5 text-sm mb-0">
                <div className=" font-medium">
                    {data?.eventsData.length} Events this semester
                </div>
                <div className="text-muted-foreground">
                    <SemestersName semesterId={semesterId} />
                </div>
            </CardFooter>
        </Card>
    )
}
