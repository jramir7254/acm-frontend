

import {
    ChartLegend,
    ChartTooltip,
    ChartContainer,
    ChartLegendContent,
    ChartTooltipContent,
    type ChartConfig
} from '@/components/primitives/chart'

import { Bar, BarChart, BarStack, Cell, Pie, PieChart, XAxis } from 'recharts'

import { FEEDBACK_QUESTIONS } from '@/lib/constants';
import { useEventField } from '../../hooks/event/queries';
import { logger } from '@/lib/logger';
import { useAdminEvents, useStats } from '../../hooks/events/queries';
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/primitives/card';
import { Badge } from '@/components/primitives/badge';
import { AnimatedNumber } from '@/components/ui';
import { Plus, TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';



const chartConfig = {
    rsvps: {
        label: "RSVPS",
        color: "var(--chart-1)",
    },
    attended: {
        label: "Attended",
        color: "var(--chart-2)",
    },
} satisfies ChartConfig



export function BChart({ semesterId = 'current' }) {
    const { data, isLoading } = useAdminEvents(semesterId)

    if (!data) return

    const { eventsData } = data


    const chartConfig = {
        rsvps: {
            label: "RSVPS",
            color: "var(--chart-1)",
        },
        attended: {
            label: "Attended",
            color: "var(--chart-2)",
        },
    } satisfies ChartConfig


    const d = eventsData?.map(e => ({
        ...e,
        date: new Date(e.date).toLocaleString('en-us', { month: 'short', day: '2-digit' })
    }))


    const newEvent = eventsData[eventsData.length - 1]?.attended
    const prevEvent = eventsData[eventsData.length - 2]?.attended


    const p = eventsData.length < 2 ?
        100
        :
        ((newEvent - prevEvent) / (prevEvent === 0 ? 1 : prevEvent)) * 100

    console.log({ p, newEvent, prevEvent })


    return (
        <Card className='max-w-full w-full overflow-x-auto pb-0'>
            <CardHeader>
                <CardTitle>Attendance This Semester</CardTitle>
                <CardAction>
                    <Badge variant="outline" className={cn('w-25', p > 0 ? 'text-green-600' : 'text-red-700')}>
                        {p > 0 ? <TrendingUp /> : <TrendingDown />}
                        <AnimatedNumber
                            num={p}
                            className="font-rubik text-sm"
                            decimal
                        />%
                    </Badge>
                </CardAction>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig} className="max-h-[100px] w-[50%]  p-0!">
                    <BarChart data={d} barCategoryGap={5} maxBarSize={25}  >
                        <XAxis dataKey="date" />
                        <BarStack radius={[2, 2, 0, 0]} >
                            <Bar dataKey="rsvps" stackId="a" fill="#28282B" />
                            <Bar dataKey="attended" stackId="a" fill="var(--chart-1)" />
                        </BarStack>
                        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
