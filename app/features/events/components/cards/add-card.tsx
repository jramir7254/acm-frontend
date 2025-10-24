import { Card } from "@/components/primitives/card";
import { PlusCircle } from "lucide-react";
import { Container } from "@/components/layout";
import { EventFormOverlay } from "../overlays/form-overlay";

export function AddEventCard() {




    return (
        <EventFormOverlay>
            <Card className="flex flex-col size-full cursor-pointer transition duration-500 hover:bg-white/20 items-center justify-center overflow-hidden pt-0">
                <PlusCircle size={100} />
            </Card>
        </EventFormOverlay>
    )

}