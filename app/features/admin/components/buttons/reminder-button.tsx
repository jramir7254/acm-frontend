import { Button } from '@/components/primitives/button'
import { backend } from '@/lib/api/client'
import { useMutation } from '@tanstack/react-query'
import { Bell } from 'lucide-react'
import React from 'react'
import { toast } from 'sonner'

export default function ReminderButton({ epccId }: { epccId: string }) {

    const { mutate } = useMutation({
        mutationFn: () => backend.post(
            `/admin/users/${epccId}/reminder`
        ),
        onSuccess: () => {
            toast.message(`Email Sent`)
        },
        onError: () => {
            toast.error(`Error sending email`)
        },
    })
    return (
        <Button variant={'secondary'} size={'icon'} onClick={() => mutate()}><Bell /></Button>
    )
}
