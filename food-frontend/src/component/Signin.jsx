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
            <div className="bg-[#E0E0E0] mt-[10vh] flex flex-col items-center justify-center min-h-[91vh]">
                <div ref={refsignin} className={`signin ${SigninVisible ? "showSi" : ""} bg-white h-[80vh] w-[68vw] rounded-[2vh] flex items-center justify-between p-2 shadow-2xl`}>

                    <div className="h-full w-[50%] p-10 flex flex-col items-center justify-between">
                        <img className="h-[10vh] w-[6vw]" src={logo} alt="logo" />

                        <div>
                            <h1 className="font-bold text-3xl text-[#202322]">Welcome Back</h1>
                            <p className="text-[#6E6D7E] text-[1.8vh] font-semibold">
                                Hey, welcome back to your special place.
                            </p>
                        </div>

                        <form onSubmit={handleExistUser}
                            className="flex flex-col justify-evenly h-[40%] items-start"
                        >
                            <input
                                className="w-60 border border-[#BEBEC2] h-8 p-3 text-sm rounded"
                                type="email"
                                placeholder="example@email.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />

                            <input
                                className="w-60 border border-[#BEBEC2] h-8 p-3 text-sm rounded"
                                type="password"
                                placeholder="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />

                            <button
                                type="submit"
                                className="bg-linear-to-r from-orange-400 to-[#f9a825] hover:bg-linear-to-r hover:from-[#f9a825] hover:to-orange-400 text-white text-sm p-2 rounded w-full transition duration-300 flex items-center justify-center"
                            >{loader ? (<Loader />) : ("Signin")}
                            </button>
                        </form>

                        <p className="text-[2vh] text-[#6E6D7E]">
                            Don't have an account?{" "}
                            <Link to="/signup" className="text-orange-400 font-semibold">
                                Sign up
                            </Link>
                        </p>
                    </div>

                    <img className="h-full w-[40%] rounded-[1vh]" src={sigin} alt="login" />
                </div>
            </div>
        </>
    )
}
export default Signin;
