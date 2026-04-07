import { useEffect, useState } from "react";
import { TrashIcon } from '@heroicons/react/24/outline'
function Current() {
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
    useEffect(() => {
        if (!user?.id) return;
        fetch(`http://localhost:5000/api/donation?userId=${user.id}`)
            .then(res => res.json())
            .then(data => {
                setDonations(data.data);
            })
            .catch(err => console.log(err));
    }, [user?.id]);
    const handleDelete = async (id) => {
        try {
            const res = await fetch(`http://localhost:5000/api/donation/${id}`, {
                method: "DELETE",
            });

            const data = await res.json();

            if (data.success) {
                alert("Deleted successfully 🗑️");
                setDonations(prev => prev.filter(d => d._id !== id));
            } else {
                alert(data.message || "Delete failed");
            }

        } catch (error) {
            console.log(error);
            alert("Server error");
        }
    }
    return (
        <div className="flex justify-between items-center gap-4 p-4 flex-wrap">
            {donations.length === 0 ? (
                <p className="text-gray-400 text-center w-full">No donation list by you yet! <br />Tap on up button to list excess food.</p>
            ) : (
                donations.map((donation) => (
                    <div
                        key={donation._id}
                        className="bg-[#2a2a2a] p-4 w-[48%] rounded-xl text-white shadow"
                    >
                        <h2 className="text-orange-400 font-semibold">
                            {donation.food}
                        </h2>
                        <p>📍 {donation.location}</p>
                        <p>📞 {donation.phone}</p>
                        <p>⏳ Expiry: {new Date(donation.expiryDate).toLocaleDateString("en-GB")}</p>
                        <p className="text-sm text-gray-400">
                            {donation.description}
                        </p>
                        <TrashIcon
                            onClick={() => handleDelete(donation._id)}
                            className="w-7 h-7 text-[#1e1e1e] cursor-pointer text-sm mt-[1vh] bg-orange-400 p-[0.5vh] rounded hover:bg-orange-600" />
                    </div>
                ))
            )}
        </div>
    );
}

export default Current;