import React from "react"
import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { NavLink } from "react-router-dom";
import './Howitwork.css'
function Howitwork() {
    const { scrollYProgress } = useScroll()
    const divFill1 = useTransform(scrollYProgress, [0, 0.1], [0, 1]);
    const divFill2 = useTransform(scrollYProgress, [0.1, 0.41], [0, 1]);
    const divFill3 = useTransform(scrollYProgress, [0.41, 0.66], [0, 1]);
    const divFill4 = useTransform(scrollYProgress, [0.66, 1], [0, 1]);
    const y1 = useTransform(scrollYProgress, [0, 0.25], [80, 0]);
    const y2 = useTransform(scrollYProgress, [0.25, 0.5], [80, 0]);
    const y3 = useTransform(scrollYProgress, [0.5, 0.75], [80, 0]);
    const y4 = useTransform(scrollYProgress, [0.75, 1], [80, 0]);
    const messOpacity = scrollYProgress
    const { ref: HowItWorkRef, inView: HowItWorkVisible } = useInView({
        threshold: 0.15
    });
    const { ref: ScrollRef, inView: ScrollVisible } = useInView({
        threshold: 0.15
    });
    console.log(HowItWorkVisible);
    return (
        <>
            <div className="mt-[10vh] pt-[2vh]">
                <h1 ref={HowItWorkRef} className={`title ${HowItWorkVisible ? "showT" : ""} text-5xl text-orange-400 text-center font-[jost]`}>How it work</h1>
                <p ref={HowItWorkRef} className={`title ${HowItWorkVisible ? "showT" : ""} text-center text-[#4a5565] font-[roboto]`}>Simple steps to orangeuce food waste <br />and help those in need.</p>
                <div className="w-full h-[150vh] p-20 flex justify-center items-start">
                    <motion.h1
                        className="fixed opacity-0 top-[50vh] left-[44%]"
                    >
                        Srcoll to see steps
                    </motion.h1>
                    <div className="flex flex-col justify-center items-center gap-10 h-full w-full">
                        <div className="w-full h-[25%] flex justify-center items-center pl-[10vw]">
                            <motion.div
                                style={{
                                    opacity: divFill1,
                                    y: y1
                                }}
                                className="bg-white rounded-xl border-orange-400 border-t-2 shadow-gray-500 shadow-lg w-[50%] h-full flex  flex-col justify-center items-center p-2">
                                <p className="text-orange-400 text-4xl font-bold font-[jost]">DONOR</p>
                                <p className="text-xl font-semibold font-[jost]">List food</p>
                                <p className="text-xs text-center font-[Roboto] font">Add surplus food from your event, or restaurant with details like quantity, location, and pickup time.</p>
                            </motion.div>
                            <motion.div
                                style={{
                                    scaleX: divFill1,
                                    opacity: divFill1,
                                    y: y1
                                }}
                                className="bg-orange-400 origin-left w-[50%] h-[2%]"></motion.div>
                        </div>
                        <div className="w-full h-[25%] flex justify-center items-center">
                            <div className="w-[50%] h-full"></div>
                            <div className="w-[50%] h-[2%]"></div>
                        </div>
                        <div className="w-full h-[25%] flex justify-center items-center pl-[10vw]">
                            <motion.div
                                style={{
                                    opacity: divFill3,
                                    y: y3
                                }}
                                className="bg-white rounded-xl  border-orange-400 border-t-2 shadow-gray-500 shadow-lg w-[50%] h-full flex flex-col justify-center items-center p-2">
                                <p className="text-4xl  text-orange-400 font-bold font-[jost]">DONOR</p>
                                <p className="text-xl font-semibold font-[jost]">Confirm & Connect</p>
                                <p className="text-xs text-center font-[Roboto] font">Donor reviews the request and shares contact details to coordinate the delivery or pickup.</p></motion.div>
                            <motion.div
                                style={{
                                    scaleX: divFill3,
                                    opacity: divFill3,
                                    y: y3
                                }}
                                className="bg-orange-400 origin-left w-[50%] h-[2%]"></motion.div>
                        </div>
                        <div className="w-full h-[25%] flex justify-center items-center">
                            <div className="w-[50%] h-full"></div>
                            <div className="w-[50%] h-[2%]"></div>
                        </div>
                    </div>

                    <div className="h-full w-[0.5vw] flex justify-center items-center flex-col mb-[10vh]">
                        <div ref={ScrollRef} className={`scroll ${ScrollVisible ? "showS" : ""} h-[10%] w-[25vw] origin-top bg-[#1e1e1e] rounded-xl text-orange-400 font-[jost] font-semibold z-1 flex justify-center items-center`}>
                            Scroll to see the step
                        </div>
                        <motion.div
                            style={{
                                scaleY: scrollYProgress
                            }}
                            className="h-[70%] w-[0.5vw] origin-top bg-orange-400">
                        </motion.div>
                        <motion.div
                            style={{
                                opacity: scrollYProgress,
                                scale: scrollYProgress,
                                y: -2
                            }}
                            className="h-[10%] w-[25vw] origin-top bg-[#1e1e1e] font-semibold rounded-xl text-orange-400 font-[jost] z-1 flex flex-col justify-center items-center">
                            <p>🎉You’re All Set!</p>
                            <div>
                                <NavLink to="/donate/current" className="text-sm px-2 mr-1 rounded hover:bg-orange-400 hover:text-[#1e1e1e] duration-200 transition">
                                    Donate
                                </NavLink>
                                ||
                                <NavLink to="/receive" className="text-sm px-2 ml-1 rounded hover:bg-orange-400 hover:text-[#1e1e1e] duration-200 transition">
                                    Receive
                                </NavLink>
                            </div>
                        </motion.div>
                    </div>

                    <div className="flex flex-col justify-center items-center gap-10 h-full w-full">
                        <div className="w-full h-[25%] flex justify-center items-center">
                            <div className="w-[50%] h-[2%]"></div>
                            <div className="w-[50%] h-full"></div>
                        </div>
                        <div className="w-full h-[25%] flex justify-center items-center pr-[10vw]">
                            <motion.div
                                style={{
                                    scaleX: divFill2,
                                    opacity: divFill2,
                                    y: y2
                                }}
                                className="bg-orange-400 origin-right w-[50%] h-[2%]"></motion.div>
                            <motion.div
                                style={{
                                    opacity: divFill2,
                                    y: y2
                                }}
                                className="bg-white rounded-xl border-[#F9A825] border-t-2 shadow-gray-500 shadow-lg w-[50%] h-full flex flex-col justify-center items-center p-2">
                                <p className="text-4xl text-[#F9A825] font-bold font-[jost]">RECEIVER</p>
                                <p className="text-xl font-semibold font-[jost]">Browse & Request</p>
                                <p className="text-xs text-center font-[Roboto] font">Add surplus food from your event, or restaurant with details like quantity, location, and pickup time.</p></motion.div>
                        </div>
                        <div className="w-full h-[25%] flex justify-center items-center">
                            <div className="w-[50%] h-[2%]"></div>
                            <div className="w-[50%] h-full"></div>
                        </div>
                        <div className="w-full h-[25%]  flex justify-center items-center pr-[10vw]">
                            <motion.div
                                style={{
                                    opacity: divFill4,
                                    scaleX: divFill4,
                                    y: y4
                                }}
                                className="bg-orange-400 origin-right w-[50%] h-[2%]"></motion.div>
                            <motion.div
                                style={{
                                    opacity: divFill4,
                                    y: y4
                                }}
                                className="bg-white rounded-xl border-[#F9A825] border-t-2 shadow-gray-500 shadow-lg w-[50%] h-full flex flex-col justify-center items-center p-2">
                                <p className="text-4xl text-[#F9A825] font-bold font-[jost]">RECEIVER</p>
                                <p className="text-xl font-semibold font-[jost]">Deliver or Pickup</p>
                                <p className="text-xs text-center font-[Roboto] font">Food is safely deliveorange or picked up, ensuring it reaches someone who truly needs it.</p></motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Howitwork;