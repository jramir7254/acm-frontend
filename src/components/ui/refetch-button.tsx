import React, { useState } from 'react'
import { Button } from '../primitives/button'
import { RefreshCwIcon } from 'lucide-react'
import { queryClient } from '@/providers/query-client'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

export function RefetchButton({ queryKey }: { queryKey: any }) {
    const [loading, setLoading] = useState(false)


    const { mutate } = useMutation({
        mutationFn: () => {
            setLoading(true)
            return queryClient.invalidateQueries({ queryKey, refetchType: 'active' })
        },
        onSuccess: () => {
            toast.success(`Refetched data`)
        },
        onError: () => {
            toast.error(`Could not refetch data`)
        },
        onSettled: () => {
            const timeoutId = setTimeout(() => {
                setLoading(false)
            }, 1_000)
            return () => clearTimeout(timeoutId)
        }
    })


    return (
        <Button
            variant={'outline'}
            size={'icon'}
            onClick={() => mutate()}
        >
            <RefreshCwIcon className={cn(loading && 'animate-spin')} />
        </Button>

    )
}
