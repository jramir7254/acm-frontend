

import Gradient from '@/components/layout/gradient'
import { Button } from '@/components/primitives/button';
import { useAppNavigation } from '@/hooks';
import { useUser } from '@/features/dashboard/hooks/use-admin';
import { ArrowLeft } from 'lucide-react';


export default function UserView() {
    const { toUsers, reqUserId } = useAppNavigation()
    const { data } = useUser(reqUserId || '')
    const grid = {
        mobile: 'w-screen h-full p-2 grid grid-cols-1',
        default: 'h-full grid gap-5 grid-cols-4 grid-rows-3'
    }

    return (
        <Gradient via="rgba(50,50,50,0.20)" className=" p-10 size-full grid grid-cols-1 md:grid-cols-2 border-2 border-accent rounded-md">
            <Button onClick={toUsers} size='icon'><ArrowLeft /></Button>
        </Gradient>
    )
}