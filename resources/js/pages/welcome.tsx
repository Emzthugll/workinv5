import Background from '@/assets/images/background.jpg';
import logo from '@/assets/images/workin.webp';
import { login, register } from '@/routes';
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

            <div className="relative flex h-screen w-screen overflow-hidden">
                <img
                    src={Background}
                    alt="Background"
                    className="absolute inset-0 h-full w-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/50 to-red-500/50 backdrop-blur-[3px]" />

                <main className="relative z-10 flex h-full w-full flex-col items-center justify-center px-6 text-center text-white">
                    <img src={logo} alt="Logo" className="mb-6 h-25 w-auto" />

                    <div className="flex w-full max-w-xs flex-col items-center gap-4">
                        <h1 className="text-sm leading-snug font-semibold">
                            Mattaginayon a pagsapulan, ditoy workIN mo a
                            masarakan. Start your job search journey!
                        </h1>

                        <Link
                            href={login()}
                            className="mt-4 w-full rounded-lg bg-[#084896] py-3 font-semibold text-white shadow-md transition hover:opacity-90"
                        >
                            Log in
                        </Link>

                        <div className="my-1 flex w-full items-center">
                            <hr className="flex-grow border-white/40" />
                            <span className="px-4 text-sm text-white/90">
                                or
                            </span>
                            <hr className="flex-grow border-white/40" />
                        </div>

                        {canRegister && (
                            <Link
                                href={register()}
                                className="w-full rounded-lg bg-[#084896] py-3 font-semibold text-white shadow-md transition hover:opacity-90"
                            >
                                Create Account
                            </Link>
                        )}
                    </div>

                    <div className="mt-8 flex flex-col items-center gap-2 text-sm text-white/90">
                        <div className="flex gap-6">
                            <Link href="#" className="hover:underline">
                                Privacy Policy
                            </Link>
                            <Link href="#" className="hover:underline">
                                How It Works
                            </Link>
                            <Link href="#" className="hover:underline">
                                About Us
                            </Link>
                        </div>

                        <div className="mt-4 text-center text-xs leading-relaxed text-white/80">
                            Powered by the Information Technology Office
                            <br />
                            Official website of the Provincial Government of
                            Ilocos Norte.
                            <br />
                            All rights reserved.
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}
