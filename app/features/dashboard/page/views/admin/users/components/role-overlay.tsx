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
import { ArrowRight, Edit2 } from 'lucide-react';
import type { Role } from '@/components/layout';
import { MdArrowRight } from 'react-icons/md';
import { Separator } from '@/components/primitives/separator';
import { HiArrowLongRight } from "react-icons/hi2";
import { useAssignRole } from '@/features/dashboard/hooks/use-admin';

import { ROLES } from '@/components/layout';
import { cn } from '@/lib/utils';
import { logger } from '@/lib/logger';

const roleIds = ROLES.map((r, i) => ({ id: i + 1, name: r })).filter(r => r.name !== 'owner')


export function AssignRoleOverlay({ currentRole, userId, epccId }: { currentRole: Role, userId: number, epccId: string }) {
    const [selectedRole, setSelectedRole] = useState<{ id: number, name: Role } | null>(null)
    const [open, setOpen] = useState(false)
    const { mutateAsync, isPending } = useAssignRole(epccId)

    const canSubmit = selectedRole && selectedRole.name !== currentRole


    const onSubmit = async () => {
        if (!selectedRole) return
        logger.info(selectedRole, userId)
        try {
            await mutateAsync(selectedRole)
            setOpen(false)
        } catch {

        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button size={'icon'} variant={'ghost'}><Edit2 /></Button>
            </DialogTrigger>
            <DialogContent className="">
                <DialogHeader>
                    <DialogTitle>Change Role</DialogTitle>
                    <DialogDescription>
                        Make changes to your profile here. Click save when you&apos;re
                        done.
                    </DialogDescription>
                </DialogHeader>
                <div className='flex gap-5'>
                    <div className="flex flex-col gap-2">
                        {roleIds.map(r => (
                            <div
                                key={`role-${r.name}`}
                                onClick={() => setSelectedRole(r)}
                                className={'cursor-pointer relative size-fit '}
                            >
                                <div className={cn(
                                    'absolute size-full border-yellow-400 border rounded',
                                    selectedRole?.id !== r.id && 'hidden'
                                )} />
                                <RoleBadge role={r.name} />
                            </div>
                        ))}
                    </div>
                    <Separator orientation='vertical' />
                    <div className='inline-flex items-center flex-1 justify-center gap-3'>
                        <RoleBadge role={currentRole} />
                        <HiArrowLongRight size={25} />
                        <RoleBadge role={selectedRole?.name} />
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
