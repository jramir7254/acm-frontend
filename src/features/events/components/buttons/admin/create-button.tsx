import React from 'react'
import { EventFormOverlay } from '../../forms/event-form/form-overlay'
import { Button } from '@/components/primitives/button'
import { Plus } from 'lucide-react'
import { PermissionGuard } from '@/components/layout/permission'

export function CreateEventButton() {
    return (
        <PermissionGuard resource="events" requiredActions={["create"]}>
            <EventFormOverlay>
                <Button variant={'default'} size={'icon'}><Plus /></Button>
            </EventFormOverlay>
        </PermissionGuard>
    )
}
