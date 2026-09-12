import { useEffect, useState } from "react";
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';
import { getUser } from '../utils/auth'

function Request({ onAccepted }) {
    const [request, setRequest] = useState([]);
    const user = getUser();

    useEffect(() => {
        if (!user?.id) return;
        fetch('http://localhost:5000/api/donation/pending-requests', {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then(res => res.json())
            .then(data => setRequest(data.data))
            .catch(err => console.log(err));
    }, [user?.id]);

    const acceptRequest = async (id) => {
        try {
            const res = await fetch(`http://localhost:5000/api/donation/${id}/accept`, {
                method: "PATCH",
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            })
            const data = await res.json();
            if (data.success) {
                alert("Request accepted successfully ✅")
                setRequest(prev => prev.filter(r => r._id !== id));
                // Immediately refresh Current listing in parent
                if (onAccepted) onAccepted();
            } else {
                alert(data.message || "Something went wrong ❌");
            }
        } catch (err) {
            console.log(err);
        }
    }

    const rejectRequest = async (id) => {
        try {
            const res = await fetch(`http://localhost:5000/api/donation/${id}/reject`, {
                method: "PATCH",
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            })
            const data = await res.json();
            if (data.success) {
                alert("Request rejected ❌")
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
                    <p className="text-gray-400 text-center w-full">No pending requests on your donations yet!</p>
                ) : (
                    request.map((req) => (
                        <div
                            key={req._id}
                            className="bg-[#2a2a2a] p-4 w-[48%] rounded-xl text-white shadow"
                        >
                            <h2 className="text-white font-bold">Requested by: <span className="text-orange-400">{req.receiverName || "Unknown"}</span></h2>
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

