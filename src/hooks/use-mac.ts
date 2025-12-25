import * as React from "react"

const MAC_SCREEN_RATIO = 1.6 // Equal to 16/10

export function useIsMacRatio() {
    const [isMac, setIsMac] = React.useState<boolean | undefined>(undefined)

    React.useEffect(() => {
        function checkRatio() {
            const width = window.screen.width;
            const height = window.screen.height;
            const ratio = width / height;

            const epsilon = 0.01; // tolerance
            setIsMac(Math.abs(ratio - MAC_SCREEN_RATIO) < epsilon);
        }

        // Initial check
        checkRatio();
        // Update on resize
        window.addEventListener("resize", checkRatio);
        return () => window.removeEventListener("resize", checkRatio);
    }, []);



    return !!isMac;
}
