import { motion } from "framer-motion"

export default function AboutSection() {
    return (
        <section className="flex justify-center w-full bg-matte-black text-white px-[15%] py-[7.5%]">
            <div className="flex w-full items-stretch">
                {/* Mission Statement */}
                <div className="flex flex-col justify-start items-start w-[55%] pr-4 leading-[2]">
                    <motion.h2
                        className="font-monts tracking-wide font-semibold text-textPrimary m-0"
                        initial={{ opacity: 0 }}
                        transition={{ duration: 1 }}
                        whileInView={{ opacity: 1 }}
                    >
                        Our Mission
                    </motion.h2>

                    <motion.p
                        className="font-quick tracking-tight text-textSecondary mt-[5%]"
                        initial={{ opacity: 0 }}
                        transition={{ duration: 1.2 }}
                        whileInView={{ opacity: 1 }}
                    >
                        The EPCC Computer Science Club is a student-led organization
                        dedicated to fostering a passion for technology, coding, and innovation. Our
                        mission is to provide a collaborative space for students of all skill levels
                        to learn, build, and grow together
                    </motion.p>

                    <motion.p
                        className="font-quick tracking-tight text-textSecondary mt-[5%]"
                        initial={{ opacity: 0 }}
                        transition={{ duration: 1.4 }}
                        whileInView={{ opacity: 1 }}
                    >
                        We host hackathons, coding workshops, guest speaker sessions, and networking
                        events to help members enhance their technical skills and prepare for careers
                        in the tech industry.
                    </motion.p>
                </div>

                {/* Core Values */}
                <div className="w-[45%] border-l-2 border-neutral-700 pl-4">
                    <CoreValues />
                </div>
            </div>
        </section>
    )
}


function CoreValues() {
    const values = [
        {
            icon: <img src="/icons/curiosity.svg" className="w-[5.5vh] h-[5.5vh]" alt="Curiosity" />,
            title: "Curiosity",
            description: 'We believe in asking "what if…" and exploring tech with wonder.',
        },
        {
            icon: <img src="/icons/community.svg" className="w-[5.5vh] h-[5.5vh]" alt="Community" />,
            title: "Community",
            description: "We build together, not alone — collaboration is at our core.",
        },
        {
            icon: <img src="/icons/creativity.svg" className="w-[5.5vh] h-[5.5vh]" alt="Creativity" />,
            title: "Creativity",
            description: "Code is where logic meets imagination. We encourage building.",
        },
        {
            icon: <img src="/icons/growth.svg" className="w-[5.5vh] h-[5.5vh]" alt="Growth" />,
            title: "Growth",
            description: "No experience? No problem. We’re here to help you level up.",
        },
    ]

    return (
        <ul className="flex flex-col justify-between h-full list-none m-0 p-0">
            {values.map((value, idx) => (
                <li key={idx} className="flex items-start gap-2 mb-6">
                    <div>{value.icon}</div>
                    <div className="flex flex-col items-start justify-start m-0">
                        <h3 className="font-rubik tracking-wide text-lg font-semibold text-[#3467d4] m-0 p-0">
                            {value.title}
                        </h3>
                        <p className="font-quick tracking-tight text-[0.95rem] leading-[1.5] text-[#729ada]">
                            {value.description}
                        </p>
                    </div>
                </li>
            ))}
        </ul>
    )
}