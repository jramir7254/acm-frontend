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
import { useEventContext } from "../../context/event-context"
import EditForm from "./event-form"
import { useState } from "react"
import { useCreateEvent } from "../../hooks/event/mutations"
export function EventFormOverlay({ children }: { children: React.ReactNode }) {
    const [open, setOpen] = useState(false)
    const event = useEventContext()
    const { mutateAsync, isPending } = useCreateEvent()

    const insideEvent = event !== undefined; // only true if provider gave us an event

    return (
        <Dialog modal open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild >
                {children}
            </DialogTrigger>
            <DialogContent onInteractOutside={(e) => e.preventDefault()} onOpenAutoFocus={(e) => e.preventDefault()} className="lg:max-w-[75vw] bg-accent">
                <DialogHeader>
                    <DialogTitle>
                        {insideEvent ? "Edit Event" : "New Event"}
                    </DialogTitle>
                    <DialogDescription>
                        {insideEvent ?
                            "Make changes to this event here. Click save when you're done."
                            :
                            "Add new event details here. Click add when you're done."}
                    </DialogDescription>
                </DialogHeader>
                <EditForm mutateAsync={mutateAsync} setOpen={setOpen} />
                <DialogFooter>
                    <DialogClose asChild disabled={isPending}>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button form="event-form" type="submit" disabled={isPending}>
                        {isPending ? "Please Wait" : insideEvent ? "Save changes" : "Create Event"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
