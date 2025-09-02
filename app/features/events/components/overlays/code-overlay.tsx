import { Button } from "@/components/primitives/button"
import { Separator } from "@/components/primitives/separator"
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
import OtpDisplay from "@/components/ui/otp-display"

export function ShowCodeOverlay({ children }: { children: React.ReactNode }) {
    const e = useEventContext()
    if (!e) return null

    const { code, title, startAt, endAt } = e


    return (
        <Dialog >
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent
                onInteractOutside={(e) => e.preventDefault()}
                onOpenAutoFocus={(e) => e.preventDefault()}
                className="bg-accent h-fit w-fit lg:min-w-[700px] lg:px-20">
                <DialogHeader>
                    <DialogTitle className="text-3xl">
                        Check-In
                    </DialogTitle>
                    <Separator />
                    <DialogDescription>
                        <h2>{title}</h2>
                    </DialogDescription>
                    <div className="flex items-center justify-center py-10">
                        <OtpDisplay code={code} />
                    </div>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}
