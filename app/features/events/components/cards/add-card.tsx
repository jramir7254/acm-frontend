import { Card } from "@/components/primitives/card";
import { PlusCircle } from "lucide-react";
import { EventFormOverlay } from "../overlays/form-overlay";

export function AddEventCard() {

    return (
        <EventFormOverlay>
            <Card className="flex flex-col cursor-pointer transition duration-500 hover:bg-white/50 items-center justify-center overflow-hidden pt-0 h-[50vh]">
                <PlusCircle size={100} />
            </Card>
        </EventFormOverlay>
    )

}