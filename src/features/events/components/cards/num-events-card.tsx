import { AnimatedNumber } from '@/components/ui';
import { useUsers, useUsersStats } from '@/features/users/hooks/users/queries'
import { Plus, TrendingUp } from 'lucide-react'
import { MdOutlineTrendingFlat } from "react-icons/md";
import { useAdminEvents, useEvents } from '@/features/events/hooks/events/queries'
import { SemesterName } from '@/components/text/semester-name';
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
                <CardAction>
                    <Badge variant="outline">
                        <Plus />
                        <AnimatedNumber
                            num={data?.eventsData.length || 0}
                            className="font-rubik text-sm"
                        />
                    </Badge>
                </CardAction>
            </CardHeader>
            <CardFooter className="flex-col items-start gap-1.5 text-sm mb-0">
                <div className=" font-medium">
                    Events this semester
                </div>
                <div className="text-muted-foreground">
                    <SemesterName />
                </div>
            </CardFooter>
        </Card>
    )
}
