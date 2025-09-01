import type { Route } from "./+types/home";
import HeroSection from "./sections/Hero";
import Circuit from "@/components/primitives/circuit";
import AboutSection from "./sections/Mission";
export default function Home() {
    return (

        <div>

            <HeroSection />
            {/* <AboutSection /> */}
        </div>
    );
}
