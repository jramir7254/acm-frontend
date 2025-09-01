import { Diff } from "lucide-react"
import { motion, useMotionValue, useTransform, animate, AnimatePresence } from "motion/react"
import { useEffect, useRef, useState } from "react"

export function AnimatedNumber({
    num,
    className,
}: {
    num: number | string | undefined
    className?: string
}) {
    const prevNumRef = useRef<number>()
    const [sign, setSign] = useState<null | "up" | "down">(null)

    const safeNum = Number.isFinite(Number(num)) ? Number(num) : 0

    // motion value for the base counter
    const baseValue = useMotionValue(0)
    const baseRounded = useTransform(baseValue, (v) => Math.round(v))

    // motion value for the diff bubble
    const diffValue = useMotionValue(0)
    const [diffDisplay, setDiffDisplay] = useState(0)

    // subscribe diff motion to state
    useEffect(() => {
        const unsub = diffValue.on("change", (latest) => setDiffDisplay(Math.round(latest)))
        return () => unsub()
    }, [diffValue])

    // 🔹 Always animate base number 0 → current
    useEffect(() => {
        animate(baseValue, safeNum, {
            duration: 1, // base speed
            ease: "easeOut",
        })
    }, [safeNum, baseValue])

    // 🔹 Only animate diff when the value actually changes
    useEffect(() => {
        if (prevNumRef.current !== undefined && safeNum !== prevNumRef.current) {
            const oldVal = prevNumRef.current
            const diff = safeNum - oldVal

            // set sign
            if (diff > 0) setSign("up")
            else if (diff < 0) setSign("down")

            // animate diff bubble down to 0
            diffValue.set(Math.abs(diff))
            const controls = animate(diffValue, 0, {
                duration: 0.8,
                ease: "easeOut",
            })

            // clear sign after exit
            const t = setTimeout(() => setSign(null), 1000)

            return () => {
                clearTimeout(t)
                controls.stop()
            }
        }
        prevNumRef.current = safeNum
    }, [safeNum, diffValue])

    return (
        <div className="relative flex items-center justify-center">
            {/* base number */}
            <motion.span className={className}>{baseRounded}</motion.span>

            {/* diff bubble */}
            <AnimatePresence>
                {sign && (
                    <motion.div
                        key={sign + safeNum}
                        initial={{ opacity: 0, y: 0 }}
                        animate={{ opacity: 1, y: -15 }}
                        exit={{ opacity: 0, y: -25 }}
                        transition={{
                            opacity: { duration: 0.2 },
                            y: { duration: 0.6, ease: "easeOut" },
                        }}
                        className={`absolute text-2xl font-bold ${sign === "up" ? "text-green-500" : "text-red-500"
                            }`}
                    >
                        {`${sign === "up" ? "+" : "-"} ${diffDisplay}`}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
