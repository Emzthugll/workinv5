'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
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

const MonthData = [
    { month: 'January', value: 250 },
    { month: 'February', value: 300 },
    { month: 'March', value: 280 },
    { month: 'April', value: 320 },
    { month: 'May', value: 320 },
    { month: 'June', value: 320 },
    { month: 'July', value: 320 },
    { month: 'August', value: 320 },
    { month: 'September', value: 320 },
    { month: 'October', value: 320 },
    { month: 'November', value: 320 },
    { month: 'December', value: 320 },
];

export function ChartLineMonth() {
    const firstYear = 2021;
    const lastYear = new Date().getFullYear(); // current year

    const [year, setYear] = useState(lastYear);

    const handlePrevious = () => {
        if (year > firstYear) setYear((prev) => prev - 1);
    };

    const handleNext = () => {
        if (year < lastYear) setYear((prev) => prev + 1);
    };
    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>Total Login Activity (Monthly)</CardTitle>
                    <CardDescription>
                        January - December ({year})
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <ResponsiveContainer width="100%" height={400}>
                        <LineChart
                            data={MonthData}
                            margin={{
                                top: 35,
                                right: 12,
                                bottom: 60,
                                left: 12,
                            }}
                        >
                            <CartesianGrid
                                strokeDasharray="3 3"
                                vertical={false}
                            />
                            <XAxis
                                dataKey="month"
                                tickLine={false}
                                axisLine={false}
                                interval={0}
                                angle={-30}
                                textAnchor="end"
                            />
                            <YAxis />
                            <Tooltip />
                            <Line
                                type="monotone"
                                dataKey="value"
                                stroke="#084896"
                                strokeWidth={2}
                                dot={true}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>

            <div className="mt-2 flex w-full justify-end gap-2">
                <Button
                    size="sm"
                    onClick={handlePrevious}
                    disabled={year === firstYear}
                    className="cursor-pointer bg-[#2a5296] hover:bg-[#325eaa] disabled:opacity-50"
                >
                    Previous
                </Button>
                <Button
                    size="sm"
                    onClick={handleNext}
                    disabled={year === lastYear}
                    className="cursor-pointer bg-[#2a5296] hover:bg-[#325eaa] disabled:opacity-50"
                >
                    Next
                </Button>
            </div>
        </>
    );
}
