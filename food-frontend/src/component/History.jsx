import { useEffect, useState } from "react";

function History() {
    const [donations, setDonations] = useState([]);
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

    const fetchHistory = () => {
        if (!user?.id) return;
        fetch(`http://localhost:5000/api/donation/history?userId=${user.id}`)
            .then(res => res.json())
            .then(data => {
                setDonations(data.data);
            })
            .catch(err => console.log(err));
    };

    useEffect(() => {
        fetchHistory();
    }, [user?.id]);

    const markAsCompleted = async (id) => {
        try {
            const res = await fetch(`http://localhost:5000/api/donation/completeRequest`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ id })
            });

            const data = await res.json();
            if (data.success) {
                alert("Donation completed! ✅");
                setDonations(prev =>
                    prev.map(d => d._id === id ? { ...d, status: 'completed' } : d)
                );
            } else {
                alert(data.message || "Failed to mark as completed");
            }

        } catch (err) {
            console.log(err);
            alert("Error updating status");
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'accepted': return 'text-blue-400';
            case 'completed': return 'text-green-400';
            case 'expired': return 'text-red-400';
            default: return 'text-gray-400';
        }
    };

    return (
        <div className="flex justify-between items-start gap-4 p-4 flex-wrap">
            {donations.length === 0 ? (
                <p className="text-gray-400 text-center w-full">No history available yet!</p>
            ) : (
                donations.map((donation) => (
                    <div
                        key={donation._id}
                        className="bg-[#2a2a2a] p-4 w-[48%] rounded-xl text-white shadow relative"
                    >
                        <div className="absolute top-4 right-4">
                            <span className={`text-xs font-bold px-2 py-1 rounded bg-[#1e1e1e] ${getStatusColor(donation.status)}`}>
                                {donation.status.toUpperCase()}
                            </span>
                        </div>
                        <h2 className="text-orange-400 font-semibold mb-2">
                            {donation.food}
                        </h2>
                        <p className="text-sm">📍 {donation.location}</p>
                        <p className="text-sm">📞 {donation.phone}</p>
                        <p className="text-sm text-gray-400 mb-2">
                            {donation.description}
                        </p>
                        {donation.status === "accepted" && (
                            <button
                                onClick={() => markAsCompleted(donation._id)}
                                className="w-full mt-2 bg-blue-500 hover:bg-blue-600 text-white text-xs font-bold py-2 rounded transition"
                            >
                                Mark as Collected
                            </button>
                        )}
                        <div className="text-xs text-gray-500 flex justify-between mt-4">
                            <span>Expiry: {new Date(donation.expiryDate).toLocaleDateString("en-GB")}</span>
                            <span>Updated: {new Date(donation.updatedAt).toLocaleDateString("en-GB")}</span>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}

export default History;