import React, { useState } from 'react'
import { Button } from '../primitives/button'
import { RefreshCwIcon } from 'lucide-react'
import type { QueryKeys } from '@/types/query-keys'
import { queryClient } from '@/providers/query-client'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

export function RefetchButton({ queryKey }: { queryKey: QueryKeys }) {
    const [loading, setLoading] = useState(false)


    const { mutate } = useMutation({
        mutationFn: () => {
            setLoading(true)
            return queryClient.invalidateQueries({ queryKey })

        },
        onSuccess: () => {
            toast.success(`Refetched ${queryKey}`)
        },
        onError: () => {
            toast.error(`Could not fetch ${queryKey}`)
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
