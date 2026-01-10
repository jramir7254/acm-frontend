import React from 'react'
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/primitives/sheet"
import { Button } from '@/components/primitives/button'
import { Label } from '@/components/primitives/label'
import { Input } from '@/components/primitives/input'
import { Edit2 } from 'lucide-react'
import { type BaseUser } from '@/features/users/types'
import ProfileForm from '@/features/users/components/user/forms/update-form/form'
import { Separator } from '@/components/primitives/separator'
import { AssignRoleOverlay } from '../overlays'
import { useUpdateUser } from '@/features/users/hooks/user/mutations'

export function EditUserPanel({ user }: { user: BaseUser }) {

    const { mutateAsync } = useUpdateUser(user?.epccId)

    if (!user) return

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline" size={'icon'} >
                    <Edit2 />
                </Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Edit profile</SheetTitle>
                    <SheetDescription>
                        Make changes to your profile here. Click save when you&apos;re done.
                    </SheetDescription>
                </SheetHeader>
                <div className="grid flex-1 auto-rows-min gap-6 px-4">
                    <ProfileForm user={user} handleSubmit={mutateAsync} admin />
                    <Separator />
                    <AssignRoleOverlay userId={user.id} epccId={user.epccId} currentRole={user.role} />
                </div>
                <SheetFooter>
                    {/* <Button type="submit">Save changes</Button> */}
                    <SheetClose asChild>
                        <Button variant="outline">Close</Button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}
