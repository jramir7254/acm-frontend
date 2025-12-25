

import {
    ChartLegend,
    ChartTooltip,
    ChartContainer,
    ChartLegendContent,
    ChartTooltipContent,
    type ChartConfig
} from '@/components/primitives/chart'

import { Cell, Pie, PieChart } from 'recharts'

import { FEEDBACK_QUESTIONS } from '@/lib/constants';
import { useEventField } from '../../hooks/event/queries';
import { logger } from '@/lib/logger';

type QuestionIds = 1 | 2 | 3 | 4

interface DataModel {
    epccId: string
    firstName: string
    lastName: string,
    q1: number,
    q2: number,
    q3: number,
    q4: number,
    q5?: string | null,
}



export function QuestionChart({
    questionNum,
    eventId
}: {
    questionNum: QuestionIds,
    eventId: number,
    data: Array<{ label: string, count: number }>
}) {
    const { data, isLoading } = useEventField(eventId, 'feedback')

    const chartConfig: ChartConfig = FEEDBACK_QUESTIONS[questionNum].options.reduce((a, o, i) => {
        a[`option${i + 1}`] = {
            label: o,
            color: `var(--chart-${i + 1})`,
        };
        return a;
    }, {} as ChartConfig)

    const q1 = data?.reduce((a, i) => {
        const r = i[`q${questionNum}`]
        a[r - 1].count += 1
        return a
    }, [
        { label: 'option1', count: 0 },
        { label: 'option2', count: 0 },
        { label: 'option3', count: 0 },
        { label: 'option4', count: 0 },
        { label: 'option5', count: 0 }
    ])

    logger.debug({ chartConfig, q1 })


    return (
        <ChartContainer config={chartConfig} className="min-h-[200px] w-[70%] ">
            <PieChart >
                <Pie
                    data={q1}
                    dataKey="count"
                    nameKey="label"
                    // cx="50%"
                    // cy="50%"
                    outerRadius={80}
                    fill="var(--color-desktop)"  // Recharts needs a `fill`, but styling comes via chartConfig
                    label
                >
                    {q1.map((entry, idx) => (
                        <Cell key={idx} fill={Object.values(chartConfig)[idx].color} />
                    ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
                <ChartLegend content={<ChartLegendContent />} />
            </PieChart>
        </ChartContainer>
    )
}
