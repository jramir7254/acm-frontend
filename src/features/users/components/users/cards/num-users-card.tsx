import { AnimatedNumber } from '@/components/ui/number'
import { useUsers, useUsersStats } from '@/features/users/hooks/users/queries'
import { TrendingUp } from 'lucide-react'
import { MdOutlineTrendingFlat } from "react-icons/md";

import React from 'react'
import { Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/primitives/card'
import { Badge } from '@/components/primitives/badge'

export function UsersNumberCard() {
    const { data, isRefetching, isLoading } = useUsers()
    const { data: stats } = useUsersStats()


    return (
        <Card className='w-fit' >
            <CardHeader>
                <CardDescription>Total Users</CardDescription>
                <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl ">
                    <AnimatedNumber
                        num={data?.length}
                        className=""
                    />
                </CardTitle>
                <CardAction>
                    <Badge variant="outline">
                        {stats > 0 ? <TrendingUp /> : <MdOutlineTrendingFlat />}
                        {/* <TrendingUp /> */}
                        {stats}
                    </Badge>
                </CardAction>
            </CardHeader>
            <CardFooter className="flex-col items-start gap-1.5 text-sm">
                <div className="line-clamp-1 flex gap-2 font-medium">
                    Trending up this month <TrendingUp className="size-4" />
                </div>
                <div className="text-muted-foreground">
                    New users this week
                </div>
            </CardFooter>

        </Card>
    )
}
