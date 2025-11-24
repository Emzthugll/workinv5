'use client';

import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { useState } from 'react';
import {
    CartesianGrid,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';

export function ChartLineDay() {
    const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ];

    const firstYear = 2021;
    const lastYear = new Date().getFullYear();

    const [year, setYear] = useState(lastYear);
    const [monthIndex, setMonthIndex] = useState(new Date().getMonth()); // 0-11

    const currentMonth = months[monthIndex];

    // Generate example daily data for 31 days
    const generateDaysData = (days: number) =>
        Array.from({ length: days }, (_, i) => ({
            day: i + 1,
            value: Math.floor(Math.random() * 100) + 50, // replace with real data
        }));

    const dayData = generateDaysData(31);

    const handlePreviousMonth = () => {
        if (monthIndex > 0) {
            setMonthIndex((prev) => prev - 1);
        } else if (year > firstYear) {
            setYear((prev) => prev - 1);
            setMonthIndex(11);
        }
    };

    const handleNextMonth = () => {
        if (monthIndex < 11) {
            setMonthIndex((prev) => prev + 1);
        } else if (year < lastYear) {
            setYear((prev) => prev + 1);
            setMonthIndex(0);
        }
    };

    return (
        <>
            <Card>
                <CardHeader className="flex items-center justify-between">
                    <div>
                        <CardTitle>
                            Showing total Login Activity for the last 30 days
                        </CardTitle>
                        <CardDescription>
                            Days 1 - 31 ({currentMonth} {year})
                        </CardDescription>
                    </div>
                </CardHeader>

                <CardContent className="w-full">
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart
                            data={dayData}
                            margin={{
                                top: 20,
                                right: 12,
                                bottom: 20,
                                left: 12,
                            }}
                        >
                            <CartesianGrid
                                strokeDasharray="3 3"
                                vertical={false}
                            />
                            <XAxis
                                dataKey="day"
                                tickLine={false}
                                axisLine={false}
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
                    onClick={handlePreviousMonth}
                    disabled={year === firstYear && monthIndex === 0}
                    className="bg-[#2a5296] hover:bg-[#325eaa] disabled:opacity-50"
                >
                    Previous
                </Button>
                <Button
                    size="sm"
                    onClick={handleNextMonth}
                    disabled={
                        year === lastYear &&
                        monthIndex === new Date().getMonth()
                    }
                    className="bg-[#2a5296] hover:bg-[#325eaa] disabled:opacity-50"
                >
                    Next
                </Button>
            </div>
        </>
    );
}
