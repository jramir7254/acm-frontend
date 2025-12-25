

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



export function BChart({
}: {
    }) {
    const { data, isLoading } = useAdminEvents()

    if (!data) return


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


    const d = data.map(e => ({
        ...e,
        date: new Date(e.date).toLocaleDateString()
    }))


    return (
        <Card className='max-w-full w-full overflow-x-auto pb-0'>
            <CardHeader>
                <CardTitle>Overall Attendance</CardTitle>
                <CardAction>Card Action</CardAction>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig} className="max-h-[100px] w-[70%] ">
                    <BarChart data={d}>
                        <XAxis dataKey="date" />
                        <BarStack radius={[5, 5, 0, 0]} >
                            <Bar dataKey="rsvps" stackId="a" fill="#28282B" barSize={50} />
                            <Bar dataKey="attended" stackId="a" fill="#8B0000" barSize={50} />
                        </BarStack>
                        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
