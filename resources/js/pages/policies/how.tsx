import PrivacySidebar from '@/components/privacy-sidebar';
import { Link } from '@inertiajs/react';
import React from 'react';

const HowItWorks: React.FC = () => {
    return (
        <div className="flex h-screen overflow-hidden">
            <PrivacySidebar />

            <main className="flex flex-1 flex-col overflow-hidden">
                <header className="ml-5 flex w-full items-start justify-start py-4">
                    <h1 className="ml-5 text-2xl font-bold text-[#084896]">
                        How WorkIN Works
                    </h1>
                </header>

                <div className="ml-5 max-w-4xl flex-1 space-y-6 overflow-auto p-6">
                    <p>
                        The coronavirus disease (COVID-19) pandemic has become a
                        significant threat to our society and has disrupted
                        economic activities globally. However, as we gradually
                        live by the new normal through maximizing the use of the
                        internet,{' '}
                        <strong>
                            {' '}
                            the Provincial Government of Ilocos Norte
                        </strong>{' '}
                        launched <strong>WorkIN</strong> to cater to the needs
                        of jobseekers and employers in the province.
                    </p>

                    <p>
                        Jobseekers can browse through an array of job vacancies
                        posted by accredited and government-recognized companies
                        and agencies; and companies can speed up their hiring or
                        recruitment process. Through <strong>WorkIN</strong>,
                        jobseekers can freely apply for opportunities they
                        qualify for; and employers can post their vacancies for
                        jobseekers to apply for.
                    </p>

                    <p>
                        Despite the in-person restrictions caused by the
                        pandemic, the <strong> Provincial Government </strong>{' '}
                        has provided the Ilocano people a platform to
                        continuously improve the employment services in the
                        province.
                    </p>

                    <h2 className="mt-6 mb-2 text-xl font-semibold">
                        How It Works for{' '}
                        <strong className="text-red-600">Job Seekers</strong>
                    </h2>
                    <ol className="mb-4 list-inside list-decimal space-y-2">
                        <li>
                            <strong>Create:</strong>{' '}
                            <Link
                                href="/register"
                                className="text-blue-600 underline"
                            >
                                Register
                            </Link>{' '}
                            for a free account.{' '}
                            <Link
                                href="/login"
                                className="text-green-400 underline"
                            >
                                Login
                            </Link>{' '}
                            and fill up your public profile.
                        </li>
                        <li>
                            <strong>Search:</strong> With our large database of
                            job vacancies, you'll surely find something that
                            fits your qualifications and interests.
                        </li>
                        <li>
                            <strong>Apply:</strong> Complete your resume and
                            send it to your prospective employers.
                        </li>
                    </ol>

                    <h2 className="mt-6 mb-2 text-xl font-semibold">
                        How It Works for{' '}
                        <strong className="text-blue-900">Employers</strong>
                    </h2>
                    <ol className="mb-4 list-inside list-decimal space-y-2">
                        <li>
                            <strong>Create:</strong>{' '}
                            <Link
                                href="/register"
                                className="text-blue-600 underline"
                            >
                                Register
                            </Link>{' '}
                            for a free account. Upgrade your account to an
                            employer role and complete your company profile.
                        </li>
                        <li>
                            <strong>Post:</strong> Add your job vacancies in our
                            database.
                        </li>
                        <li>
                            <strong>Hire:</strong> Browse through applicants'
                            profiles. Invite them for interviews and hire.
                        </li>
                    </ol>
                </div>
            </main>
        </div>
    );
};

export default HowItWorks;
