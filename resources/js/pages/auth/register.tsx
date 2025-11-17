import googlelogo from '@/assets/images/google.png';
import { login } from '@/routes';
import { store } from '@/routes/register';
import { Form, Head } from '@inertiajs/react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import AuthLayout from '@/layouts/auth-layout';

export default function Register() {
    return (
        <AuthLayout>
            <Head title="Register" />

            <Form
                {...store.form()}
                resetOnSuccess={['password', 'password_confirmation']}
                disableWhileProcessing
                className="flex flex-col gap-6"
            >
                {({ processing, errors }) => (
                    <>
                        <div className="grid gap-5">
                            <div className="grid gap-2">
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    required
                                    autoFocus
                                    tabIndex={1}
                                    autoComplete="name"
                                    name="name"
                                    placeholder="Full name"
                                />
                                <InputError
                                    message={errors.name}
                                    className="mt-2"
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="email">Email address</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    required
                                    tabIndex={2}
                                    autoComplete="email"
                                    name="email"
                                    placeholder="email@example.com"
                                />
                                <InputError message={errors.email} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    required
                                    tabIndex={3}
                                    autoComplete="new-password"
                                    name="password"
                                    placeholder="Password"
                                />
                                <InputError message={errors.password} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="password_confirmation">
                                    Confirm Password
                                </Label>
                                <Input
                                    id="password_confirmation"
                                    type="password"
                                    required
                                    tabIndex={4}
                                    autoComplete="new-password"
                                    name="password_confirmation"
                                    placeholder="Confirm password"
                                />
                                <InputError
                                    message={errors.password_confirmation}
                                />
                            </div>

                            <div className="text-start text-sm text-muted-foreground">
                                Already have an account?{' '}
                                <TextLink
                                    className="hover:text-[#084896]"
                                    href={login()}
                                    tabIndex={6}
                                >
                                    Log in
                                </TextLink>
                            </div>

                            <Button
                                size="lg"
                                type="submit"
                                className="w-full cursor-pointer"
                                variant="darkblue"
                                tabIndex={5}
                                data-test="register-user-button"
                            >
                                {processing && <Spinner />}
                                Create account
                            </Button>

                            <div className="flex items-center">
                                <hr className="flex-grow border-t border-gray-300 dark:border-gray-600" />
                                <span className="mx-2 text-sm text-gray-500 dark:text-gray-400">
                                    or continue with
                                </span>
                                <hr className="flex-grow border-t border-gray-300 dark:border-gray-600" />
                            </div>

                            <Button
                                size="lg"
                                variant="outline"
                                className="flex w-full cursor-pointer items-center justify-center gap-2"
                                type="button"
                            >
                                <img
                                    src={googlelogo}
                                    alt="Google"
                                    className="h-5 w-5"
                                />
                                Google
                            </Button>
                        </div>
                    </>
                )}
            </Form>
        </AuthLayout>
    );
}
