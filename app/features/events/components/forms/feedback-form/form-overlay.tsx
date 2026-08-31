import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import FeedbackForm from "./feedback-form"
import { useState } from "react"
import { useEventFeedback } from "@/features/events/hooks/mutations"
import type { FeedbackFormValues } from "./feedback-form"
import { ScrollArea } from "@radix-ui/react-scroll-area"
import { Heading } from "@/components/text/typography"
import type { EventIdentifiers } from '@/features/events/types'
import { useUserFeedbackById } from "@/features/users/hooks/queries"


export function FeedbackFormOverlay({
    children,
    event,
    surveyId
}: {
    children: React.ReactNode,
    event: EventIdentifiers,
    surveyId: number | null

}) {
    const [open, setOpen] = useState(false)
    const { mutateAsync, isPending } = useEventFeedback(event?.eventId)
    const { data } = useUserFeedbackById('me', surveyId)

    const handleSubmit = async (form: FeedbackFormValues) => {
        await mutateAsync(form)
        setOpen(false)
    }




    return (
        <Dialog modal open={open} onOpenChange={setOpen}>
            <DialogTrigger  >
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
                <FeedbackForm handleSubmit={handleSubmit} data={data} />



                <DialogFooter hidden={!!data}>
                    <DialogClose asChild disabled={isPending}>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button form="feedback-form" type="submit" disabled={isPending || !!data}>
                        {isPending ? "Please Wait" : "Submit"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
