import { useEventContext } from "../cards";
import { Button } from "@/components/primitives/button"
import ConfirmationModal from "@/components/ui/confirmation";
import { Trash } from "lucide-react";
import { useDeleteEvent } from "../../hooks/use-events";


export function DeleteEventButton({ eventId }: { eventId: string }) {
    const deleteEvent = useDeleteEvent(eventId)

    return (
        <ConfirmationModal title="Are you sure you want to delete this event?" onConfirm={() => deleteEvent.mutate()}>
            <Button variant='secondary' size='icon'><Trash /></Button>
        </ConfirmationModal>
    )
}

