import { motion, useMotionValue, useInView, useTransform, animate } from "framer-motion";
import { useEffect, useRef } from "react";

export function AnimatedNumber({ num, className, decimal }: { num: number | string; className?: string, decimal?: boolean }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    // Force to number and default to 0 if invalid
    const targetNum = Number(num);
    const safeNum = Number.isFinite(targetNum) ? targetNum : 0;

    const motionValue = useMotionValue(0);
    const rounded = useTransform(motionValue, (latest) => decimal ? +latest.toFixed(2) : Math.round(latest));

    useEffect(() => {
        if (isInView) {
            const controls = animate(motionValue, safeNum, {
                type: "spring",
                mass: 1,
                stiffness: 20,
                damping: 10,
                delay: 0.2,
            });
            return controls.stop;
        }
    }, [isInView, safeNum]);

    return (
        <motion.span
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className={className}
        >
            {rounded}
        </motion.span>
    );
}
