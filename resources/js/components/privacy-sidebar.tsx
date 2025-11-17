import BagongPilipinasLogo from '@/assets/images/bagong-pilipinas.png';
import ProvincialLogo from '@/assets/images/logo.png';
import PesoLogo from '@/assets/images/peso-logo.png';
import { Link, usePage } from '@inertiajs/react';
import React, { useState } from 'react';

interface MenuItem {
    name: string;
    href: string;
}

const menuItems: MenuItem[] = [
    { name: 'Privacy Policy', href: '/privacy-policy' },
    { name: 'How It Works', href: '/how-it-works' },
    { name: 'About Us', href: '/about-us' },
];

const PrivacySidebar: React.FC = () => {
    const { url } = usePage();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <div className="fixed top-4 left-4 z-50 sm:hidden">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="text-2xl font-bold text-gray-700"
                >
                    ☰
                </button>
            </div>

            {/* Sidebar */}
            <aside
                className={`fixed top-0 left-0 z-50 flex h-screen w-60 flex-col justify-between border-r-2 bg-gray-100 p-4 transition-transform duration-300 md:w-100 lg:w-120 ${isOpen ? 'translate-x-0' : '-translate-x-full'} sm:relative sm:translate-x-0`}
            >
                {/* Close button on mobile */}
                <div className="mb-2 flex justify-end sm:hidden">
                    <button
                        onClick={() => setIsOpen(false)}
                        className="text-xl font-bold text-gray-700"
                    >
                        ×
                    </button>
                </div>

                {/* Links */}
                <div className="mt-18 flex flex-1 flex-col">
                    <ul className="flex w-full flex-col space-y-1">
                        {menuItems.map((item) => {
                            const isActive = url === item.href;
                            return (
                                <li
                                    key={item.href}
                                    className="relative flex w-full justify-end"
                                >
                                    <div className="flex items-center">
                                        
                                        {isActive && (
                                            <span className="mr-1 h-[70%] w-[3px] rounded bg-[#084896]" />
                                        )}

                                        <Link
                                            href={item.href}
                                            className={`block py-1 text-left text-sm transition ${
                                                isActive
                                                    ? 'font-semibold text-[#084896]'
                                                    : 'text-[#084896] hover:bg-gray-100'
                                            }`}
                                            onClick={() => setIsOpen(false)}
                                        >
                                            {item.name}
                                        </Link>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                </div>

                {/* Footer */}
                <footer className="mt-4 text-center text-gray-500">
                    <div className="mb-2 flex flex-wrap justify-center gap-4">
                        <img
                            src={ProvincialLogo}
                            alt="Logo 1"
                            className="h-10 w-auto sm:h-12 md:h-15"
                        />
                        <img
                            src={BagongPilipinasLogo}
                            alt="Logo 2"
                            className="h-12 w-auto sm:h-16 md:h-20"
                        />
                        <img
                            src={PesoLogo}
                            alt="Logo 3"
                            className="h-10 w-auto sm:h-12 md:h-15"
                        />
                    </div>
                    <div className="space-y-1 text-[10px]">
                        <p>Powered by the Information Technology Office</p>
                        <p>
                            Official website of the Provincial Government of
                            Ilocos Norte.
                        </p>
                        <p>All rights reserved.</p>
                    </div>
                </footer>
            </aside>

            
            {isOpen && (
                <div
                    className="fixed inset-0 z-40 bg-[#084896]/30 backdrop-blur-md sm:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}
        </>
    );
};

export default PrivacySidebar;
