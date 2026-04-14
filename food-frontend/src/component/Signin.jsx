import { useState } from "react";
import { Link } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import logo from '../assets/logo.png'
import sigin from '../assets/signin.png'
import Loader from "./Loader";
import './Signin.css'
function Signin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loader, setLoader] = useState(false);
    const handleExistUser = async (e) => {
        e.preventDefault()
        if (!email) {
            alert("Please enter email!")
            return
        }
        if (!password) {
            alert("Please enter password!")
            return
        }
        try {
            setLoader(true)
            const res = await fetch("https://feed-link-app-1.onrender.com/api/auth/signin", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email,
                    password
                })
            })
            const data = await res.json()
            if (data.success) {
                setLoader(false)
                localStorage.setItem("userActive", JSON.stringify(data));
                window.location.href = "/";
            } else {
                setLoader(false)
                alert(data.message);
            }
        } catch (error) {
            console.log("Error:" + error)
        }
    }
    const { ref: refsignin, inView: SigninVisible } = useInView({
        threshold: 0.15
    })
    return (
        <>
            <div className="bg-[#E0E0E0] mt-[10vh] flex flex-col items-center justify-center min-h-[91vh] px-4">
                <div
                    ref={refsignin}
                    className={`signin ${SigninVisible ? "showSi" : ""} bg-white h-auto lg:h-[80vh] w-full lg:w-[68vw] rounded-[2vh] flex flex-col lg:flex-row items-center justify-between p-4 lg:p-2 shadow-2xl`}>
                    <div className="h-full w-full lg:w-[50%] p-5 lg:p-10 flex flex-col items-center justify-between gap-6">
                        <img className="h-[8vh] w-auto lg:h-[10vh] lg:w-[6vw]" src={logo} alt="logo" />
                        <div className="text-center lg:text-left">
                            <h1 className="font-bold text-2xl lg:text-3xl text-[#202322]">
                                Welcome Back
                            </h1>
                            <p className="text-[#6E6D7E] text-[1.6vh] lg:text-[1.8vh] font-semibold">
                                Hey, welcome back to user.
                            </p>
                        </div>
                        <form
                            onSubmit={handleExistUser}
                            className="flex flex-col justify-evenly h-auto lg:h-[40%] items-center lg:items-start w-full gap-3"
                        >
                            <input
                                className="w-full lg:w-60 border border-[#BEBEC2] h-10 p-3 text-sm rounded"
                                type="email"
                                placeholder="example@email.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <input
                                className="w-full lg:w-60 border border-[#BEBEC2] h-10 p-3 text-sm rounded"
                                type="password"
                                placeholder="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button
                                type="submit"
                                className="bg-linear-to-r from-orange-400 to-[#f9a825] hover:from-[#f9a825] hover:to-orange-400 text-white text-sm p-2 font-semibold rounded w-full lg:w-60 transition duration-300 flex items-center justify-center"
                            >
                                {loader ? <Loader /> : "Signin"}
                            </button>
                        </form>
                        <p className="text-[1.8vh] text-[#6E6D7E] text-center lg:text-left">
                            Don't have an account?{" "}
                            <Link to="/signup" className="text-orange-400 font-semibold">
                                Sign up
                            </Link>
                        </p>
                    </div>
                    <img
                        className="hidden lg:block h-full w-[40%] rounded-[1vh]"
                        src={sigin}
                        alt="login"
                    />

                </div>
            </div>
        </>
    )
}
export default Signin;
