import BPLogo from '@/assets/images/bagong-pilipinas.png';
import ProvincialLogo from '@/assets/images/logo.png';
import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="mt-10 w-full bg-[#084896] py-8 text-white">
            {/* Top Info Sections */}
            <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 sm:flex-row sm:justify-between">
                {/* About Us */}
                <div className="flex-1 text-center sm:text-left">
                    <h4 className="mb-2 text-lg font-semibold">About Us</h4>
                    <p className="text-sm opacity-90">
                        workIN is the official job search portal of the
                        Provincial Government of Ilocos Norte.
                    </p>
                </div>

                {/* Visit Us */}
                <div className="flex-1 text-center sm:text-left">
                    <h4 className="mb-2 text-lg font-semibold">Visit Us</h4>
                    <p className="text-sm opacity-90">
                        Provincial Government of Ilocos Norte
                        <br />
                        Public Employment Services Office
                        <br />
                        West Wing Capitol Building, Laoag City
                    </p>
                </div>

                {/* Contact Us */}
                <div className="flex-1 text-center sm:text-left">
                    <h4 className="mb-2 text-lg font-semibold">Contact Us</h4>
                    <p className="text-sm opacity-90">
                        Tel. No. 772-1212 local 152
                        <br />
                        Email:{' '}
                        <a
                            href="mailto:peso@ilocosnorte.gov.ph"
                            className="underline"
                        >
                            peso@ilocosnorte.gov.ph
                        </a>
                    </p>
                </div>
            </div>

            {/* Social Links */}
            <div className="mt-6 flex justify-center gap-4">
                <a
                    href="https://www.facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <svg
                        className="h-6 w-6 cursor-pointer opacity-90 transition hover:opacity-100"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.129 8.438 9.878v-6.987H7.898v-2.89h2.54V9.845c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562v1.873h2.773l-.443 2.89h-2.33V21.88C18.343 21.13 22 16.99 22 12z" />
                    </svg>
                </a>
            </div>

            {/* Divider */}
            <div className="mt-6 border-t border-white/20"></div>

            {/* Bottom Logos + Copyright */}
            <div className="mx-auto mt-4 flex max-w-6xl flex-col items-start gap-4 px-4 sm:flex-row sm:items-center sm:justify-between">
                {/* Logos */}
                <div className="flex gap-6">
                    <img
                        src={BPLogo}
                        alt="Bagong Pilipinas Logo"
                        className="h-12"
                    />
                    <img
                        src={ProvincialLogo}
                        alt="Provincial Logo"
                        className="h-12"
                    />
                </div>

                {/* Copyright */}
                <div className="text-center text-xs opacity-80 sm:text-right">
                    © 2025 WorkIN. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
