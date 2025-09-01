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


import CheckInForm from '../forms/check-in-form'

export function CheckInOverlay({ children }: { children: React.ReactNode }) {

    const [open, setOpen] = useState(false)



    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="w-[500px] h-[250px] bg-accent">
                <DialogHeader>
                    <DialogTitle>Check in for event</DialogTitle>
                    <DialogDescription>
                        Enter the 6 digit code that is projected from the screen.
                    </DialogDescription>
                </DialogHeader>
                <div className='grid place-items-center'>
                    <CheckInForm setOpen={setOpen} open={open} />
                </div>
            </DialogContent>
        </Dialog>
    )
}
