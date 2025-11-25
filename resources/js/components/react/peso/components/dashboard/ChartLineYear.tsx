'use client';

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    CartesianGrid,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';

const yearData = [
    { year: '2021', Total: 250 },
    { year: '2022', Total: 300 },
    { year: '2023', Total: 280 },
    { year: '2024', Total: 320 },
    { year: '2025', Total: 320 },
];

export function ChartLineYear() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    Showing total Login Activity for the last 5 years
                </CardTitle>
                <CardDescription>2021 - 2025</CardDescription>
            </CardHeader>

            <CardContent className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%" debounce={200}>
                    <LineChart
                        data={yearData}
                        margin={{
                            top: 35,
                            right: 12,
                            bottom: 60,
                            left: 12,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis
                            dataKey="year"
                            tickLine={false}
                            axisLine={false}
                        />
                        <YAxis />
                        <Tooltip />
                        <Line
                            type="monotone"
                            dataKey="Total"
                            stroke="#084896"
                            strokeWidth={2}
                            dot={true}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}
