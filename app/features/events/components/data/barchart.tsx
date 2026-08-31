

import {
    ChartTooltip,
    ChartContainer,
    ChartTooltipContent,
    type ChartConfig
} from '@/components/ui/chart'

import { LineChart, Line, XAxis, BarChart, Bar } from 'recharts'

import { useAdminEvents, useEventsAttendance } from '../../hooks/queries';



const chartConfig = {

    attended: {
        label: "Attended",
        color: "var(--chart-1)",
    },
} satisfies ChartConfig



export function AttendanceBarChart({ semesterId = 'current' }) {
    const { data, isLoading } = useEventsAttendance({ semesterId })

    if (!data) return



    const d = data.filter(ev => ev.type === 'workshop')?.map(e => ({
        ...e,
        date: new Date(e.date).toLocaleString('en-us', { month: 'short', day: '2-digit' })
    }))




    return (

        <ChartContainer config={chartConfig} className=" aspect-auto h-25 w-full overflow-hidden">
            <BarChart data={d}   >
                <XAxis dataKey="date" domain={[0, 'auto']} />
                {/* <Line dataKey="rsvps" strokeWidth={3} fill="var(--chart-1)" /> */}
                <Bar dataKey="attended" strokeWidth={3} radius={[5, 5, 0, 0]} fill="var(--chart-2)" />
                <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            </BarChart>
        </ChartContainer>

    )
}
