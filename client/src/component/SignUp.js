import {useState, useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";
import {createUser, doesEmailExists} from "../utils/requests";

export default function SignUp() {
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [email, setEmail] = useState("");
    const [fullName, setFullName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    // 회원가입 폼 제출 처리
    async function handleSubmit(e) {
        try {
            e.preventDefault();

            const _error = {};

            // 이메일 검사
            if(!email.includes('@') || email.trim().length < 5) {
                _error.email = 'E-mail is not valid';
            }

            if(await doesEmailExists(email)) {
                _error.email = 'Email is already in use'
            }

            // 유저이름 유효성 검사
            if(username.trim().length < 5) {
                _error.username = 'Username is too short'
            }

            // 비밀번호 검사
            if(password.trim().length < 5) {
                _error.password = 'Password is too short'
            }

            const isError = Object.keys(_error).length > 0;
            if(isError) {
                throw _error;
            }

            // 회원가입 성공
            await createUser(email, fullName, username, password);
            alert(`Welcome, ${fullName}!`);

            navigate('/');

        } catch(error) {
            console.log(error)
            setError(error);
        }
    }

    // 타이틀 업데이트
    useEffect(() => {
        document.title = "Sign up - Instagram";
    }, [])

    return (
        <form onSubmit={handleSubmit} className="max-w-xs mx-auto p-4 mt-16">
            <div className="mt-4 mb-4 flex justify-center">
                <img src="/images/logo.png" className="w-36" />
            </div>

            <div className="mb-2">
                <label className="block">
                    <input
                        type="text"
                        name="email"
                        className="border px-2 py-1 rounded w-full"
                        onChange={({target}) => setEmail(target.value)}
                        placeholder="Email address"
                    />
                </label>
            </div>

            <div className="mb-2">
                <label className="block">
                    <input
                        type="text"
                        name="fullName"
                        className="border px-2 py-1 rounded w-full"
                        onChange={({target}) => setFullName(target.value)}
                        placeholder="Full Name"
                    />
                </label>
                {error && <p className="text-red-500">{error.email}</p>}
            </div>
            <div className="mb-2">
                <label className="block">
                    <input
                        type="text"
                        name="username"
                        className="border px-2 py-1 rounded w-full"
                        onChange={({target}) => setUsername(target.value)}
                        placeholder="Username"
                    />
                </label>
                {error && <p className="text-red-500">{error.username}</p>}
            </div>

            <div className="mb-2">
                <label className="block">
                    <input
                        type="password"
                        name="password"
                        className="border px-2 py-1 rounded w-full"
                        onChange={({target}) => setPassword(target.value)}
                        placeholder="Password"
                    />
                </label>
                {error && <p className="text-red-500">{error.password}</p>}
            </div>

            <div className="mb-2">
                <button
                    type="submit"
                    className="bg-blue-500 rounded-lg text-sm font-semibold px-4 py-2 text-shite w-full disabled:opacity-50"
                    disabled={!email.trim() || !username.trim() || !password.trim()}
                >
                    Sign up
                </button>
                {error && <p className="text-red-500">{error.message}</p>}
            </div>

            <p className="text-center mt-4">
                Don't have an account ? {" "}
                <Link to="/accounts/login" className="text-blue-500 font-semibold">
                    Login
                </Link>
            </p>
        </form>
    );
}