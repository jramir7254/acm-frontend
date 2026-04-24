import React from "react"

const MAC_SCREEN_RATIO = 1.6 // Equal to 16/10
const MOBILE_BREAKPOINT = 768

export function useScreenSize() {
    const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)
    const [isMac, setIsMac] = React.useState<boolean | undefined>(undefined)

    React.useEffect(() => {
        function checkRatio() {
            const width = window.screen.width;
            const height = window.screen.height;
            const ratio = width / height;

            const epsilon = 0.01; // tolerance
            setIsMac(Math.abs(ratio - MAC_SCREEN_RATIO) < epsilon);
        }

        checkRatio();
        window.addEventListener("resize", checkRatio);
        return () => window.removeEventListener("resize", checkRatio);
    }, []);



    React.useEffect(() => {
        const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
        const onChange = () => {
            setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
        }
        mql.addEventListener("change", onChange)
        setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
        return () => mql.removeEventListener("change", onChange)
    }, [])

    return { isMac: !!isMac, isMobile: !!isMobile }

}