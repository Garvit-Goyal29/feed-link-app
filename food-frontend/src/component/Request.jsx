import { useEffect, useState } from "react";
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';
import API_URL from '../config/api';
function Request() {
    const [request, setRequest] = useState([]);
    const [user, setUser] = useState(null);
    useEffect(() => {
        fetch(`${API_URL}/api/auth/me`, { credentials: "include" })
            .then(res => res.json())
            .then(data => {
                if (data.success) setUser(data.user);
                else setUser(null);
            })
            .catch(() => setUser(null));
    }, []);
    useEffect(() => {
        if (!user?.id) return;
        fetch(`${API_URL}/api/donation/request?userId=${user.id}`, {
            credentials: "include"
        })
            .then(res => res.json())
            .then(data => {
                setRequest(data.data || []);
            })
            .catch(err => console.log(err));
    }, [user?.id]);
    const acceptRequest = async (id) => {
        try {
            const res = await fetch(`${API_URL}/api/donation/acceptRequest`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ id })
            })
            const data = await res.json();
            if (data.success) {
                alert("Request accepted successfully ✅")
                setRequest(prev => prev.filter(r => r._id !== id));
            } else {
                alert(data.message || "Something went wrong ❌");
            }
        } catch (err) {
            console.log(err);
        }
    }
    const rejectRequest = async (id) => {
        try {
            const res = await fetch(`${API_URL}/api/donation/rejectRequest`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ id })
            })
            const data = await res.json();
            if (data.success) {
                alert("Request rejected! ❌")
                setRequest(prev => prev.filter(r => r._id !== id));
            } else {
                alert(data.message || "Something went wrong ❌");
            }
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <>
            <div className="bg-[#1e1e1e] w-[90%] h-full rounded-xl flex justify-between items-center gap-4 p-4 flex-wrap">
                {request.length === 0 ? (
                    <p className="text-gray-400 text-center w-full">No donation list by you yet! <br />Tap on up button to list excess food.</p>
                ) : (
                    request.map((req) => (
                        <div
                            key={req._id}
                            className="bg-[#2a2a2a] p-4 w-[48%] rounded-xl text-white shadow"
                        >
                            <h2 className="text-white font-bold">Name : {req.name}</h2>
                            <h2 className="text-orange-400 font-semibold">
                                Food : {req.food}
                            </h2>
                            <p>📍 {req.location}</p>
                            <p>⏳ Expiry: {new Date(req.expiryDate).toLocaleDateString("en-GB")}</p>
                            <p className="text-sm text-gray-400">
                                {req.description}
                            </p>
                            <div className="flex bg-[#353535] w-[50%] rounded justify-evenly items-center">
                                <CheckCircleIcon
                                    onClick={() => acceptRequest(req._id)}
                                    className="w-6 h-6 text-green-500 cursor-pointer" />
                                <XCircleIcon
                                    onClick={() => rejectRequest(req._id)}
                                    className="w-6 h-6 text-red-500 cursor-pointer" />
                            </div>
                        </div>
                    ))
                )}
            </div>
        </>
    )
}
export default Request;
