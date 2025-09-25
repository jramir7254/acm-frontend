import React from 'react'
import { useIsDev } from '@/hooks'
import { Flag } from 'lucide-react'


export function FeatureFlag({ children, ready = false }: {
    children: React.ReactNode, ready?: boolean
}) {
    const isDev = useIsDev()

    if (!isDev && !ready) return null

    if (isDev && !ready) return (
        <div className='relative text-red-400 '>
            {children}
            <Flag className='absolute top-0 left-0 ' />
        </div>
    )

    return children
}
