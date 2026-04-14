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
    },meal)
    return (
        <>
            <div className='max-w-screen mt-[10vh]'>
                <img src={bgURL} className="w-full h-[80vh] object-cover brightness-35" alt="" />
                <h1 ref={mainTitle} className={`title ${mainTitleVisible ? "showTitle" : ""} absolute text-white text-7xl top-50 left-60 font-[jost]`}>Don't waste food,<br />Donate it.</h1>
                <h1 ref={mainTitle} className={`title ${mainTitleVisible ? "showTitle" : ""} absolute text-white text-xl top-86 left-60 font-[jost]`}>“Reduce Food Waste. Feed Lives.”</h1>
            </div>
            <div className='h-[10vh] px-60 flex items-center justify-between'>
                <h1 className='text-[3vw] font-[jost] typing-anime'>Scroll for Donate & Receive excess food.</h1>
                <img src={logo} className='w-15 h-13 logo-anime' alt="" />
            </div>
            <div className='w-full h-screen'>
                <div className='h-[10vh] w-full bg-[#FDE6D6] pt-[1vh] flex justify-evenly items-center'>
                    <div className="relative w-[10vw] h-[9vh] pl-[0.3vw] flex justify-start items-center overflow-hidden">
                        <motion.div
                            style={{ scaleX: SyP }}
                            className='absolute inset-0 origin-left bg-orange-400 rounded-r-4xl'
                        />
                        <h1 className='relative z-10 text-[#FDE6D6] text-md font-[Jost] text-start'>
                            {meal}+ <br /> Meals
                        </h1>
                    </div>
                    <div className="relative w-[10vw] h-[9vh] pl-[0.3vw] flex justify-start items-center overflow-hidden">
                        <motion.div
                            style={{ scaleX: SyP }}
                            className='absolute inset-0 origin-left bg-orange-400 rounded-r-4xl'
                        />
                        <h1 className='relative z-10 text-[#FDE6D6] text-md font-[Jost]  text-start'>
                            25+ <br /> Cities
                        </h1>
                    </div>
                    <div className="relative w-[10vw] h-[9vh] pl-[0.3vw] flex justify-start items-center overflow-hidden">
                        <motion.div
                            style={{ scaleX: SyP }}
                            className='absolute inset-0 origin-left bg-orange-400 rounded-r-4xl'
                        />
                        <h1 className='relative z-10 text-[#FDE6D6] text-md font-[Jost] text-start'>
                            79% <br /> Accuracy
                        </h1>
                    </div>

                </div>
                <div className='bg-[#FDE6D6] h-[90vh] w-full flex flex-col'>
                    <div ref={titleRef} className={`card ${titleVisible ? "show" : ""} w-full h-[40%] flex flex-col justify-evenly items-center`}>
                        <h1 className='text-[#D35400] text-5xl font-[Roboto]'>Choose Your Role</h1>
                        <p className='text-center text-[#6D4C41] font-[Jost]'>Donate surplus food or receive meal with dignity. Together <br /> we can reduce food waste and fight hunger</p>
                        <h2 className='text-orange-400 text-[1.8vw] font-[Roboto] italic font-semibold'>Be the reason someone eat today.</h2>
                    </div>
                    <div className='h-[60%] w-full flex justify-center items-center gap-7'>
                        <div ref={section} className={`card ${sectionVisible ? "show" : ""} p-3 bg-white w-76 h-72 border-t-5 border-orange-400 rounded flex flex-col justify-between items-start shadow-2xl`}>
                            <img src={dImg} alt="" className='h-[22vh] w-[25vw] rounded' />
                            <h2 className='text-orange-400 text-xl font-[Roboto]'>Donate suplus food</h2>
                            <p className='text-sm'>Have extra food from your event, home, or restaurant? List it here to help someone</p>
                            <NavLink to="/donate/current" className='bg-orange-400 font-[Jost] w-[13vw] flex justify-center  transition items-center p-1 pl-2 gap-1 rounded hover:bg-black hover:text-white duration-300'>List Food Now <ArrowRightIcon className="w-5 h-5" /></NavLink>
                        </div>
                        <div ref={section} className={`card ${sectionVisible ? "show" : ""} p-3 bg-white w-76 h-72 border-t-5 border-[#F9A825] rounded flex flex-col justify-between items-start shadow-2xl`}>
                            <img src={rImg} alt="" className='h-[22vh] w-[25vw] rounded' />
                            <h2 className='text-[#F9A825] text-xl font-[Roboto]'>Receive food</h2>
                            <p className='text-sm'>Looking for food assistance?<br />Browse available donations near you.</p>
                            <NavLink to="/receive" className='bg-[#f9a825] font-[Jost] w-[13vw] flex justify-center items-center p-1 pl-2 gap-1 rounded hover:bg-black hover:text-white duration-300'>Find Food <ArrowRightIcon className='h-5 w-5' /></NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Home;