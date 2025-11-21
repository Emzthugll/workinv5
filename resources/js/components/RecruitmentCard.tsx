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

    const eventPassed = new Date(end) < new Date();

    return (
        <div className="flex w-full flex-col justify-between rounded-xl border p-3 shadow-sm sm:p-4">
            {/* Top Section */}
            <div
                className={`mb-4 flex w-full flex-col gap-3 rounded-xl border p-3 sm:p-4 ${
                    eventPassed
                        ? 'bg-gray-200'
                        : 'border-green-200 bg-green-100'
                }`}
            >
                {/* Title */}
                <div className="text-center">
                    <h3 className="text-base font-extrabold text-black sm:text-lg md:text-xl">
                        {title}
                    </h3>
                </div>

                {/* Venue */}
                <p className="text-center text-xs text-black uppercase sm:text-sm">
                    {venue}
                </p>

                {/* Companies */}
                <div className="flex flex-wrap justify-center gap-1.5">
                    {companies.length > 0 ? (
                        companies.map((c) => (
                            <span
                                key={c.id}
                                className={`truncate rounded-full px-2 py-1 text-xs font-medium sm:text-sm ${
                                    eventPassed
                                        ? 'bg-gray-400 text-[#084896]'
                                        : 'bg-green-300 text-[#084896]'
                                }`}
                            >
                                {c.name}
                            </span>
                        ))
                    ) : (
                        <span className="text-xs text-gray-400 sm:text-sm">
                            No companies listed
                        </span>
                    )}
                </div>

                {/* Date/Time Section */}
                <div
                    className={`mt-4 flex flex-col items-center gap-3 rounded-xl p-3 text-xs text-[#084896] sm:flex-row sm:justify-center sm:gap-0 ${
                        eventPassed ? 'bg-gray-300' : 'bg-green-300'
                    }`}
                >
                    <div className="flex flex-col items-center text-center">
                        <span className="font-medium">{startDate.date}</span>
                        <span className="opacity-80">{startDate.time}</span>
                    </div>

                    <div className="h-px w-16 bg-[#084896] opacity-50 sm:mx-6 sm:h-8 sm:w-px"></div>

                    <div className="flex flex-col items-center text-center">
                        <span className="font-medium">{endDate.date}</span>
                        <span className="opacity-80">{endDate.time}</span>
                    </div>
                </div>
            </div>

            {/* Bottom Section */}
            <div className="flex justify-center">
                <button
                    disabled={eventPassed}
                    className={`group relative flex h-10 items-center overflow-hidden rounded-xl border px-4 py-2 text-sm font-medium transition-all sm:h-11 sm:text-base ${
                        eventPassed
                            ? 'cursor-not-allowed bg-white text-black'
                            : 'cursor-pointer bg-white text-black hover:shadow-md active:scale-95'
                    }`}
                    onClick={() => {
                        if (!eventPassed) window.open(registerLink, '_blank');
                    }}
                >
                    <span className="mr-8 sm:mr-10">
                        {eventPassed ? 'Event Passed' : 'Register'}
                    </span>

                    <div
                        className={`absolute right-1 flex h-8 w-8 items-center justify-center rounded-lg transition-all duration-300 sm:h-9 sm:w-9 ${
                            eventPassed
                                ? 'bg-gray-400'
                                : 'bg-green-400 group-hover:w-[calc(100%-0.5rem)]'
                        }`}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="20"
                            height="20"
                            className="w-5 transition-transform duration-300 group-hover:translate-x-1"
                        >
                            <path fill="none" d="M0 0h24v24H0z"></path>
                            <path
                                fill="#000000"
                                d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                            ></path>
                        </svg>
                    </div>
                </button>
            </div>
        </div>
    );
};

export default RecruitmentCard;
