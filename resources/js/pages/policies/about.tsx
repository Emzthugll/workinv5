import PrivacySidebar from '@/components/privacy-sidebar';
import React from 'react';

const About: React.FC = () => {
    return (
        <div className="flex h-screen overflow-hidden">
            {/* Sidebar */}
            <PrivacySidebar />

            {/* Main content */}
            <main className="flex flex-1 flex-col overflow-hidden">
                <header className="ml-5 flex w-full items-start justify-start py-4">
                    <h1 className="ml-5 text-2xl font-bold text-[#084896]">
                        About WorkIN
                    </h1>
                </header>

                {/* Scrollable page content */}
                <div className="ml-5 max-w-4xl flex-1 space-y-6 overflow-auto p-6">
                    <p>
                        <strong>workIN est. 2021</strong>
                    </p>

                    <p>
                        The coronavirus disease (COVID-19) pandemic has become a
                        significant threat to our society and has disrupted
                        economic activities globally. However, as we gradually
                        live by the new normal through maximizing the use of the
                        internet, the{' '}
                        <strong>Provincial Government of Ilocos Norte</strong>{' '}
                        launched <strong>workIN</strong> to cater to the needs
                        of jobseekers and employers in the province. It went
                        live in April 2021 under the guidance of{' '}
                        <strong>Gov. Matthew J. Marcos Manotoc</strong> to
                        answer the growing problem of unemployment and job
                        mismatch.
                    </p>

                    <p>
                        <strong>workIN</strong> is the official job-search
                        portal of the{' '}
                        <strong>Provincial Government of Ilocos Norte</strong> .
                        With the help of technology and workIN, job search and
                        application is now just a few clicks away. Our core
                        mission is to help our kailians get jobs and help
                        employers find great candidates.
                    </p>

                    <p>
                        Jobseekers can browse through an array of job vacancies
                        posted by accredited and government-recognized companies
                        and agencies; and companies can speed up their hiring or
                        recruitment process. Through <strong>workIN</strong> ,
                        jobseekers can freely apply for opportunities they
                        qualify for; and employers can post their vacancies for
                        jobseekers to apply for.
                    </p>

                    <p>
                        Despite the in-person restrictions caused by the
                        pandemic, the <strong>Provincial Government</strong> has
                        provided the Ilocano people a platform to continuously
                        improve the employment services in the province.
                    </p>

                    <p>
                        WorkIN continues to grow its database of employers and
                        partner agencies and continuously encourages them to
                        post their job openings on the website to reach our
                        kailians wherever they are in the world.
                    </p>

                    <p>
                        The WorkIN team is also continuously searching for local
                        (public and private) and international blue- and
                        white-collar jobs for our kailians. Moreover, WorkIN
                        also offers free trainings and seminars to make our
                        kailians job ready.
                    </p>

                    <h2 className="mt-6 mb-2 text-xl font-semibold">
                        Provincial Mission
                    </h2>
                    <ul className="list-inside list-disc space-y-1">
                        <li className="italic">
                            “SAPASAP A SALUN-AT” (Accessible Healthcare for All)
                        </li>
                        <li className="italic">
                            “NARIMAT NGA AGLAWLAW” (A Brighter Environment)
                        </li>
                        <li>
                            “AGTULTULOY A TULONG PARA MANNALON KEN MANGNGALAP”
                            (Continuing Assistance to Farmers and Fisherfolks)
                        </li>
                        <li className="italic">
                            “NAURNOS A TRANSPORTASION” (Organized
                            Transportation)
                        </li>
                        <li className="italic">
                            “ADADU A PAGPUONAN KEN NARUAY A PANGGEDAN” (More
                            Investments and Jobs)
                        </li>
                    </ul>

                    <h2 className="mt-6 mb-2 text-xl font-semibold">
                        Provincial Vision
                    </h2>
                    <p className="italic">
                        “Narimat nga arapaap, intay’ amin maragpat!”
                        <br />
                        (A brighter future, we can all achieve!)
                    </p>
                </div>
            </main>
        </div>
    );
};

export default About;
