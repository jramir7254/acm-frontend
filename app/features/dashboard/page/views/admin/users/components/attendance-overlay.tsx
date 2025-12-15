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
import { Button } from '@/components/primitives/button'

import { RoleBadge } from '@/features/dashboard/components/ui/role-badge';
import { Plus } from 'lucide-react';
import type { Role } from '@/components/layout';
import { MdArrowRight } from 'react-icons/md';
import { Separator } from '@/components/primitives/separator';
import { HiArrowLongRight } from "react-icons/hi2";
import { useEvents } from '@/features/events/hooks/events/queries';
import { cn } from '@/lib/utils';
import { logger } from '@/lib/logger';
import { Checkbox } from '@/components/primitives/checkbox';
import { Label } from '@/components/primitives/label';
import { Paragraph } from '@/components/text/typography';
import { useAddAttendance } from '@/features/admin/hooks/use-admin';

export function AddAttendanceOverlay({ attendance, epccId }: { attendance: Attendance[], epccId: string }) {
    const [selectedEvents, setSelectedEvents] = useState<number[]>([])
    const [open, setOpen] = useState(false)
    const { data, isLoading } = useEvents()
    const { mutateAsync, isPending } = useAddAttendance(epccId)

    if (isLoading || !data) return <p>loading</p>

    const canSubmit = selectedEvents.length

    const updateSelected = (id: number) => {
        setSelectedEvents(prev =>
            prev.includes(id)
                ? prev.filter(item => item !== id)  // remove if already selected
                : [...prev, id]                     // add if not selected
        );
    }


    const onSubmit = async () => {
        if (!selectedEvents.length) return
        logger.info(selectedEvents)
        try {
            await mutateAsync(selectedEvents)
            // setOpen(false)
        } catch {

        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button size={'icon'} variant={'outline'}>
                    <Plus />
                </Button>
            </DialogTrigger>
            <DialogContent className="">
                <DialogHeader>
                    <DialogTitle>Add to event</DialogTitle>
                    <DialogDescription>
                        Make changes to your profile here. Click save when you&apos;re
                        done.
                    </DialogDescription>
                </DialogHeader>
                <div className='flex gap-5'>
                    <div className="flex flex-col gap-2">
                        {data.filter(e => !attendance.some(a => a.eventId === e.id)).map(e => (
                            <div key={`admin_attendance_${e.id}`} className='flex items-center gap-2'>
                                <Checkbox id={e.id}
                                    className='cursor-pointer'
                                    checked={selectedEvents.includes(e.id)}
                                    onCheckedChange={() => updateSelected(e.id)}
                                />
                                <Label htmlFor={e.id}><Paragraph>{e.title} {e.id}</Paragraph></Label>
                            </div>
                        ))}
                    </div>
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button disabled={!canSubmit || isPending} onClick={onSubmit}>
                        {isPending ? 'Please wait' : 'Save changes'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
