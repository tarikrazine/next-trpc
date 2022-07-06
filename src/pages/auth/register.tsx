import { useRouter } from "next/router";
import Link from 'next/link';

import { useForm } from "react-hook-form";

import { UserRegisterInput } from "../../schema/user.schema";
import { trpc } from "../../utils/trpc";

function Register() {

    const { register, handleSubmit } = useForm<UserRegisterInput>();

    const router = useRouter();

    const { mutate, error } = trpc.useMutation(["users.register-user"], {
        onSuccess: () => {
            router.push("/auth/login");
        }
    })

    const handleSubmitForm = (data: UserRegisterInput) => {
        mutate(data);
    }

    return (
        <div>
            <h1>Register user</h1>
            {error && <div>{error.message}</div>}
            <br/>
            <form onSubmit={handleSubmit(handleSubmitForm)}>
                <label>Name</label>
                <input type="text" placeholder="John Doe" {...register('name')} />
                <br/>
                <label>Email</label>
                <input type="email" placeholder="johndoe@example.com" {...register('email')}/>
                <br/>
                <button type="submit">Register</button>
            </form>
            <br/>
            <Link href='/auth/login'>Login</Link>
        </div>
    )
}

export default Register;