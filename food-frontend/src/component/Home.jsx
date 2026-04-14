import { data, NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import bgURL from '../assets/bgfood.png'
import logo from '../assets/logo.png'
import dImg from '../assets/donateCard.jpg'
import rImg from '../assets/receiveCard.jpg'
import './Home.css'
import { useInView } from "react-intersection-observer";
import { motion, useScroll } from 'motion/react'
function Home() {
    const { ref: titleRef, inView: titleVisible } = useInView({
        threshold: 0.15
    });
    const { ref: section, inView: sectionVisible } = useInView({
        threshold: 0.15
    });
    const { ref: mainTitle, inView: mainTitleVisible } = useInView({
        threshold: 0.15,
        triggerOnce: true
    })
    const SyP = useScroll().scrollYProgress
    const [meal, setmeal] = useState(0)
    useEffect(() => {
        fetch('https://feed-link-app-1.onrender.com/api/getMeal')
            .then(res => res.json())
            .then(data => {
                console.log(data.data)
                setmeal(data.data)
            })
    }, [meal])
    return (
        <>
            <div className='max-w-screen mt-[10vh]'>
                <img src={bgURL} className="w-full h-[60vh] lg:h-[80vh] object-cover brightness-35" alt="" />
                <h1 ref={mainTitle} className={`title ${mainTitleVisible ? "showTitle" : ""} absolute text-white font-[jost] text-3xl sm:text-4xl leading-tight w-[90%] top-[25%] left-[5%] lg:text-7xl lg:w-auto lg:top-50 lg:left-60`}
                >Don't waste it,<br />Donate it.</h1>
                <h1 ref={mainTitle} className={`title ${mainTitleVisible ? "showTitle" : ""} absolute text-white font-[jost] text-sm sm:text-base w-[90%] top-[38%] lg:top-[65vh] left-[5%] lg:text-xl lg:w-auto lg:left-60`}>“Reduce Food Waste. Feed Lives.”</h1>
            </div>
            <div className='h-[10vh] px-4 lg:px-60 flex items-center justify-between overflow-hidden'>
                <h1 className='text-[4.8vw] lg:text-[3vw] font-[jost] typing-anime'>
                    Scroll for Donate & Receive excess food.
                </h1>
                <img src={logo} className='w-10 h-10 lg:w-15 lg:h-13 logo-anime' alt="" />
            </div>
            <div className='w-full h-full'>
                <div className='h-[10vh] w-full bg-[#FDE6D6] pt-[1vh] flex justify-evenly items-center'>
                    <div className="relative lg:w-[10vw] w-[18vw] lg:h-[9vh] pl-[0.3vw] flex justify-start items-center overflow-hidden">
                        <motion.div
                            style={{ scaleX: SyP }}
                            className='absolute inset-0 origin-left bg-orange-400 rounded-r-4xl'
                        />
                        <h1 className='relative z-10 text-[#FDE6D6] lg:text-md text-sm font-[Jost] text-start'>
                            {meal}+ <br /> Meals
                        </h1>
                    </div>
                    <div className="relative lg:w-[10vw] w-[18vw] lg:h-[9vh] pl-[0.3vw] flex justify-start items-center overflow-hidden">
                        <motion.div
                            style={{ scaleX: SyP }}
                            className='absolute inset-0 origin-left bg-orange-400 rounded-r-4xl'
                        />
                        <h1 className='relative z-10 text-[#FDE6D6] lg:text-md text-sm font-[Jost]  text-start'>
                            25+ <br /> Cities
                        </h1>
                    </div>
                    <div className="relative lg:w-[10vw] w-[18vw] lg:h-[9vh] pl-[0.3vw] flex justify-start items-center overflow-hidden">
                        <motion.div
                            style={{ scaleX: SyP }}
                            className='absolute inset-0 origin-left bg-orange-400 rounded-r-4xl'
                        />
                        <h1 className='relative z-10 text-[#FDE6D6] lg:text-md text-sm font-[Jost] text-start'>
                            79% <br /> Accuracy
                        </h1>
                    </div>

                </div>
                <div className='bg-[#FDE6D6] lg:h-[90vh] h-auto w-full flex flex-col pb-[2vh] lg:pb-0'>
                    <div ref={titleRef} className={`card ${titleVisible ? "show" : ""} w-full h-[40%] flex flex-col justify-evenly items-center`}>
                        <h1 className='text-[#D35400] text-5xl font-[Roboto]'>Choose Your Role</h1>
                        <p className='text-center text-[#6D4C41] font-[Jost]'>Donate surplus food or receive meal with dignity. Together <br /> we can reduce food waste and fight hunger</p>
                        <h2 className='text-orange-400 lg:text-[1.8vw] text-xl font-[Roboto] italic font-semibold'>Be the reason someone eat today.</h2>
                    </div>
                    <div className='h-[60%] w-full flex flex-col lg:flex-row justify-center items-center gap-7'>

                        {/* CARD 1 */}
                        <div
                            ref={section}
                            className={`card ${sectionVisible ? "show" : ""} p-3 bg-white w-[90%] lg:w-76 h-auto lg:h-72 border-t-5 border-orange-400 rounded flex flex-col justify-between items-start shadow-2xl`}
                        >
                            <img
                                src={dImg}
                                alt=""
                                className='h-[22vh] w-full lg:w-[25vw] rounded object-cover'
                            />
                            <h2 className='text-orange-400 text-lg lg:text-xl font-[Roboto]'>
                                Donate surplus food
                            </h2>
                            <p className='text-sm'>
                                Have extra food from your event, home, or restaurant? List it here to help someone
                            </p>
                            <NavLink
                                to="/donate/current"
                                className='bg-orange-400 font-[Jost] w-full lg:w-[13vw] flex justify-center items-center p-2 gap-1 rounded hover:bg-black hover:text-white duration-300'
                            >
                                List Food Now <ArrowRightIcon className="w-5 h-5" />
                            </NavLink>
                        </div>
                        {/* CARD 2 */}
                        <div
                            ref={section}
                            className={`card ${sectionVisible ? "show" : ""} p-3 bg-white w-[90%] lg:w-76 h-auto lg:h-72 border-t-5 border-[#F9A825] rounded flex flex-col justify-between items-start shadow-2xl`}
                        >
                            <img
                                src={rImg}
                                alt=""
                                className='h-[22vh] w-full lg:w-[25vw] rounded object-cover'
                            />
                            <h2 className='text-[#F9A825] text-lg lg:text-xl font-[Roboto]'>
                                Receive food
                            </h2>
                            <p className='text-sm'>
                                Looking for food assistance?<br />
                                Browse available donations near you.
                            </p>
                            <NavLink
                                to="/receive"
                                className='bg-[#f9a825] font-[Jost] w-full lg:w-[13vw] flex justify-center items-center p-2 gap-1 rounded hover:bg-black hover:text-white duration-300'
                            >
                                Find Food <ArrowRightIcon className='h-5 w-5' />
                            </NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Home;