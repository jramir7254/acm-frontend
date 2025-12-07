

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

type QuestionIds = 1 | 2 | 3 | 4



export function QuestionChart({
    questionNum,
    data
}: {
    questionNum: QuestionIds,
    data: Array<{ label: string, count: number }>
}) {
    const chartConfig: ChartConfig = FEEDBACK_QUESTIONS[questionNum].options.reduce((a, o, i) => {
        a[`option${i + 1}`] = {
            label: o,
            color: `var(--chart-${i + 1})`,
        };
        return a;
    }, {} as ChartConfig)


    return (
        <ChartContainer config={chartConfig} className="min-h-[200px] w-[70%] ">
            <PieChart >
                <Pie
                    data={data}
                    dataKey="count"
                    nameKey="label"
                    // cx="50%"
                    // cy="50%"
                    outerRadius={80}
                    fill="var(--color-desktop)"  // Recharts needs a `fill`, but styling comes via chartConfig
                    label
                >
                    {data.map((entry, idx) => (
                        <Cell key={idx} fill={Object.values(chartConfig)[idx].color} />
                    ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
                <ChartLegend content={<ChartLegendContent />} />
            </PieChart>
        </ChartContainer>
    )
}
