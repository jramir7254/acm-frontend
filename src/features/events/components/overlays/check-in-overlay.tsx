import React, { useState } from 'react'
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

import { useCheckIn } from '../../hooks/event/mutations'

import { CheckInForm } from '../forms/check-in-form/check-in-form'
import type { Event } from '../../types/event'
import type { EventIdentifiers } from '../../type'
export function CheckInOverlay({ event, children }: { event: EventIdentifiers, children: React.ReactNode }) {
    const { mutateAsync } = useCheckIn(event.id)
    const [open, setOpen] = useState(false)

    const handleSubmit = async (form: { code: string }) => {
        await mutateAsync(form)
        setOpen(false)
    }


    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="w-[500px] h-[250px]">
                <DialogHeader>
                    <DialogTitle>Check in for event</DialogTitle>
                    <DialogDescription>
                        Enter the 6 digit code that is projected from the screen.
                    </DialogDescription>
                </DialogHeader>
                <div className='grid place-items-center'>
                    <CheckInForm handleSubmit={handleSubmit} />
                </div>
            </DialogContent>
        </Dialog>
    )
}
