import { Button } from "@/components/primitives/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/primitives/dialog"

import { EventForm } from "."
import { useState } from "react"
import { useCreateOrUpdateEvent } from "@/features/events/hooks/event/mutations"
import type { Event } from "@/features/events/types/event"
import type { EventFormValues } from "@/features/events/types/schemas"

export function EventFormOverlay({ children, event }: { children: React.ReactNode, event?: Event | null }) {
    const [open, setOpen] = useState(false)
    const { mutateAsync, isPending } = useCreateOrUpdateEvent(event?.id)

    const handleSubmit = async (form: EventFormValues) => {
        await mutateAsync(form)
        setOpen(false)
    }

    return (
        <Dialog modal open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild >
                {children}
            </DialogTrigger>
            <DialogContent
                onInteractOutside={(e) => e.preventDefault()}
                onOpenAutoFocus={(e) => e.preventDefault()}
                className="lg:max-w-[75vw] "
            >
                <DialogHeader>
                    <DialogTitle>
                        {event ? "Edit Event" : "Create Event"}
                    </DialogTitle>

                    <DialogDescription>
                        {event ?
                            "Make changes to this event here. Click save when you're done."
                            :
                            "Add new event details here. Click add when you're done."}
                    </DialogDescription>
                </DialogHeader>

                <EventForm handleSubmit={handleSubmit} event={event} />

                <DialogFooter>
                    <DialogClose asChild disabled={isPending}>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button form="event-form" type="submit" disabled={isPending}>
                        {isPending ? "Please Wait" : event ? "Save changes" : "Create Event"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
