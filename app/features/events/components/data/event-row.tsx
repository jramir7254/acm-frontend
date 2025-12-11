import { TableRow } from '@/components/primitives/table'
import { useEvent } from '../../hooks/event/queries'
import React from 'react'

type EventCols = 'title' | 'date'

export function EventRow({
    eventId,
    children
}: {
    eventId: number,
    children?: React.ReactNode
}) {

    const event = useEvent(eventId)

    if (!event) return null

    return (
        <TableRow>

        </TableRow>
    )
}
