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

import FeedbackForm from "./feedback-form"
import { useState } from "react"
import { type Event } from "@/features/events/types/event"
import { useEventFeedback } from "@/features/events/hooks/event/mutations"
import type { FeedbackFormValues } from "./feedback-form"
import { ScrollArea } from "@radix-ui/react-scroll-area"
import { Heading } from "@/components/text/typography"

export function FeedbackFormOverlay({ children, event }: { children: React.ReactNode, event: Event }) {
    const [open, setOpen] = useState(false)
    const { mutateAsync, isPending } = useEventFeedback(event.id)

    const handleSubmit = async (form: FeedbackFormValues) => {
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
                className="lg:max-w-[45vw]  max-h-[90vh] h-fit "
            >
                <DialogHeader>
                    <DialogTitle className="font-nunit">
                        Provide feedback for the {event.title} workshop
                    </DialogTitle>

                    <DialogDescription className="font-nunit">
                        Complete this feedback form to fully account your attendance for this event.
                    </DialogDescription>
                </DialogHeader>
                <FeedbackForm handleSubmit={handleSubmit} />



                <DialogFooter>
                    <DialogClose asChild disabled={isPending}>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button form="feedback-form" type="submit" disabled={isPending}>
                        {isPending ? "Please Wait" : "Submit"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
