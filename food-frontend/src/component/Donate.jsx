import { NavLink } from 'react-router-dom'
import { Route, Routes } from 'react-router-dom'
import { useInView } from "react-intersection-observer";
import { useState } from "react";
import History from './History';
import Request from './Request';
import Current from './Current';
import './Donate.css'
function Donate() {
    const { ref: donationRef, inView: donationVisible } = useInView({
        threshold: 0.1
    })
    const { ref: currentRef, inView: currentVisible } = useInView({
        threshold: 0.1
    });
    const rawData = localStorage.getItem("userActive");
    let user = null;
    try {
        if (rawData && rawData !== "undefined") {
            user = JSON.parse(rawData);
        }
    } catch (err) {
        console.log("Invalid JSON in localStorage", err);
        user = null;
    }
    const today = new Date().toLocaleDateString();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        location: "",
        food: "",
        expiryDate: "",
        description: ""
    });
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };
    const getRemainingDays = (date) => {
        if (!date) return "";
        const today = new Date();
        const expiry = new Date(date);
        const diff = expiry - today;
        const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
        return days;
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (rawData) {
            const finalData = {
                ...formData,
                name: user.name,
                email: user.email,
                userId: user?.id
            }
            if (!/^\d{10}$/.test(finalData.phone)) {
                alert("Enter valid 10 digit phone number");
                return;
            }
            const today = new Date();
            const selectedDate = new Date(finalData.expiryDate);
            if (selectedDate <= today) {
                alert("Expiry date must be in future");
                return;
            }
            try {
                const res = await fetch("http://localhost:5000/api/donation/donate", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(finalData)
                })
                const data = await res.json()
                if (data.success) {
                    alert("Donation added successfully ✅")
                    resetForm();
                    window.location.href = "/donate/current"
                } else {
                    alert(data.message || "Something went wrong ❌");
                }
            } catch (error) {
                console.log(error)
            }
        } else {
            alert("Login first please")
            window.location.href = "/signin"
            return
        }
    };
    const [key, setKey] = useState(0);
    const resetForm = () => {
        setFormData({
            phone: "",
            location: "",
            food: "",
            expiryDate: "",
            description: ""
        });
        setKey(prev => prev + 1); // force re-render
    };
    return (
        <>
            <div className="mt-[10vh] w-full min-h-screen flex flex-col justify-start items-center pb-[2vh]">
                <h1 className="font-[jost] text-3xl font-semibold my-[1vh] text-orange-400">Donate your excess food here.. </h1>
                <div ref={donationRef} className={`font-[jost] donate w-[90%] h-full mb-[5vh] ${donationVisible ? "showD" : ""}`}>
                    <form
                        key={key}
                        onSubmit={handleSubmit}
                        className="shadow-xl text-white rounded-2xl p-[3vh] w-full bg-[#1e1e1e] space-y-6"
                    >
                        <div className="bg-[#2a2a2a] flex justify-between items-center rounded-xl px-6 py-2 text-sm text-gray-300">
                            <h3>{user ? `Name : ${user.name}` : "Login first!"}</h3>
                            <h3>{user ? `• ${today}` : ""}</h3>
                            <h3>{user ? `Email : ${user.email}` : ""}</h3>
                        </div>
                        <div className="flex justify-between gap-10">
                            <div className="w-full">
                                <h3 className="text-orange-400 mb-2 text-sm tracking-wide">Pickup Details</h3>
                                <input
                                    name="location"
                                    placeholder="Pickup location"
                                    className="text-sm w-full bg-transparent border-b border-gray-600 focus:border-orange-400 outline-none py-2 mb-4 transition"
                                    onChange={handleChange}
                                    required
                                />
                                <h3 className="text-orange-400 mb-2 text-sm tracking-wide">Expiry date</h3>
                                <input
                                    name="expiryDate"
                                    type="date"
                                    className="text-sm w-full bg-transparent border-b border-gray-600 focus:border-orange-400 outline-none py-2 transition"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="w-full flex flex-col justify-between">
                                <div className="w-full">
                                    <h3 className="text-orange-400 mb-2 text-sm tracking-wide">Personal Info</h3>
                                    <input
                                        name="phone"
                                        placeholder="Phone number"
                                        className="text-sm w-full bg-transparent border-b border-gray-600 focus:border-orange-400 outline-none py-2 transition"
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                {formData.expiryDate && (
                                    <p className="text-orange-400 text-sm bg-[#353535] p-[1vh] rounded font-[jost]">
                                        ⏳ Shelf Life: {getRemainingDays(formData.expiryDate)} days
                                    </p>
                                )}
                            </div>
                        </div>
                        <div>
                            <h3 className="text-orange-400 mb-2 text-sm tracking-wide">Food Info</h3>
                            <input
                                name="food"
                                placeholder="Food type (Rice, Bread...)"
                                className="text-sm w-full bg-transparent border-b border-gray-600 focus:border-orange-400 outline-none py-2 mb-5 transition"
                                onChange={handleChange}
                                required
                            />
                            <textarea
                                name="description"
                                placeholder="Describe quantity, condition..."
                                className="text-sm w-full bg-[#2a2a2a] border border-gray-700 focus:border-orange-400 outline-none rounded-lg p-1 h-[12vh] transition"
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="w-full flex gap-[5vw]">
                            <button
                                type="submit"
                                className="w-[94%] bg-orange-500 hover:bg-orange-600 py-3 rounded-xl font-semibold transition duration-300 hover:scale-[1.01]"

                            >
                                Submit Donation
                            </button>
                            <button
                                onClick={resetForm}
                                className="w-[6%] flex justify-center items-center bg-orange-500 hover:bg-orange-600 py-3 rounded-xl font-semibold transition duration-300 hover:scale-[1.01]"

                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                                </svg>

                            </button>
                        </div>

                    </form>

                </div>
                <div ref={currentRef} className={`current w-[90%] h-full ${currentVisible ? "showC" : ""}`}>
                    <div className="w-full h-full bg-[#1e1e1e] p-[1vh] rounded-t-xl flex justify-evenly items-center gap-[1vw]">
                        <NavLink to="/donate/current" className={({ isActive }) => `${isActive ? "bg-[#353535]" : "bg-none"} w-full rounded-xl font-[jost] text-gray-300 flex justify-center items-center hover:bg-[#353535]`}>
                            Your current listing
                        </NavLink>
                        <NavLink to="/donate/history" className={({ isActive }) => `${isActive ? "bg-[#353535]" : "bg-none"} w-full rounded-xl font-[jost] text-gray-300 flex justify-center items-center hover:bg-[#353535]`}>
                            History
                        </NavLink>
                    </div>
                    <div className="w-full min-h-[80vh] rounded-b-xl bg-[#1e1e1e] p-[1vh]">
                        <Routes>
                            <Route path="/current" element={<Current />} />
                            <Route path="/history" element={<History />} />
                        </Routes>
                    </div>
                    <button
                        onClick={() => {
                            window.scrollTo(0, 0);
                            return null;
                        }}
                        className="w-[10vh] h-[10vh] flex justify-center items-center hover:bg-orange-600 bg-orange-400 rounded-full absolute top-[75vh] left-[86vw]">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-white">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18" />
                        </svg>
                    </button>
                </div>
                <div className='w-full h-full mt-[2vh] flex justify-center items-center'>
                    <Request />
                </div>
            </div>
        </>
    )
}
export default Donate;