import { NavLink } from "react-router-dom";
import logo from '../assets/logo.png'
import { useInView } from "react-intersection-observer";
import { motion, useScroll } from 'motion/react'
import AfterSignIn from '../component/AfterSignIn.jsx'
import './Navbar.css'
function Navbar() {
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
            <div className="mt-[0.7vh] fixed top-0 left-0 w-full h-[9.3vh] shadow-xl z-50 bg-white flex justify-evenly items-center">
                <NavLink to="/" className="w-1/3 flex justify-evenly items-center">
                    <img className="w-15 h-13" src={logo} alt="" />
                </NavLink>
                <div className="w-1/3 flex justify-between items-center">
                    <NavLink to="/" className={({ isActive }) => `${isActive ? "text-orange-400 hover:text-orange-400" : "text-black"} text-md duration-200 ease-out hover:text-gray-600 font-[jost]`}>
                        Home
                    </NavLink>
                    <NavLink to="/howitwork" className={({ isActive }) => `${isActive ? "text-orange-400 hover:text-orange-400" : "text-black"} text-md duration-200 ease-out hover:text-gray-600 font-[jost]`}>
                        How it work
                    </NavLink>
                    <NavLink to="/about" className={({ isActive }) => `${isActive ? "text-orange-400 hover:text-orange-400" : "text-black"} text-md duration-200 ease-out hover:text-gray-600 font-[jost]`}>
                        About
                    </NavLink>
                </div>
                {obj ? (
                    <AfterSignIn user={obj} />
                ) : (
                    <div className="w-1/3 flex items-center justify-center">
                        <NavLink
                            to="/signin"
                            className={({ isActive }) =>
                                `${isActive ? "text-orange-400" : "text-black"} text-md w-25 text-center duration-200`
                            }
                        >
                            Sign in
                        </NavLink>

                        <NavLink
                            to="/signup"
                            className={({ isActive }) =>
                                `${isActive ? "bg-orange-400 text-white" : "text-orange-400 bg-white"} w-25 text-center text-md border-orange-400 border-2 p-2 rounded-xl duration-200`
                            }
                        >
                            Sign up
                        </NavLink>
                    </div>
                )}

            </div >
        </>
    )
}
export default Navbar;