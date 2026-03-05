import { AnimatedNumber } from '@/components/ui/number'
import { useUsers, useUsersStats } from '@/features/users/hooks/users/queries'
import { Plus, TrendingUp } from 'lucide-react'
import { MdOutlineTrendingFlat } from "react-icons/md";

import React from 'react'
import { Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/primitives/card'
import { Badge } from '@/components/primitives/badge'
import { SemestersName } from '@/components/text/semester-name';

export function UsersNumberCard({ semesterId = 'current' }) {
    const { data, isRefetching, isLoading } = useUsers()
    const { data: stats } = useUsersStats()


    return (
        <Card className='w-[250px]' >
            <CardHeader>
                <CardDescription>Total Users</CardDescription>
                <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl ">
                    <AnimatedNumber
                        num={data?.length}
                        className=""
                    />
                </CardTitle>

            </CardHeader>
            <CardFooter className="flex-col items-start gap-1.5 text-sm mb-0">
                <div className=" font-medium">
                    {stats} Users this semester
                </div>
                <div className="text-muted-foreground">
                    <SemestersName semesterId={semesterId} />
                </div>
            </CardFooter>

        </Card>
    )
}
