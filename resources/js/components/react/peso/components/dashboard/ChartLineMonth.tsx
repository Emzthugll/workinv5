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

interface MonthDataType {
    month: string;
    loginToday?: number;
    totalAccounts?: number;
    jobVacancy?: number;
}

interface ChartLineMonthProps {
    monthlyData: Record<number, MonthDataType[]>;
    startYear: number;
    metric: 'loginToday' | 'totalAccounts' | 'jobVacancy';
}

export function ChartLineMonth({
    monthlyData,
    startYear,
    metric,
}: ChartLineMonthProps) {
    const firstYear = startYear;
    const lastYear = new Date().getFullYear();
    const [currentYear, setCurrentYear] = useState(lastYear);

    const metricLabels: Record<string, string> = {
        loginToday: 'Logins',
        totalAccounts: 'New Accounts',
        jobVacancy: 'New Job Vacancies',
    };
    const label = metricLabels[metric] || metric;

    const handlePrevious = () => {
        if (currentYear > firstYear) setCurrentYear((prev) => prev - 1);
    };

    const handleNext = () => {
        if (currentYear < lastYear) setCurrentYear((prev) => prev + 1);
    };

    const yearData = monthlyData[currentYear] || [];

    // Map data to include only the selected metric
    const data = yearData.map((month) => ({
        month: month.month,
        value: month[metric] || 0,
    }));

    const total = data.reduce((sum, month) => sum + month.value, 0);

    const metricLabel = metric.replace(/([A-Z])/g, ' $1');

    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>Showing (Monthly) {label}</CardTitle>
                    <CardDescription>
                        Jan - Dec, {currentYear} •{' '}
                        <span className="font-bold">{total}</span> {metricLabel}
                    </CardDescription>
                </CardHeader>

                <CardContent className="h-[400px]">
                    <ResponsiveContainer
                        width="100%"
                        height="100%"
                        debounce={300}
                    >
                        <LineChart
                            data={data}
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
                            <Tooltip
                                labelFormatter={(value) => `${value}`}
                                formatter={(value: number) => [
                                    value,
                                    metricLabel,
                                ]}
                            />
                            <Line
                                type="monotone"
                                dataKey="value"
                                stroke="#084896"
                                strokeWidth={2}
                                dot
                                activeDot={{ r: 6 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>

            <div className="mt-2 flex w-full justify-end gap-2">
                <Button
                    size="sm"
                    onClick={handlePrevious}
                    disabled={currentYear === firstYear}
                    className="bg-[#2a5296] hover:bg-[#325eaa] disabled:opacity-50"
                >
                    Previous
                </Button>
                <Button
                    size="sm"
                    onClick={handleNext}
                    disabled={currentYear === lastYear}
                    className="bg-[#2a5296] hover:bg-[#325eaa] disabled:opacity-50"
                >
                    Next
                </Button>
            </div>
        </>
    );
}
