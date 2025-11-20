import React from 'react';

interface Company {
    id: number;
    name: string;
    logo?: string;
}

interface RecruitmentCardProps {
    title: string;
    venue: string;
    start: string;
    end: string;
    companies?: Company[];
    registerLink: string;
}

const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const datePart = date
        .toLocaleDateString('en-US', {
            month: 'short',
            day: '2-digit',
            year: '2-digit',
        })
        .replace(',', '');
    const timePart = date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    });
    return { date: datePart, time: timePart };
};

const RecruitmentCard: React.FC<RecruitmentCardProps> = ({
    title,
    venue,
    start,
    end,
    companies = [],
    registerLink,
}) => {
    const startDate = formatDate(start);
    const endDate = formatDate(end);

    return (
        <div className="flex w-full max-w-sm flex-col justify-between rounded-xl border border-gray-100 bg-[#084896] p-4 shadow-md sm:max-w-md md:max-w-lg">
            {/* Top Section */}
            <div className="mb-4 flex w-full flex-col gap-3 rounded-xl border bg-gray-100 p-4">
                {/* Title */}
                <div className="text-center">
                    <h3 className="text-lg font-extrabold text-[#084896] sm:text-xl">
                        {title}
                    </h3>
                </div>

                {/* Venue */}
                <p className="text-center text-xs font-semibold text-black sm:text-sm">
                    {venue}
                </p>

                {/* Companies */}
                <div className="flex flex-wrap justify-center gap-1">
                    {companies.length > 0 ? (
                        companies.map((c) => (
                            <span
                                key={c.id}
                                className="truncate rounded-full bg-[#0076ba] px-2 py-0.5 text-xs font-medium text-white"
                            >
                                {c.name}
                            </span>
                        ))
                    ) : (
                        <span className="text-xs text-gray-400">
                            No companies listed
                        </span>
                    )}
                </div>

                {/* Date/Time Section */}
                <div className="mt-4 flex flex-col items-center rounded-xl bg-[#0076ba] p-3 text-xs text-white sm:flex-row sm:justify-center">
                    <div className="flex flex-col items-center text-center">
                        <span className="font-medium">{startDate.date}</span>
                        <span className="opacity-80">{startDate.time}</span>
                    </div>

                    <div className="my-2 h-px w-16 bg-white opacity-50 sm:mx-6 sm:my-0 sm:h-8 sm:w-px"></div>

                    <div className="flex flex-col items-center text-center">
                        <span className="font-medium">{endDate.date}</span>
                        <span className="opacity-80">{endDate.time}</span>
                    </div>
                </div>
            </div>

            {/* Bottom Section */}
            <div className="flex justify-center">
                <a
                    href={registerLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative flex h-[2.4em] cursor-pointer items-center overflow-hidden rounded-[0.75em] border border-white px-3 py-[0.25em] pl-4 text-[14px] font-medium text-white shadow-[inset_0_0_1.2em_-0.5em_#714da6]"
                >
                    <span className="mr-8 text-white">Register</span>
                    <div className="absolute right-[0.2em] flex h-[1.9em] w-[2em] items-center justify-center rounded-[0.6em] bg-white transition-all duration-300 group-hover:w-[calc(100%-0.42em)] active:scale-95">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="20"
                            height="20"
                            className="w-[1em] text-[#7b52b9] transition-transform duration-300 group-hover:translate-x-[0.05em]"
                        >
                            <path fill="none" d="M0 0h24v24H0z"></path>
                            <path
                                fill="currentColor"
                                d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                            ></path>
                        </svg>
                    </div>
                </a>
            </div>
        </div>
    );
};

export default RecruitmentCard;
