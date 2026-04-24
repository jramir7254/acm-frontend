import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
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
import OtpDisplay from "@/components/other/otp-display"
import { useEventField } from "../../hooks/event/queries"
import type { Event } from "../../types/event"
export function ShowCodeOverlay({ event, children }: { children: React.ReactNode, event: Event }) {
    const { data } = useEventField(event.id, 'code')


    return (
        <Dialog >
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent
                onInteractOutside={(e) => e.preventDefault()}
                onOpenAutoFocus={(e) => e.preventDefault()}
                className=" h-fit w-fit lg:min-w-[700px] lg:px-20">
                <DialogHeader>
                    <DialogTitle className="text-3xl">
                        Check-In
                    </DialogTitle>
                    <Separator />
                    <DialogDescription>
                        <h2>{event.title}</h2>
                    </DialogDescription>
                    <div className="flex items-center justify-center py-10">
                        <OtpDisplay code={data} />
                    </div>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}
