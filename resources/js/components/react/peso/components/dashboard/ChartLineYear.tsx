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

interface YearData {
    year: string;
    loginToday?: number;
    totalAccounts?: number;
    jobVacancy?: number;
}

interface ChartLineYearProps {
    data?: YearData[]; // Make optional
    metric: 'loginToday' | 'totalAccounts' | 'jobVacancy';
}

export function ChartLineYear({ data = [], metric }: ChartLineYearProps) {
    
    if (!data || data.length === 0) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>No data available</CardTitle>
                    <CardDescription>
                        There is no yearly data for this metric.
                    </CardDescription>
                </CardHeader>
            </Card>
        );
    }

    
    const total = data.reduce((sum, year) => sum + (year[metric] || 0), 0);

    const firstYear = data[0]?.year || '2021';
    const lastYear =
        data[data.length - 1]?.year || new Date().getFullYear().toString();

        const metricLabels: Record<string, string> = {
            loginToday: 'Daily Logins',
            totalAccounts: 'New Accounts',
            jobVacancy: 'New Job Vacancies',
        };
        const label = metricLabels[metric] || metric;

    
    const metricLabel = metric
        .replace(/([A-Z])/g, ' $1')
        .replace(/^./, (str) => str.toUpperCase());

    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    Showing {label} Created for {firstYear} - {lastYear}
                </CardTitle>
                <CardDescription>
                    {metricLabel}:{' '}
                    <span className="font-bold">{total}</span>
                </CardDescription>
            </CardHeader>

            <CardContent className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%" debounce={200}>
                    <LineChart
                        data={data}
                        margin={{ top: 35, right: 12, bottom: 60, left: 12 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis
                            dataKey="year"
                            tickLine={false}
                            axisLine={false}
                        />
                        <YAxis />
                        <Tooltip
                            labelFormatter={(value) => `Year ${value}`}
                            formatter={(value: number) => [value, metricLabel]}
                        />
                        <Line
                            type="monotone"
                            dataKey={metric}
                            stroke="#084896"
                            strokeWidth={2}
                            dot
                            activeDot={{ r: 6 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}
