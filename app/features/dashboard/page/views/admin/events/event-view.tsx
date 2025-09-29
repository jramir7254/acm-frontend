

import Gradient from '@/components/layout/gradient'
import { Button } from '@/components/primitives/button';
import { useEvent } from '@/features/events/hooks/use-events';
import { useAppNavigation } from '@/hooks';
import { ArrowLeft } from 'lucide-react';


export default function EventView() {
    const { toEvents, eventId } = useAppNavigation()
    const { data } = useEvent(eventId || '')

    console.log("in here", { data })
    const grid = {
        mobile: 'w-screen h-full p-2 grid grid-cols-1',
        default: 'h-full grid gap-5 grid-cols-4 grid-rows-3'
    }

    return (
        <Gradient via="rgba(50,50,50,0.20)" className=" p-10 size-full grid grid-cols-1 md:grid-cols-2 border-2 border-accent rounded-md">
            <Button onClick={toEvents} size='icon'><ArrowLeft /></Button>
        </Gradient>
    )
}