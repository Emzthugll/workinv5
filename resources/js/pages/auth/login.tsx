import googlelogo from '@/assets/images/google.png';
import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import AuthLayout from '@/layouts/auth-layout';
import { register } from '@/routes';
import { store } from '@/routes/login';
import { request } from '@/routes/password';
import { Form, Head } from '@inertiajs/react';

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
    canRegister: boolean;
}

export default function Login({
    status,
    canResetPassword,
    canRegister,
}: LoginProps) {
    return (
        <AuthLayout>
            <Head title="Log in" />

            <Form
                {...store.form()}
                resetOnSuccess={['password']}
                className="flex flex-col gap-4"
            >
                {({ processing, errors }) => (
                    <>
                        <div className="grid gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email address</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    name="email"
                                    required
                                    autoFocus
                                    tabIndex={1}
                                    autoComplete="email"
                                    placeholder="email@example.com"
                                />
                                <InputError message={errors.email} />
                            </div>

                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Password</Label>
                                    {canResetPassword && (
                                        <TextLink
                                            href={request()}
                                            className="ml-auto text-sm"
                                            tabIndex={5}
                                        >
                                            Forgot password?
                                        </TextLink>
                                    )}
                                </div>
                                <Input
                                    id="password"
                                    type="password"
                                    name="password"
                                    required
                                    tabIndex={2}
                                    autoComplete="current-password"
                                    placeholder="Password"
                                />
                                <InputError message={errors.password} />
                            </div>

                            <div className="flex items-center space-x-3">
                                <Checkbox
                                    id="remember"
                                    name="remember"
                                    tabIndex={3}
                                />
                                <Label htmlFor="remember">Remember me</Label>
                            </div>

                            <Button
                                size="lg"
                                type="submit"
                                className="mt-4 w-full cursor-pointer"
                                tabIndex={4}
                                variant={'darkblue'}
                                disabled={processing}
                                data-test="login-button"
                            >
                                {processing && <Spinner />}
                                Log in
                            </Button>
                        </div>
                        {canRegister && (
                            <div className="text-sm text-muted-foreground">
                                Don't have an account yet?{' '}
                                <TextLink
                                    className="hover:text-[#084896]"
                                    href={register()}
                                    tabIndex={5}
                                >
                                    Register here
                                </TextLink>
                            </div>
                        )}

                        <div className="my-1 flex items-center">
                            <hr className="flex-grow border-t border-gray-300 dark:border-gray-600" />
                            <span className="mx-2 text-sm text-gray-500 dark:text-gray-400">
                                or continue with
                            </span>
                            <hr className="flex-grow border-t border-gray-300 dark:border-gray-600" />
                        </div>

                        <div className="flex justify-center">
                            <Button
                                size="lg"
                                variant="outline"
                                className="mt-2 flex w-full items-center justify-center gap-2 cursor-pointer"
                                type="button"
                            >
                                <img
                                    src={googlelogo}
                                    alt="Google"
                                    className="h-5 w-5"
                                />
                                <span>Continue with Google</span>
                            </Button>
                        </div>
                    </>
                )}
            </Form>

            {status && (
                <div className="mb-4 text-center text-sm font-medium text-green-600">
                    {status}
                </div>
            )}
        </AuthLayout>
    );
}
