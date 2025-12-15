import { Button } from "@/components/primitives/button"
import { Edit } from "lucide-react";
import { EventFormOverlay } from "../overlays/form-overlay";



export function EditEventButton() {

    return (
        <EventFormOverlay >
            <Button variant='secondary' size='icon'><Edit /></Button>
        </EventFormOverlay>
    )

}
