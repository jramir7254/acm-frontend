import { Button } from "@/components/primitives/button"
import { Edit } from "lucide-react";
import { EventFormOverlay } from '../../forms/event-form/form-overlay'
import type { Event } from "@/features/events/types/event";
import { PermissionGuard } from "@/components/layout/permission";


export function EditEventButton({ event }: { event: Event }) {

    return (
        <PermissionGuard resource="events" requiredActions={["update"]}>
            <EventFormOverlay event={event} >
                <Button variant='secondary' size='icon'><Edit /></Button>
            </EventFormOverlay>
        </PermissionGuard>
    )
}
