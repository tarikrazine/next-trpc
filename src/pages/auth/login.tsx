import dynamic from "next/dynamic";

const Login = dynamic(() => import("../../component/Login"), {
    ssr: false
})

function LoginPage() {

    return (
        <div>
            <Login />
        </div>
    )
}

export default LoginPage;