import { Button } from "@/components/primitives/button"
import ConfirmationModal from "@/components/ui/confirmation";
import { Trash } from "lucide-react";

import { useDeleteEvent } from "../../hooks/event/mutations";

export function DeleteEventButton({ eventId }: { eventId: string | number }) {
    const deleteEvent = useDeleteEvent(eventId)

    return (
        <ConfirmationModal title="Are you sure you want to delete this event?" onConfirm={() => deleteEvent.mutate()}>
            <Button variant='secondary' size='icon'
                className="
                aspect-square
                size-7
                md:size-9
                "
            >
                <Trash className="size-3 md:size-4" />
            </Button>
        </ConfirmationModal>
    )
}

