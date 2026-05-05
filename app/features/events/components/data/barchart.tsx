

import {
    ChartTooltip,
    ChartContainer,
    ChartTooltipContent,
    type ChartConfig
} from '@/components/ui/chart'

import { LineChart, Line, XAxis } from 'recharts'

import { useAdminEvents } from '../../hooks/events/queries';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';



const chartConfig = {

    attended: {
        label: "Attended",
        color: "var(--chart-1)",
    },
} satisfies ChartConfig



export function BChart({ semesterId = 'current' }) {
    const { data, isLoading } = useAdminEvents(semesterId)

    if (!data) return

    const { eventsData } = data


    const d = eventsData.filter(ev => ev.type === 'workshop')?.map(e => ({
        ...e,
        date: new Date(e.date).toLocaleString('en-us', { month: 'short', day: '2-digit' })
    }))




    return (
        <Card className='max-w-full pb-0 w-full overflow-x-auto bg-transparent ring-0'>
            <CardHeader>
                <CardTitle>Attendance This Semester</CardTitle>
                {/* <CardAction>
                    <Badge variant="outline" className={cn('w-25', p > 0 ? 'text-green-600' : 'text-red-700')}>
                        {p > 0 ? <TrendingUp /> : <TrendingDown />}
                        <AnimatedNumber
                            num={p}
                            className="font-rubik text-sm"
                            decimal
                        />%
                    </Badge>
                </CardAction> */}
            </CardHeader>
            <CardContent className=''>
                <ChartContainer config={chartConfig} className="max-h-25 w-[80%]">
                    <LineChart data={d}   >
                        <XAxis dataKey="date" domain={[0, 'auto']} />
                        {/* <Line dataKey="rsvps" strokeWidth={3} fill="var(--chart-1)" /> */}
                        <Line dataKey="attended" strokeWidth={3} />
                        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                    </LineChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
