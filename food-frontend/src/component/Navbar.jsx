import { NavLink } from "react-router-dom";
import logo from '../assets/logo.png'
import { motion, useScroll } from 'motion/react'
import { useState } from "react";
import AfterSignIn from '../component/AfterSignIn.jsx'
import './Navbar.css'
function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const ScrollYAxisProgress = useScroll().scrollYProgress;
    const data = localStorage.getItem("userActive")
    let obj = null;
    try {
        if (data && data !== "undefined") {
            obj = JSON.parse(data);
        }
    } catch (err) {
        console.log("Invalid user data in localStorage");
        obj = null;
    }
    return (
        <>
            <div className='h-[0.7vh] bg-orange-200 w-full fixed left-0 top-0 z-51'>
                <motion.div
                    style={{
                        scaleX: ScrollYAxisProgress
                    }}
                    className='h-[0.7vh] bg-orange-400 w-screen origin-left fixed left-0 top-0 z-51'>
                </motion.div>
            </div>
            <div className="mt-[0.7vh] fixed top-0 left-0 w-full h-[9.3vh] shadow-2xl z-50 bg-white flex justify-around lg:justify-between items-center gap-[2vw] px-[1vw]">
                <div className="lg:hidden">
                    <div className="lg:hidden w-[8vw] h-[5vh] flex justify-center items-center">
                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            className="text-3xl text-black"
                        >
                            {menuOpen ? "✕" : "☰"}
                        </button>
                    </div>
                </div>
                <NavLink to="/" className="w-1/4 flex justify-evenly items-center">
                    <img className="w-15 h-13" src={logo} alt="" />
                </NavLink>
                <div className="w-2/4 hidden lg:flex justify-evenly items-center">
                    <NavLink to="/" className={({ isActive }) => `${isActive ? "text-orange-400 hover:text-orange-400" : "text-black"} text-md duration-200 ease-out hover:text-gray-600 font-[jost]`}>
                        Home
                    </NavLink>
                    <NavLink to="/howitwork" className={({ isActive }) => `${isActive ? "text-orange-400 hover:text-orange-400" : "text-black"} text-md duration-200 ease-out hover:text-gray-600 font-[jost]`}>
                        How it work
                    </NavLink>
                    <NavLink to="/about" className={({ isActive }) => `${isActive ? "text-orange-400 hover:text-orange-400" : "text-black"} text-md duration-200 ease-out hover:text-gray-600 font-[jost]`}>
                        About
                    </NavLink>
                    <NavLink to="/donate/current" className={({ isActive }) => `${isActive ? "text-orange-400 hover:text-orange-400" : "text-black"} text-md duration-200 ease-out hover:text-gray-600 font-[jost]`}>
                        Donate
                    </NavLink>
                    <NavLink to="/receive" className={({ isActive }) => `${isActive ? "text-orange-400 hover:text-orange-400" : "text-black"} text-md duration-200 ease-out hover:text-gray-600 font-[jost]`}>
                        Receive
                    </NavLink>
                </div>
                {obj ? (
                    <AfterSignIn user={obj} />
                ) : (
                    <div className="w-0.5/4 flex items-center justify-center gap-[0.5vw] border-orange-400 border-2 p-1 rounded-[1vh]">
                        <NavLink
                            to="/signin"
                            className={({ isActive }) =>
                                `${isActive ? "bg-orange-400 text-white" : "text-orange-400 bg-white"} w-25 text-center text-md p-1 rounded-[1vh] duration-200`
                            }
                        >
                            Sign in
                        </NavLink>

                        <NavLink
                            to="/signup"
                            className={({ isActive }) =>
                                `${isActive ? "bg-orange-400 text-white" : "text-orange-400 bg-white"} w-25 text-center text-md p-1 rounded-[1vh] duration-200`
                            }
                        >
                            Sign up
                        </NavLink>
                    </div>
                )}
                {menuOpen && (
                    <div className="absolute top-[9.3vh] left-0 w-[50%] h-screen bg-white flex flex-col items-center gap-4 py-4 shadow-2xl lg:hidden z-100">
                        <NavLink to="/"  onClick={() => setMenuOpen(false)} className={({ isActive }) => `${isActive ? "text-orange-400 hover:text-orange-400" : "text-black"} text-md duration-200 ease-out hover:text-gray-600 font-[jost]`}>
                            Home
                        </NavLink>
                        <NavLink to="/howitwork"  onClick={() => setMenuOpen(false)} className={({ isActive }) => `${isActive ? "text-orange-400 hover:text-orange-400" : "text-black"} text-md duration-200 ease-out hover:text-gray-600 font-[jost]`}>
                            How it work
                        </NavLink>
                        <NavLink to="/about"  onClick={() => setMenuOpen(false)} className={({ isActive }) => `${isActive ? "text-orange-400 hover:text-orange-400" : "text-black"} text-md duration-200 ease-out hover:text-gray-600 font-[jost]`}>
                            About
                        </NavLink>
                        <NavLink to="/donate/current"  onClick={() => setMenuOpen(false)} className={({ isActive }) => `${isActive ? "text-orange-400 hover:text-orange-400" : "text-black"} text-md duration-200 ease-out hover:text-gray-600 font-[jost]`}>
                            Donate
                        </NavLink>
                        <NavLink to="/receive"  onClick={() => setMenuOpen(false)} className={({ isActive }) => `${isActive ? "text-orange-400 hover:text-orange-400" : "text-black"} text-md duration-200 ease-out hover:text-gray-600 font-[jost]`}>
                            Receive
                        </NavLink>
                    </div>
                )}
            </div >
        </>
    )
}
export default Navbar;