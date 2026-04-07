import React from "react";
import { motion } from 'motion/react'
import { UserIcon } from '@heroicons/react/24/outline'
function AfterSignIn({ user }) {
    const logout = () => {
        localStorage.removeItem("userActive")
        window.location.href = "/signin"
    }
    return (
        <>
            <div className="w-1/3 h-[8vh] flex items-center px-[3vw] justify-end">
                <div className="h-full bg-[#FDE6D6] rounded-xl gap-[2vw] flex items-center p-2 justify-evenly border-orange-400 border-2">
                    <div className="flex items-center justify-evenly gap-[0.5vw]">
                        <div className="bg-[#1e1e1e] rounded-[100%]">
                            <UserIcon className="h-[3.9vh] w-[2.2vw] text-gray-200" />
                        </div>
                        <h1 className="font-[jost] text-md"> {user.name}</h1>
                    </div>
                    <motion.button
                        whileHover={{
                            scale:1.05,
                            backgroundColor:"#000"
                        }}
                        onClick={logout}
                        className="bg-[#1e1e1e] p-2 text-gray-200 text-xs font-bold rounded-2xl">Log out</motion.button>
                </div>
            </div>
        </>
    )
}
export default AfterSignIn;