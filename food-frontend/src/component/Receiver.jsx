import React from "react";
import { useState, useEffect } from "react";
function Receiver() {
    const [food, setFood] = useState([])
    const [phone, setPhone] = useState("")
    const [email, setEmail] = useState("")
    useEffect(() => {
        const rawData = localStorage.getItem("userActive")
        let user = null;
        try {
            if (rawData && rawData !== "undefined") {
                user = JSON.parse(rawData);
                setPhone(user.phone)
                setEmail(user.email)
            }
        } catch (err) {
            console.log("Invalid JSON in localStorage", err);
            user = null;
        }
        if (!user) return;
        try {
            fetch("https://feed-link-app-1.onrender.com/api/receiver")
                .then(res => res.json())
                .then(data => {
                    setFood(data.data);
                    console.log(data)
                }).catch(err => console.log(err));
        } catch (err) {
            console.log(err)
        }
    }, [])
    async function handleRequest(id) {
        try {
            const res = await fetch("https://feed-link-app-1.onrender.com/api/receiver/request", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id,
                    phone,
                    email
                })
            });
            const data = await res.json();
            if (data.success) {
                console.log(data.data)
                setFood(prev =>
                    prev.map(item =>
                        item._id === id ? { ...item, status: "requested" } : item
                    )
                );
            }
        } catch (err) {
            console.log("receiver request pe : " + err + " hai");
        }
    }
    return (
        <>
            <div className="mt-[10vh] flex justify-center items-center flex-col">
                <h1 className="p-[2vh] text-2xl font-[jost]">All available food!</h1>
                <h1>Total {food.length} are available</h1>
                <div className="w-[90vw] min-h-screen border rounded-xl bg-[#1e1e1e] p-[2vh] flex flex-wrap gap-[2vw]">
                    {food.length === 0 ? (
                        <>
                            <h1 className="p-[2vh] text-2xl text-white font-[jost]">Not available! or sign-in/sign-up</h1>
                        </>
                    )
                        :
                        (
                            food.map((details) => (
                                <div
                                    key={details._id}
                                    className="bg-[#2a2a2a] p-4 w-[48%] h-full rounded-xl text-white shadow"
                                >
                                    <h2 className="text-orange-400 font-[jost]">
                                        Name : {details.name}
                                    </h2>
                                    <p>{details.food}</p>
                                    <p>📍 {details.location}</p>
                                    <p>⏳ Expiry: {new Date(details.expiryDate).toLocaleDateString("en-GB")}</p>
                                    <p className="text-sm text-gray-400">
                                        {details.description}
                                    </p>
                                    <button
                                        onClick={() => handleRequest(details._id)}
                                        disabled={details.status === "requested"}
                                        className={`w-full h-7 text-white text-md font-semibold font-[jost] mt-[1vh] p-[0.5vh] rounded transition ${details.status === "requested" ? "bg-gray-500 cursor-not-allowed" : "bg-orange-400 cursor-pointer hover:bg-orange-600"}`}>
                                        {details.status === "requested" ? "Requested" : "Request"}
                                    </button>
                                </div>
                            ))
                        )}
                </div>
            </div>
        </>
    )
}
export default Receiver;
