import { Button } from "@/components/primitives/button"
import Dialog from "./dialog";
import { Trash, Edit } from "lucide-react";
import { useDeleteEvent } from "../useEvents";
import { DialogDemo } from "./edit";
import type { Event } from "@/types";
type Props = {
    event: Event
    eventId: string
}

export function DeleteEventButton({ event, eventId }: Props) {
    const deleteEvent = useDeleteEvent(eventId)

    return (
        <Dialog title="Are you sure you want to delete this event?" onConfirm={() => deleteEvent.mutate()}>
            <Button variant='secondary' size='icon'><Trash /></Button>
        </Dialog>
    )
}


export function EditEventButton({ event, eventId }: Props) {

    return (
        <DialogDemo event={event}>
            <Button variant='secondary' size='icon'><Edit /></Button>
        </DialogDemo>
    )

}
