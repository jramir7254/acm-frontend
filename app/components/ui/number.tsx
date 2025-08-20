import { motion, useMotionValue, useInView, useTransform, animate } from "framer-motion";
import { useEffect, useRef } from "react";

export default function Number({ num, className }: { num: number, className?: string }) {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true })

    const motionValue = useMotionValue(0);
    const rounded = useTransform(motionValue, (latest) => Math.round(latest));


    useEffect(() => {
        if (isInView) {
            const controls = animate(motionValue, num, {
                type: 'spring',
                mass: 1,
                stiffness: 20,
                damping: 10,
                delay: 0.2,
            });
            return controls.stop;
        }
    }, [isInView, num]);


    return (
        <motion.span
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className={className}>
            {rounded}
        </motion.span>
    );
}