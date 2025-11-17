import PrivacySidebar from '@/components/privacy-sidebar';
import React from 'react';

const PrivacyPolicy: React.FC = () => {
    return (
        <div className="flex h-screen overflow-hidden">
            {/* Sidebar */}
            <PrivacySidebar />

            {/* Main content */}
            <main className="flex flex-1 flex-col overflow-hidden">
                <header className="ml-5 flex w-full items-start justify-start py-4">
                    <h1 className="ml-5 text-2xl font-bold text-[#084896]">
                        Privacy Policy
                    </h1>
                </header>

                {/* Scrollable page content */}
                <div className="ml-5 max-w-4xl flex-1 overflow-auto p-6">
                    <p className="mb-4">
                        Welcome to WorkIN, the official job search portal of the
                        Provincial Government of Ilocos Norte. Your privacy is
                        important to us. This Privacy Policy outlines how we
                        collect, use, and protect your personal information in
                        compliance with Philippine laws, including the{' '}
                        <strong> Data Privacy Act of 2012 (RA 10173)</strong>.
                    </p>

                    <h2 className="mt-6 mb-2 text-xl font-semibold">
                        1. Information We Collect
                    </h2>
                    <ul className="mb-4 list-inside list-disc space-y-1">
                        <li>
                            <strong>Personal Information:</strong> Name, contact
                            details (email, phone number), address, and other
                            information you provide when creating an account or
                            applying for jobs.
                        </li>
                        <li>
                            <strong>Job Preferences:</strong> Employment
                            history, educational background, skills, and other
                            job-related details you provide.
                        </li>
                        <li>
                            <strong>Usage Data:</strong> IP address, browser
                            type, device information, and activity on the
                            portal.
                        </li>
                    </ul>

                    <h2 className="mt-6 mb-2 text-xl font-semibold">
                        2. How We Use Your Information
                    </h2>
                    <ul className="mb-4 list-inside list-disc space-y-1">
                        <li>
                            Facilitate your job search and application process.
                        </li>
                        <li>Connect you with potential employers.</li>
                        <li>
                            Improve and personalize your experience on WorkIN.
                        </li>
                        <li>
                            Communicate important updates, job opportunities, or
                            system changes.
                        </li>
                    </ul>

                    <h2 className="mt-6 mb-2 text-xl font-semibold">
                        3. Legal Basis for Processing
                    </h2>
                    <p className="mb-4">
                        We process your personal information in accordance with
                        the{' '}
                        <strong> Data Privacy Act of 2012 (RA 10173)</strong>{' '}
                        and other applicable Philippine laws. The collection and
                        use of your data are based on your consent, compliance
                        with legal obligations, or legitimate government and
                        organizational interests.
                    </p>

                    <h2 className="mt-6 mb-2 text-xl font-semibold">
                        4. Sharing of Information
                    </h2>
                    <p className="mb-2">
                        Your personal information may be shared with:
                    </p>
                    <ul className="mb-4 list-inside list-disc space-y-1">
                        <li>
                            <strong>Employers:</strong> When you apply for a
                            job, your details are shared with the hiring
                            organization.
                        </li>
                        <li>
                            <strong>Service Providers:</strong> Third-party
                            services that help us operate the portal, such as
                            hosting or analytics tools.
                        </li>
                        <li>
                            <strong>Government Agencies:</strong> When required
                            by law or to comply with legal processes.
                        </li>
                    </ul>
                    <p className="mb-4">
                        We do not sell or share your personal data with
                        unauthorized third parties.
                    </p>

                    <h2 className="mt-6 mb-2 text-xl font-semibold">
                        5. Data Security
                    </h2>
                    <p className="mb-4">
                        We implement organizational, physical, and technical
                        security measures as required by the{' '}
                        <strong>Data Privacy Act of 2012</strong> to protect
                        your information from unauthorized access, alteration,
                        or disclosure. However, no system is completely secure,
                        and we cannot guarantee absolute security.
                    </p>

                    <h2 className="mt-6 mb-2 text-xl font-semibold">
                        6. Your Rights
                    </h2>
                    <p className="mb-2">
                        Under the <strong> Data Privacy Act of 2012</strong>,
                        you have the right to:
                    </p>
                    <ul className="mb-4 list-inside list-disc space-y-1">
                        <li>Be informed about how your data is processed.</li>
                        <li>Access and update your personal information.</li>
                        <li>
                            Request deletion or correction of inaccurate data.
                        </li>
                        <li>Withdraw consent for us to process your data.</li>
                    </ul>

                    <h2 className="mt-6 mb-2 text-xl font-semibold">
                        7. Changes to This Privacy Policy
                    </h2>
                    <p className="mb-4">
                        We may update this Privacy Policy from time to time to
                        reflect changes in Philippine laws, our practices, or
                        our portal. Changes will be posted on this page, and we
                        encourage you to review it regularly.
                    </p>

                    <h2 className="mt-6 mb-2 text-xl font-semibold">
                        8. Contact Us
                    </h2>
                    <p className="mb-4">
                        If you have any questions or concerns about this Privacy
                        Policy or your data privacy rights, please contact us:
                    </p>
                    <p className="mb-1">
                        <strong>
                            Provincial Public Employment Services Office
                        </strong>
                        <br />
                        <strong>Email: </strong>
                        <a
                            href="mailto:ilocosnortepeso2020@gmail.com"
                            className="text-blue-600"
                        >
                            ilocosnortepeso2020@gmail.com
                        </a>
                        <br />
                        <strong>Phone:</strong> +63 926 708 4834
                    </p>

                    <p className="mt-6">
                        Thank you for trusting WorkIN with your
                        job search needs.
                    </p>
                </div>
            </main>
        </div>
    );
};

export default PrivacyPolicy;
