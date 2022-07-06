import { useRouter } from "next/router";
import Link from 'next/link';

import { useForm } from "react-hook-form";

import {  } from "../../schema/user.schema";
import { trpc } from "../../utils/trpc";

function Login() {

    const { register, handleSubmit } = useForm();

    const router = useRouter();

    /* const { mutate, error } = trpc.useMutation(["users/register-user"], {
        onSuccess: () => {
            router.push("/login");
        }
    }) */

    const handleSubmitForm = () => {
        //mutate(data);
    }

    return (
        <div>
            <h1>Login</h1>
            {/* error && <div>{error.message}</div> */}
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