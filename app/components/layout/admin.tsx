import React from 'react'
import { useMe } from '@/features/auth/hooks/useMe';

type Props = {
    children: React.ReactNode,
    className?: string
}

export default function Admin({ children, className }: Props) {
    const { data: user } = useMe()

    return user?.isAdmin ? (
        <div className={className}>{children}</div>
    ) : null
}
