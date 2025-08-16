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


import EditForm from "./edit-form"
export function DialogDemo({ children, event }) {
    return (
        <Dialog modal>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent onInteractOutside={(e) => e.preventDefault()} onOpenAutoFocus={(e) => e.preventDefault()} className="sm:max-w-[1000px] bg-accent">
                <DialogHeader>
                    <DialogTitle>Edit Event</DialogTitle>
                    <DialogDescription>
                        Make changes to this event here. Click save when you&apos;re
                        done.
                    </DialogDescription>
                </DialogHeader>
                <EditForm event={event} />
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button form="edit-form" type="submit">Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
