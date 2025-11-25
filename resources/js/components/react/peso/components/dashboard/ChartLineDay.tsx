'use client';

import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import axios from 'axios';
import { useEffect, useState } from 'react';
import {
    CartesianGrid,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';

interface DayDataType {
    day: number;
    value: number;
}

interface ChartLineDayProps {
    metric: string;
}

export function ChartLineDay({ metric }: ChartLineDayProps) {
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
    const [monthIndex, setMonthIndex] = useState(new Date().getMonth());
    const [dayData, setDayData] = useState<DayDataType[]>([]);
    const [loading, setLoading] = useState(false);

    const currentMonth = months[monthIndex];

    const metricLabels: Record<string, string> = {
        loginToday: 'Logins',
        totalAccounts: 'New Accounts (Daily)',
        jobVacancy: 'New Job Vacancies (Daily)',
    };

    const label = metricLabels[metric] || metric;


    const fetchDailyData = async (y: number, m: number) => {
        setLoading(true);
        try {
            let endpoint = '';
            if (metric === 'loginToday')
                endpoint = '/peso/dashboard/daily-logins';
            if (metric === 'totalAccounts')
                endpoint = '/peso/dashboard/daily-accounts';
            if (metric === 'jobVacancy')
                endpoint = '/peso/dashboard/daily-vacancies';

            const res = await axios.get(
                `${endpoint}?year=${year}&month=${monthIndex + 1}`,
            );


            setDayData(res.data);
        } catch (err) {
            console.error(`Failed to fetch daily ${metric}`, err);
            setDayData([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDailyData(year, monthIndex);
    }, [year, monthIndex, metric]);

    const handlePreviousMonth = () => {
        if (monthIndex > 0) setMonthIndex((prev) => prev - 1);
        else if (year > firstYear) {
            setYear((prev) => prev - 1);
            setMonthIndex(11);
        }
    };

    const handleNextMonth = () => {
        if (monthIndex < 11) setMonthIndex((prev) => prev + 1);
        else if (year < lastYear) {
            setYear((prev) => prev + 1);
            setMonthIndex(0);
        }
    };

    const totalLogins = dayData.reduce((sum, day) => sum + day.value, 0);

    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle> Showing {label}</CardTitle>
                    <CardDescription>
                        {currentMonth} {year} •{' '}
                        <span className="font-bold">{totalLogins}</span> total
                    </CardDescription>
                </CardHeader>

                <CardContent className="w-full">
                    {loading ? (
                        <div className="flex h-[300px] items-center justify-center">
                            <p className="text-muted-foreground">Loading...</p>
                        </div>
                    ) : dayData.length === 0 ? (
                        <div className="flex h-[300px] items-center justify-center">
                            <p className="text-muted-foreground">
                                No data available
                            </p>
                        </div>
                    ) : (
                        <ResponsiveContainer
                            width="100%"
                            height={300}
                            debounce={350}
                        >
                            <LineChart data={dayData}>
                                <CartesianGrid
                                    strokeDasharray="3 3"
                                    vertical={false}
                                />
                                <XAxis
                                    dataKey="day"
                                    tickLine={false}
                                    axisLine={false}
                                    label={{
                                        value: 'Day',
                                        position: 'insideBottom',
                                        offset: -5,
                                    }}
                                />
                                <YAxis
                                    label={{
                                        value: metric,
                                        angle: -90,
                                        position: 'insideLeft',
                                    }}
                                />
                                <Tooltip
                                    labelFormatter={(value) => `Day ${value}`}
                                    formatter={(value: number) => [
                                        value,
                                        metric,
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
                    )}
                </CardContent>
            </Card>

            <div className="mt-2 flex w-full justify-end gap-2">
                <Button
                    size="sm"
                    onClick={handlePreviousMonth}
                    disabled={
                        (year === firstYear && monthIndex === 0) || loading
                    }
                    className="bg-[#2a5296] hover:bg-[#325eaa] disabled:opacity-50"
                >
                    Previous
                </Button>
                <Button
                    size="sm"
                    onClick={handleNextMonth}
                    disabled={
                        (year === lastYear &&
                            monthIndex === new Date().getMonth()) ||
                        loading
                    }
                    className="bg-[#2a5296] hover:bg-[#325eaa] disabled:opacity-50"
                >
                    Next
                </Button>
            </div>
        </>
    );
}
