import RecruitmentCard from '@/components/RecruitmentCard';
import React from 'react';

interface Company {
    id: number;
    name: string;
    logo?: string;
}

interface Activity {
    id: number;
    type: string;
    venue: string;
    details?: string;
    start: string;
    end: string;
    companies?: Company[];
    registerLink: string;
}

interface Props {
    activities: Activity[];
}

const RecruitmentList: React.FC<Props> = ({ activities }) => {
    return (
        <div className="bg- grid justify-items-center gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {activities.map((activity) => (
                <RecruitmentCard
                    key={activity.id}
                    title={activity.type}
                    venue={activity.venue}
                    start={activity.start}
                    end={activity.end}
                    companies={activity.companies}
                    registerLink={activity.registerLink}
                />
            ))}
        </div>
    );
};

export default RecruitmentList;
