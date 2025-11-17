import Background from '@/assets/images/background.jpg';
import logo from '@/assets/images/work.png';
import { dashboard, login, register } from '@/routes';
import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Welcome({
    canRegister = true,
}: {
    canRegister?: boolean;
}) {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Welcome">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600"
                    rel="stylesheet"
                />
            </Head>

            {/* Disable ALL scrolling */}
            <div className="flex h-screen w-screen overflow-hidden bg-[#FDFDFC] text-[#1b1b18] dark:bg-[#0a0a0a]">
                <nav className="fixed top-0 left-0 z-30 flex w-full items-center justify-end gap-4 bg-blue-900/95 px-6 py-3 backdrop-blur-sm">
                    {auth.user ? (
                        <Link
                            href={dashboard()}
                            className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] dark:border-[#3E3E3A] dark:text-[#EDEDEC]"
                        >
                            Dashboard
                        </Link>
                    ) : (
                        <>
                            <Link
                                href={login()}
                                className="inline-block rounded-lg border-[#d1d1d1] bg-white px-5 py-2 text-sm font-medium text-[#1b1b18] transition-all duration-200 hover:scale-105 dark:border-[#3E3E3A] dark:bg-[#1a1a1a] dark:text-[#EDEDEC]"
                            >
                                Log in
                            </Link>

                            {canRegister && (
                                <Link
                                    href={register()}
                                    className="inline-block rounded-lg border-[#19140035] bg-[#1b1b18] px-5 py-2 text-sm font-medium text-white transition-all duration-200 hover:scale-105 dark:border-[#62605b] dark:bg-[#EDEDEC] dark:text-[#1b1b18]"
                                >
                                    Register
                                </Link>
                            )}
                        </>
                    )}
                </nav>

                <div className="relative flex h-full w-full pt-16">
                    <img
                        src={Background}
                        alt="Background"
                        className="absolute inset-0 h-full w-full object-cover"
                    />

                    <div className="absolute inset-0 bg-gradient-to-l from-blue-600/60 to-red-600/60" />

                    {/* Content */}
                    <main className="relative z-10 flex h-full w-full items-start justify-start">
                        <img src={logo} alt="" />
                    </main>
                </div>
            </div>
        </>
    );
}
