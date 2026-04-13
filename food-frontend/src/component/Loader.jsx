import { motion } from 'motion/react'
function Loader({ size = "3.5vh",bor = "0.5vh" }) {
    return (
        <>
            <div className="w-full h-full flex justify-center items-center">
                <motion.div
                    animate={{
                        rotate: 360
                    }}
                    transition={{
                        duration: 1,
                        ease: "linear",
                        repeat: Infinity
                    }}
                    style={{ width: size, height: size, borderTop:`${bor} solid white`,borderRight: `${bor} solid white`,borderLeft: `${bor} solid #2A2A2A`,borderBottom: `${bor} solid #2A2A2A`, }}
                    className="rounded-[50%]"></motion.div>
            </div>
        </>
    )
}
export default Loader;