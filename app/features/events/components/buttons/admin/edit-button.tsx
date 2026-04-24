import { Button } from "@/components/ui/button"
import { Edit } from "lucide-react";
import { EventFormOverlay } from '../../forms/event-form/form-overlay'
import type { Event } from "@/features/events/types/event";
import { PermissionGuard } from "@/components/layout/permission";


export function EditEventButton({ event }: { event: Event }) {

    return (
        <PermissionGuard resource="events" requiredRoles={['president']}>
            <EventFormOverlay event={event} >
                <Button variant='secondary' size='icon'><Edit /></Button>
            </EventFormOverlay>
        </PermissionGuard>
    )
}
