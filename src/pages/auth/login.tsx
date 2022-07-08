import dynamic from "next/dynamic";

const LoginForm = dynamic(() => import("../../component/Login"), {
    ssr: false
})

function LoginPage() {

    return (
        <div>
            <LoginForm />
        </div>
    )
}

export default LoginPage;