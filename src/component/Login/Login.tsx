import { useState } from "react";

import Link from 'next/link';
import { useRouter } from "next/router";

import { useForm } from "react-hook-form";

import { RequestOTPInput } from "../../schema/user.schema";
import { trpc } from "../../utils/trpc";

const TokenVerification = ({ hash }: { hash: string }) => {
    const router = useRouter();

    const { data, isLoading } = trpc.useQuery(["users.verify-opt", { hash }]);

    if (isLoading) {
        return <p>Verification token...</p>;
    }

    router.push(`${data?.redirect.includes('login') ? '/' : data?.redirect || '/'}`)

    return (
        <p>Redirecting...</p>
    )
};

function Login() {

    const [success, setSuccess] = useState(false)

    const { register, handleSubmit } = useForm<RequestOTPInput>();

    const router = useRouter();

    const { mutate, error } = trpc.useMutation(["users.request-otp"], {
        onSuccess: () => {
            setSuccess(true)
        }
    })

    const handleSubmitForm = (data: RequestOTPInput) => {
        mutate({...data, redirect: router.asPath});
    }

    const hash = router.asPath.split("#token=")[1];

    if (hash) {
        return <TokenVerification hash={hash} />
    }

    return (
        <div>
            <h1>Login</h1>
            {error && <div>{error.message}</div>}
            {success && <div>Please check your email</div>}
            <br/>
            <form onSubmit={handleSubmit(handleSubmitForm)}>
                <label>Email</label>
                <input type="email" placeholder="johndoe@example.com" {...register('email')}/>
                <br/>
                <button type="submit">Login</button>
            </form>
            <br/>
            <Link href='/auth/register'>Register</Link>
        </div>
    )
}

export default Login;
