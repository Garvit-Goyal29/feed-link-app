import React from "react"
import { Link } from "react-router-dom"
import { useState } from "react";
import { useInView } from "react-intersection-observer";
import signImg from '../assets/signupimg.png'
import Loader from "./Loader";
import './Signup.css'
function Signup() {
    const { ref: refsignup, inView: signupVisiblep } = useInView({
        threshold: 0.15
    })
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPass] = useState("");
    const [cpassword, setCpass] = useState("");
    const [loader, setloader] = useState(false);
    const handleNewUserRegistration = async (e) => {
        e.preventDefault();

        if(((name.length < 3 || name.length > 30))){
            alert("Please use valid or correct name")
            return
        }
        if(/\d/.test(name)){
            alert("Please use valid or correct name")
            return
        }
        if (!email || !password || !name || !cpassword || !phone) {
            alert("Please fill in all fields");
            return;
        }

        if(!/^\d{10}$/.test(phone)){
            alert("Please enter a valid 10-digit phone number")
            return
        }

        if(password.length < 8){
            alert("Please create password of minimum length 8")
            return
        }

        if (password !== cpassword) {
            alert("Passwords do not match");
            return;
        }

        try {
            setloader(true)
            const res = await fetch("https://feed-link-app-1.onrender.com/api/auth/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name,
                    email,
                    phone,
                    password
                })
            });

            const data = await res.json();

            if (data.success) {
                setloader(false)
                alert("Signup Successful ✅");
                window.location.href = "/signin";
            } else {
                setloader(false)
                alert(data.message);
            }

        } catch (error) {
            console.log("Error:", error);
        }
    };
    return (
        <>
            <div className="min-h-[91vh] mt-[10vh] w-full bg-[#E0E0E0] flex flex-col items-center justify-center">
                <div ref={refsignup} className={`signup ${signupVisiblep ? "showSu" : ""} bg-white h-[80vh] w-[68vw] rounded-[2vh] flex items-center justify-center p-2 shadow-gray-500 shadow-2xl`}>
                    <div className='w-[64%] h-full flex flex-col items-center justify-evenly p-2'>
                        <div className='flex flex-col items-center justify-center'>
                            <h1 className='font-bold text-3xl text-[#1e1e1e]'>Create your account</h1>
                            <p className='text-orange-400 text-[5vh] font-semibold'>FeedLink</p>
                        </div>
                        <form onSubmit={handleNewUserRegistration}
                            className='flex w-full flex-col justify-center items-center gap-6'>
                            <input
                                type="text"
                                placeholder="Full Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="h-[6vh] w-[80%] border border-[#BEBEC2] rounded-[1vh] pl-4"
                            />

                            <input
                                type="email"
                                placeholder="Email Address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="h-[6vh] w-[80%] border border-[#BEBEC2] rounded-[1vh] pl-4"
                            />

                            <input
                                type="text"
                                placeholder="Phone Number (10 digits)"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="h-[6vh] w-[80%] border border-[#BEBEC2] rounded-[1vh] pl-4"
                            />

                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPass(e.target.value)}
                                className="h-[6vh] w-[80%] border border-[#BEBEC2] rounded-[1vh] pl-4"
                            />

                            <input
                                type="password"
                                placeholder="Confirm Password"
                                value={cpassword}
                                onChange={(e) => setCpass(e.target.value)}
                                className="h-[6vh] w-[80%] border border-[#BEBEC2] rounded-[1vh] pl-4"
                            />
                            <button type="submit"
                                className='flex items-center justify-center h-[6vh] w-[80%] bg-linear-to-r from-orange-400 to-[#f9a825] hover:bg-linear-to-r hover:from-[#f9a825] hover:to-orange-400 rounded-[1vh] text-white font-bold text-[2vh]'>{loader?(<Loader/>):("Signup")}</button>
                        </form>
                        <div>
                            <p className='text-[2vh] text-[#6E6D7E]'>Already have an account? <Link to="/signin" className='text-orange-400 font-semibold'>Sign in</Link></p>
                        </div>
                    </div>
                    <img className='w-[40%] h-full rounded-[1vh] border-orange-300 border-2' src={signImg} alt="" />
                </div>
            </div>
        </>
    )
}
export default Signup;
