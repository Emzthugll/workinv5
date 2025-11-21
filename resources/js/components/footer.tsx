import BPLogo from '@/assets/images/bagong-pilipinas.png';
import ProvincialLogo from '@/assets/images/logo.png';
import { FaFacebookSquare } from 'react-icons/fa';
import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="w-full bg-[#084896] py-8 text-white">
            {/* Top Info Sections */}
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-6 ">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-12">
                    {/* About Us */}
                    <div className="text-center md:text-left">
                        <h4 className="mb-3 text-xl font-semibold">About Us</h4>
                        <p className="text-md leading-relaxed opacity-90">
                            workIN is the official job search portal of the
                            Provincial Government of Ilocos Norte.
                        </p>
                    </div>

                    {/* Visit Us */}
                    <div className="text-center md:text-left">
                        <h4 className="mb-3 text-xl font-semibold">Visit Us</h4>
                        <p className="text-md leading-relaxed opacity-90">
                            Provincial Government of Ilocos Norte
                            <br />
                            Public Employment Services Office
                            <br />
                            West Wing Capitol Building, Laoag City
                        </p>
                    </div>

                    {/* Contact Us */}
                    <div className="text-center md:text-left">
                        <h4 className="mb-3 text-xl font-semibold">
                            Contact Us
                        </h4>
                        <p className="text-md leading-relaxed opacity-90">
                            Tel. No. 772-1212 local 152
                            <br />
                            Email:{' '}
                            <a
                                href="mailto:peso@ilocosnorte.gov.ph"
                                className="underline transition hover:opacity-100"
                            >
                                peso@ilocosnorte.gov.ph
                            </a>
                        </p>

                        {/* Social Links */}
                        <div className="mt-4 flex justify-center gap-4 md:justify-start">
                            <a
                                href="https://www.facebook.com/IlocosNortePESO"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="transition hover:scale-110"
                                aria-label="Facebook"
                            >
                                <FaFacebookSquare size={27} />
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Divider */}
            <div className="mx-auto mt-8 max-w-6xl border-t border-white/20 px-4 sm:px-6 lg:px-6"></div>

            {/* Bottom Logos  */}
            <div className="mx-auto mt-6 flex max-w-6xl flex-col items-center gap-4 px-4 sm:flex-row sm:justify-between sm:px-6 lg:px-6">
                {/* Logos */}
                <div className="flex items-center gap-6">
                    <img
                        src={BPLogo}
                        alt="Bagong Pilipinas Logo"
                        className="h-20 object-contain"
                    />
                    <img
                        src={ProvincialLogo}
                        alt="Provincial Logo"
                        className="h-15 object-contain"
                    />
                </div>

                {/* Copyright */}
                <div className="text-center text-sm opacity-80 sm:text-right">
                    © 2025 WorkIN. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
