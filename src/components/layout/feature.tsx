import React from 'react'
import { IS_DEV } from '@/lib/constants'
import { Flag } from 'lucide-react'


export function FeatureFlag({ children, ready = false }: {
    children: React.ReactNode, ready?: boolean
}) {

    if (!IS_DEV && !ready) return null

    if (IS_DEV && !ready) return (
        <div className='relative text-red-400 '>
            {children}
            <Flag className='absolute top-0 left-0 ' />
        </div>
    )

    return children
}
