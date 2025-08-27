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
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from '@/components/primitives/input-otp'

export function ShowCodeOverlay({ children }: { children: React.ReactNode }) {
    const e = useEventContext()
    if (!e) return null

    const { code } = e


    return (
        <Dialog modal>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent onInteractOutside={(e) => e.preventDefault()} onOpenAutoFocus={(e) => e.preventDefault()} className=" bg-accent">
                <DialogHeader>
                    <DialogTitle>
                        Check-In Code
                    </DialogTitle>
                    <DialogDescription>
                        <InputOTP maxLength={6} value={code}>
                            <InputOTPGroup>
                                <InputOTPSlot index={0} />
                                <InputOTPSlot index={1} />
                                <InputOTPSlot index={2} />
                            </InputOTPGroup>
                            <InputOTPSeparator />
                            <InputOTPGroup>
                                <InputOTPSlot index={3} />
                                <InputOTPSlot index={4} />
                                <InputOTPSlot index={5} />
                            </InputOTPGroup>
                        </InputOTP>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}
