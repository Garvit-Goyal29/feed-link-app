import { Link } from "react-router-dom";
import { motion } from 'motion/react'
import { useInView } from "react-intersection-observer";
import map from '../assets/map2.webp'
import pin from '../assets/pin1.png'
import './About.css'
function About() {
    const MotionLink = motion(Link)
    const { ref: refHeading, inView: HeadingVisible } = useInView({
        threshold: 0.2
    });
    const { ref: refBox, inView: BoxVisible } = useInView({
        threshold: 0.2
    });
    const { ref: refProblem, inView: ProblemVisible } = useInView({
        threshold: 0.15
    });
    const { ref: refProvide, inView: ProvideVisible } = useInView({
        threshold: 0.2
    });
    const { ref: refHowitwork, inView: HowitworkVisible } = useInView({
        threshold: 0.2
    });
    const { ref: reflink, inView: LinkVisible } = useInView({
        threshold: 0.2
    });
    return (
        <>
            <div className='mt-[10vh]'>
                <div className='h-full w-full flex flex-col justify-evenly items-center'>
                    <div ref={refHeading} className={`heading ${HeadingVisible ? "showH" : ""} flex flex-col justify-center items-center h-[30%] mb-20 mt-10`}>
                        <h1 className="text-4xl font-[jost] text-center text-orange-400">“Reducing Food Waste, Feeding Lives”</h1>
                        <p className="text-[#4a5565] text-center text-md font-[roboto]">A platform that connects excess food with those who need it most.</p>
                        <MotionLink
                            whileHover={{
                                scale: 1.05,
                                y: -3
                            }}
                            whileTap={{
                                scale: 0.95,
                                backgroundColor: "#1e1e1e"
                            }}
                            transition={{
                                type: "spring",
                                stiffness: 300
                            }}
                            className="w-[15vw] mt-[5vh] text-center font-semibold text-white bg-orange-400 p-2 rounded-3xl" to="/">Join Us</MotionLink>
                    </div>
                    <div ref={refBox} className={`box ${BoxVisible ? "showB" : ""} w-[90vw] h-[30vh] mb-15 rounded-2xl hover:border-2 hover:border-dashed transition duration-500`}>
                        <div className="w-[90vw] h-full bg-[#1e1e1e] border-black border-2 p-5 rounded-2xl hover:-translate-y-2 hover:-translate-x-3 hover:bg-[#353535] transition duration-300">
                            <h1 className="text-4xl text-orange-400 font-semibold mb-5 font-[jost]">FeedLink</h1>
                            <p className="text-md text-white font-[roboto]">
                                Food Waste Management is a platform designed to reduce food wastage by connecting restaurants, households, and event organizers with NGOs and people in need.
                                Our goal is to create a simple and efficient system where surplus food can be shared instead of wasted.
                            </p>
                        </div>
                    </div>
                    <div ref={refProblem} className={`problem ${ProblemVisible ? "showP" : ""} h-full flex flex-col justify-evenly items-center mb-10`}>
                        <section className="w-[90vw] bg-[#1e1e1e] rounded-2xl text-white py-16 px-6 md:px-20">
                            {/* Heading */}
                            <h2 className="text-4xl font-bold text-center text-orange-400 mb-12">
                                Problem We Face
                            </h2>
                            {/* Cards */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-12">
                                {/* Card 1 */}
                                <div className="bg-[#353535] p-6 rounded-2xl shadow-lg hover:scale-105 transition">
                                    <h3 className="text-3xl font-bold text-orange-400">68.7M</h3>
                                    <p className="text-gray-300 mt-2">
                                        tonnes of food wasted annually in India
                                    </p>
                                </div>
                                {/* Card 2 */}
                                <div className="bg-[#353535] p-6 rounded-2xl shadow-lg hover:scale-105 transition">
                                    <h3 className="text-3xl font-bold text-orange-400">50 KG</h3>
                                    <p className="text-gray-300 mt-2">
                                        food wasted per person every year
                                    </p>
                                </div>
                                {/* Card 3 */}
                                <div className="bg-[#353535] p-6 rounded-2xl shadow-lg hover:scale-105 transition">
                                    <h3 className="text-3xl font-bold text-orange-400">1/3rd</h3>
                                    <p className="text-gray-300 mt-2">
                                        of food gets wasted before consumption
                                    </p>
                                </div>
                            </div>
                            {/* Description */}
                            <p className="text-center text-gray-400 max-w-3xl mx-auto leading-relaxed">
                                Every day, tons of food are wasted while millions of people go hungry.
                                This imbalance is caused by poor distribution systems and lack of awareness.
                                Our goal is to bridge this gap and ensure food reaches those who need it.
                            </p>
                        </section>
                    </div>
                    <div ref={refProvide} className={`provide ${ProvideVisible ? "showPro" : ""} flex flex-col justify-center items-center mb-10 h-[60vh] w-[90vw]`}>
                        <h1 className="text-4xl text-orange-400  font-semibold font-[jost] mb-5">Our platform provides:</h1>
                        <div className="w-[90vw] h-[50vh] flex justify-evenly items-center">
                            <div className="w-[30%] h-full flex flex-col justify-start items-center">
                                <motion.div
                                    className="w-full h-[80%] bg-[#1E1E1E] flex flex-col justify-evenly items-center rounded-2xl"
                                >
                                    <motion.div
                                        animate={{
                                            x: [-40, 0, , 0, 0, 0, 0],
                                            opacity: [0, 1, 1, 1, 1, 0]
                                        }}
                                        transition={{
                                            duration: 6,
                                            repeat: Infinity,
                                        }}
                                        className="w-[80%] h-[20%] bg-[#353535] rounded-3xl"
                                    >

                                    </motion.div>
                                    <motion.div
                                        animate={{
                                            x: [-40, 0, , 0, 0, 0, 0],
                                            opacity: [0, 1, 1, 1, 1, 0]
                                        }}
                                        transition={{
                                            duration: 6,
                                            delay: 0.5,
                                            repeat: Infinity,
                                        }}
                                        className="w-[80%] h-[20%] bg-[#353535] rounded-3xl"
                                    >

                                    </motion.div>
                                    <motion.div
                                        animate={{
                                            x: [-40, 0, , 0, 0, 0, 0],
                                            opacity: [0, 1, 1, 1, 1, 0]
                                        }}
                                        transition={{
                                            duration: 6,
                                            delay: 1,
                                            repeat: Infinity,
                                        }}
                                        className="w-[80%] h-[20%] bg-[#353535] rounded-3xl"
                                    >

                                    </motion.div>
                                </motion.div>
                                <h1 className="font-[jost] text-xl">Easy food donation listing</h1>
                            </div>
                            <div className="w-[30%] h-full flex flex-col justify-start items-center">
                                <motion.img src={map} className="w-full h-[80%] border-2 border-[#727471] rounded-2xl" ></motion.img>
                                <motion.img
                                    animate={{
                                        x: [0, 0, 50, 50, 100, 150, 0],
                                        y: [0, 72, 72, 0, 0, 0, 0]
                                    }}
                                    transition={{
                                        duration: 14,
                                        repeat: Infinity
                                    }}
                                    src={pin} className="w-[3.8vh] h-[7vh] rounded-2xl absolute top-[17vh] left-[35.2vw]" ></motion.img>
                                <h1 className="font-[jost] text-xl">Location-based discovery</h1>
                            </div>
                            <div className="w-[30%] h-full flex flex-col justify-start items-center">
                                <motion.div
                                    animate={{
                                        backgroundColor: ["#1E1E1E", "#1E1E1E", "#1E1E1E", "#1e1e1e", "#1e1e1e"]
                                    }}
                                    transition={{
                                        duration: 5,
                                        repeat: Infinity,
                                        ease: "linear"
                                    }}
                                    className="w-full h-[80%] bg-[#1E1E1E] rounded-2xl flex justify-center items-center" >
                                    <motion.div
                                        animate={{
                                            backgroundColor: ["#fff", "#fff", "#fff", "#353535", "#353535"],
                                            color: ["#1E1E1E", "#1E1E1E", "#1E1E1E", "#fff", "#fff"]
                                        }}
                                        transition={{
                                            duration: 5,
                                            repeat: Infinity,
                                            ease: "linear"
                                        }}
                                        className="w-[25%] h-[20%] flex font-semibold justify-center items-center rounded bg-white"
                                    >DONOR</motion.div>
                                    <motion.div
                                        animate={{
                                            scaleX: [0, 1, 1],
                                            backgroundColor: ["#fff", "#fff", "#fff", "#353535", "#353535"]
                                        }}
                                        transition={{
                                            duration: 5,
                                            repeat: Infinity,
                                            ease: 'linear'
                                        }}
                                        className="w-[40%] h-[1%] origin-left bg-white"
                                    ></motion.div>
                                    <motion.div
                                        animate={{
                                            backgroundColor: ["#fff", "#fff", "#fff", "#353535", "#353535"],
                                            color: ["#1E1E1E", "#1E1E1E", "#1E1E1E", "#fff", "#fff"]
                                        }}
                                        transition={{
                                            duration: 5,
                                            repeat: Infinity,
                                            ease: "linear"
                                        }}
                                        className="w-[25%] h-[20%] flex justify-center font-semibold items-center rounded bg-white"
                                    >RECEIVER</motion.div>
                                </motion.div>
                                <h1 className="font-[jost] text-xl">Quick donors-receiver connection</h1>
                            </div>
                        </div>
                    </div>
                    <div ref={refHowitwork}
                        className={`howitwork ${HowitworkVisible ? "showHi" : ""} w-[32vw] mt-30 mb-10 flex justify-start items-center`}
                    >
                        <motion.a
                            // whileHover={{
                            //     borderRight: "0.2vw solid #1e1e1e"
                            // }}
                            className="font-semibold font-[jost] text-5xl flex justify-center items-center" href="http://localhost:5173/howitwork"
                        ><motion.p
                            whileHover={{
                                marginRight: "2.6vw",
                                color: "#FF8904"
                            }}
                            whileTap={{
                                scale: 0.8
                            }}
                            className="text-[#1e1e1e]"
                        >How It Works</motion.p>
                            <motion.p
                            >→</motion.p>
                        </motion.a>
                    </div>
                    <div ref={reflink} className={`link ${LinkVisible ? "showL" : ""} mb-15  w-[90vw] flex justify-evenly items-center`}>
                        <motion.div
                            whileHover={{
                                scale: 1.05,
                                y: -3
                            }}
                            whileTap={{
                                scale: 0.95
                            }}
                            transition={{
                                type: "spring",
                                stiffness: 300
                            }}
                            className="flex items-center justify-center w-[14vw] p-0.5 rounded-2xl bg-linear-to-r from-orange-400 to-[#1e1e1e] overflow-hidden">
                            <MotionLink
                                to="/donate/current"
                                className="block w-[15vw] bg-[#1e1e1e] px-6 py-2 text-white rounded-2xl"
                            >Donate Food</MotionLink>
                        </motion.div>
                        <motion.div
                            whileHover={{
                                scale: 1.05,
                                y: -3
                            }}
                            whileTap={{
                                scale: 0.95
                            }}
                            transition={{
                                type: "spring",
                                stiffness: 300
                            }}
                            className="w-[14vw] p-0.5 rounded-2xl bg-linear-to-r from-[#1e1e1e] to-orange-400 flex items-center justify-center">
                            <MotionLink
                                to="/receiver"
                                className="block w-[15vw] bg-[#1e1e1e] px-6 py-2 text-white rounded-2xl"
                            >Explore Listings</MotionLink>
                        </motion.div>
                    </div>

                    {/* about */}
                    <div className="h-[42vh] w-full py-[1vh] bg-[#1e1e1e] text-white">
                        <h2 className="text-sm h-[5vh] mb-[1vh] text-[#7e8084] border-b border-[#7e8084] text-center">Learn • Build • Improve</h2>
                        <div className="flex justify-evenly items-center w-full">
                            <div className="w-[30%] h-[35vh] flex flex-col justify-start items-center">
                                <h1 className="text-2xl  text-orange-400 font-semibold font-[Jost] mb-[2vh]">About us</h1>
                                <p className="text-start">Built by Garvit & Goutam, BTech students passionate about solving real-world problems using technology.</p>
                            </div>
                            <div className="w-[30%] h-[35vh] flex flex-col justify-start items-center">
                                <h1 className="text-2xl text-orange-400 font-semibold font-[Jost] mb-[2vh]">Tech Stack</h1>
                                <div className="flex flex-col justify-center items-start">
                                    <p>Frontend : <a className="text-orange-300 hover:text-orange-400" href="https://react.dev/">React.js</a></p>
                                    <p>Backend : <a className="text-orange-300 hover:text-orange-400" href="https://nodejs.org/en">Node.js</a></p>
                                    <p>Database : <a className="text-orange-300 hover:text-orange-400" href="https://www.mongodb.com/">MongoDB</a></p>
                                    <p>Styling : <a className="text-orange-300 hover:text-orange-400" href="https://tailwindcss.com/">Tailwind CSS</a></p>
                                    <p>Animation : <a className="text-orange-300 hover:text-orange-400" href="https://motion.dev/">Motion</a></p>
                                </div>
                            </div>
                            <div className="w-[30%] h-[35vh] flex flex-col justify-start items-center">
                                <h1 className="text-2xl text-orange-400 font-semibold font-[Jost] mb-[2vh]">Contact</h1>
                                <div className="flex flex-col justify-center items-start">
                                    <p>Email: <a className="text-orange-300 hover:text-orange-400">garvitgoyal29557@gmail.com</a>
                                    </p>
                                    <p>Email: <a className=" text-orange-300 hover:text-orange-400">goutamdethliya1@gmail.com</a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default About;